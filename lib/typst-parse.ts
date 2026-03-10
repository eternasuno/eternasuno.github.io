import { NodeCompiler, type NodeTypstDocument } from '@myriaddreamin/typst-ts-node-compiler';
import type { Root } from 'hast';
import { select } from 'hast-util-select';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const compile =
  (inputs?: Record<string, string>) => (mainFileContent: string) => (compiler: NodeCompiler) => {
    const result = compiler.compileHtml({ inputs, mainFileContent });

    const error = result.takeError();
    if (error && error.compilationStatus !== 'ok') {
      const message = error.shortDiagnostics.map(({ message }) => message).join('\n');

      if (error.compilationStatus === 'warning') {
        console.info('Compilation completed with warnings:', message);
      } else {
        throw new Error(message);
      }
    }

    if (!result.result) {
      throw new Error('Compilation failed without error message.');
    }

    return result.result;
  };

const tryHtml = (doc: NodeTypstDocument) => (compiler: NodeCompiler) => {
  const result = compiler.tryHtml(doc);

  const error = result.takeError();
  if (error && error.compilationStatus !== 'ok') {
    const message = error.shortDiagnostics.map(({ message }) => message).join('\n');

    if (error.compilationStatus === 'warning') {
      console.info('Compilation completed with warnings:', message);
    } else {
      throw new Error(message);
    }
  }

  if (!result.result) {
    throw new Error('Compilation failed without error message.');
  }

  return result.result.hast() as Root;
};

const rewrite = (hast: Root) => {
  const body = select('body', hast);

  if (body) {
    visit(body, 'element', (node) => {
      if (node.tagName === 'code' && node.properties && node.properties['data-lang']) {
        const lang = node.properties['data-lang'];

        node.properties.className = [`language-${lang}`];
      }
    });
  }

  return {
    children: body?.children || [],
    type: 'root',
  } as Root;
};

const matter = (selector: string) => (doc: NodeTypstDocument) => (compiler: NodeCompiler) => {
  try {
    const result = compiler.query(doc, { selector }) as Array<{
      value: unknown;
    }>;

    return result.at(0)?.value;
  } catch (error) {
    console.warn('Typst Metadata query failed:', error);

    return undefined;
  }
};

type TypstParseOptions = {
  inputs?: Record<string, string>;
  selector?: string;
  workspace?: string;
};

export const makeTypstParsePlugin = ({
  workspace,
  inputs,
  selector,
}: TypstParseOptions): Plugin<[], string, Root> => {
  const compiler = NodeCompiler.create({ workspace });

  return function () {
    this.parser = (doc, file) => {
      const document = compile(inputs)(doc)(compiler);
      file.data.metadata = selector ? matter(selector)(document)(compiler) : undefined;

      return rewrite(tryHtml(document)(compiler));
    };
  };
};
