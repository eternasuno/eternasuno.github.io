import type Searcher from '@lumeland/core/searcher.ts';
import type Site from '@lumeland/core/site.ts';
import { merge } from '@lumeland/core/utils/object.ts';
import {
  NodeCompiler,
  type NodeError,
  type NodeTypstDocument,
} from '@myriaddreamin/typst-ts-node-compiler';
import type { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { select } from 'hast-util-select';
import rehypeStringify from 'rehype-stringify';
import { type PluggableList, type Plugin, unified } from 'unified';
import { visit } from 'unist-util-visit';

declare global {
  namespace Lume {
    interface GlobalData {
      search: Searcher;
      wordCount?: number;
    }
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isParent = (value: unknown): value is Root | Element =>
  isRecord(value) &&
  Array.isArray(value.children) &&
  (value.type === 'root' ||
    (value.type === 'element' && typeof value.tagName === 'string'));

export type Options = {
  extensions?: Array<string>;
  pageSubExtension?: string;
  plugins?: PluggableList;
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

    const processor = unified().use([
      typstRehype,
      ...options.plugins,
      rehypeStringify,
    ]);

    const loader = async (path: string) => {
      const file = await processor.process(path);
      const metadata = isRecord(file.data.metadata) ? file.data.metadata : {};
      const content = String(file);
      let wordCount = 0;
      visit(fromHtml(content, { fragment: true }), 'text', (node) => {
        wordCount += Array.from(node.value.replace(/\s/gu, '')).length;
      });

      return { ...metadata, content, wordCount };
    };

    site.loadPages(options.extensions, {
      loader,
      pageSubExtension: options.pageSubExtension,
    });
  };
};

export default typst;

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
      const document = compile(doc, compiler);
      Object.assign(file.data, {
        metadata: selector ? matter(selector, document, compiler) : undefined,
      });

      return rewrite(toHast(document, compiler));
    };
  };
};

const isExternalLink = (node: Element) =>
  node.tagName === 'a' &&
  typeof node.properties.href === 'string' &&
  !node.properties.href.startsWith('#');

const isTypstFrame = (node: Element) =>
  node.tagName === 'img' &&
  (node.properties?.class ?? node.properties?.className)
    ?.toString()
    .includes('typst-frame') &&
  typeof node.properties.src === 'string';

const rewriteElement = (
  node: Element,
  index: number | undefined,
  parent: Root | Element | undefined
) => {
  if (isExternalLink(node)) {
    Object.assign(node.properties, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    });
  }

  if (node.tagName === 'code' && node.properties?.['data-lang']) {
    Object.assign(node.properties, {
      className: [`language-${node.properties['data-lang']}`],
    });
  }

  if (!isTypstFrame(node) || typeof index !== 'number' || !parent) {
    return;
  }

  const svg = toSvg(String(node.properties.src));

  if (svg) {
    parent.children.splice(index, 1, svg);
  }
};

const rewrite = (hast: Root | Element): Root => {
  const body = select('body', hast);

  if (body) {
    visit(body, 'element', rewriteElement);
  }

  return { children: body?.children || [], type: 'root' };
};

const toSvg = (src: string) => {
  const [prefix, metadata, payload] = src.split(/[;,]/, 3);
  if (prefix !== 'data:image/svg+xml') {
    return undefined;
  }

  try {
    const svg =
      metadata === 'base64' ? atob(payload) : decodeURIComponent(payload);
    const root = fromHtml(svg, { fragment: true, space: 'svg' });

    return root.children.find(
      (child): child is Element =>
        child.type === 'element' && child.tagName === 'svg'
    );
  } catch {
    return undefined;
  }
};

const matter = (
  selector: string,
  doc: NodeTypstDocument,
  compiler: NodeCompiler
) => {
  try {
    const result: unknown = compiler.query(doc, { selector });
    const first = Array.isArray(result) ? result.at(0) : undefined;

    return isRecord(first) && isRecord(first.value) ? first.value : undefined;
  } catch (error) {
    console.warn('Typst Metadata query failed:', error);

    return undefined;
  }
};

type Compilation<Result> = {
  takeError(): NodeError | null;
  result: Result | null;
};

const unwrap = <Result>(result: Compilation<Result>): Result => {
  const error = result.takeError();
  if (error && error.compilationStatus !== 'ok') {
    const message = error.shortDiagnostics
      .map(({ message }) => message)
      .join('\n');

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

const toHast = (doc: NodeTypstDocument, compiler: NodeCompiler) => {
  const hast: unknown = unwrap(compiler.tryHtml(doc)).hast();

  if (!isParent(hast)) {
    throw new Error('Compilation produced an invalid HAST tree.');
  }

  return hast;
};

const compile = (mainFilePath: string, compiler: NodeCompiler) =>
  unwrap(compiler.compileHtml({ mainFilePath }));
