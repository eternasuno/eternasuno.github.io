import { NodeCompiler, type NodeTypstDocument } from '@myriaddreamin/typst-ts-node-compiler';
import type { Root } from 'hast';
import { select } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';
import Site from 'lume/core/site.ts';
import { merge } from 'lume/core/utils/object.ts';
import { visit } from 'unist-util-visit';

const compile = (mainFilePath: string) => (compiler: NodeCompiler) => {
  const result = compiler.compileHtml({ mainFilePath });

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

const toHast = (doc: NodeTypstDocument) => (compiler: NodeCompiler) => {
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

const convert = (hast: Root) => {
  const body = select('body', hast);

  if (body) {
    visit(body, 'element', (node) => {
      if (node.tagName === 'code' && node.properties && node.properties['data-lang']) {
        const lang = node.properties['data-lang'];

        node.properties.className = [`language-${lang}`];
      }
    });
  }

  return toHtml(body?.children || []);
};

const matter = (selector: string) => (doc: NodeTypstDocument) => (compiler: NodeCompiler) => {
  try {
    const result = compiler.query(doc, { selector }) as Array<{ value: Record<string, unknown> }>;

    return result.at(0)?.value;
  } catch (error) {
    console.warn('Typst Metadata query failed:', error);

    return undefined;
  }
};

type MakeParserOptions = {
  inputs?: Record<string, string>;
  selector?: string;
  workspace?: string;
};

const makeParser = ({ inputs, selector, workspace }: MakeParserOptions) => {
  const compiler = NodeCompiler.create({ workspace, inputs });

  return (mainFilePath: string) => {
    const doc = compile(mainFilePath)(compiler);
    const hast = toHast(doc)(compiler);
    const content = convert(hast);
    const metadata = selector ? matter(selector)(doc)(compiler) : undefined;

    return { content, ...metadata } as { content: string } & Record<string, unknown>;
  };
};

export type Options = {
  extensions?: string[];
  pageSubExtension?: string;
} & Omit<MakeParserOptions, 'workspace'>;

export const defaults = {
  extensions: ['.typ'],
  inputs: undefined,
  pageSubExtension: '.page',
  selector: undefined,
} satisfies Options;

export const typst = (userOptions?: Options) => {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    const parse = makeParser({
      inputs: options.inputs,
      selector: options.selector,
      workspace: site.src('/'),
    });

    site.loadPages(options.extensions, {
      loader: (path) => Promise.resolve(parse(path)),
      pageSubExtension: options.pageSubExtension,
    });
  };
};

export default typst;
