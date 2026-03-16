import { NodeCompiler, type NodeTypstDocument } from '@myriaddreamin/typst-ts-node-compiler';
import type { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { select } from 'hast-util-select';
import Site from 'lume/core/site.ts';
import { merge } from 'lume/core/utils/object.ts';
import rehypeStringify from 'rehype-stringify';
import { type Plugin, unified } from 'unified';
import { visit } from 'unist-util-visit';

export type Options = {
  extensions?: string[];
  pageSubExtension?: string;
  plugins?: Array<unknown | Array<unknown>>;
} & Omit<MakeTypstRehypeOptions, 'workspace'>;

export const defaults = {
  extensions: ['.typ'],
  inputs: undefined,
  pageSubExtension: '.page',
  plugins: [],
  selector: undefined,
} satisfies Options;

export const typst = (userOptions?: Options) => {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    const typstRehype = makeTypstRehype({
      inputs: options.inputs,
      selector: options.selector,
      workspace: site.src('/'),
    });

    const processor = makeProcessor([typstRehype, ...options.plugins, rehypeStringify]);

    const loader = async (path: string) => {
      const file = await processor.process(path);
      const metadata = file.data.metadata as Record<string, unknown>;
      const content = String(file);

      return { content, ...metadata } as { content: string } & Record<string, unknown>;
    };

    site.loadPages(options.extensions, {
      loader,
      pageSubExtension: options.pageSubExtension,
    });
  };
};

export default typst;

const makeProcessor = (plugins: Array<unknown | Array<unknown>>) => {
  let processor = unified();

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      processor = processor.use(...plugin);
    } else {
      // @ts-ignore - This is a valid use of rehype plugins, but the types don't reflect it.
      processor = processor.use(plugin);
    }
  }

  return processor;
};

type MakeTypstRehypeOptions = {
  inputs?: Record<string, string>;
  selector?: string;
  workspace?: string;
};

const makeTypstRehype = ({
  workspace,
  inputs,
  selector,
}: MakeTypstRehypeOptions): Plugin<[], string, Root> => {
  const compiler = NodeCompiler.create({ workspace, inputs });

  return function () {
    this.parser = (doc, file) => {
      const document = compile(doc)(compiler);
      file.data.metadata = selector ? matter(selector)(document)(compiler) : undefined;

      return rewrite(toHast(document)(compiler));
    };
  };
};

const rewrite = (hast: Root) => {
  const body = select('body', hast);

  if (body) {
    visit(body, 'element', (node, index, parent) => {
      if (node.tagName === 'code' && node.properties?.['data-lang']) {
        const lang = node.properties['data-lang'];

        node.properties.className = [`language-${lang}`];
      }

      if (
        node.tagName === 'img' &&
        node.properties.class?.toString().includes('typst-frame') &&
        typeof node.properties.src === 'string' &&
        typeof index === 'number' &&
        parent
      ) {
        const svg = toSvg(node.properties?.src);

        if (svg) {
          parent.children[index] = svg;
        }
      }
    });
  }

  return { children: body?.children || [], type: 'root' } as Root;
};

const toSvg = (src: string) => {
  const [prefix, metadata, payload] = src.split(/[;,]/, 3);
  if (prefix !== 'data:image/svg+xml') {
    return undefined;
  }

  try {
    const svg = metadata === 'base64' ? atob(payload) : decodeURIComponent(payload);

    const root = fromHtml(svg, { fragment: true });

    return root.children.find(
      (child): child is Element => child.type === 'element' && child.tagName === 'svg',
    );
  } catch {
    return undefined;
  }
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
