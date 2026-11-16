import { readFile } from 'node:fs/promises';
import type Site from '@lumeland/core/site.ts';
import { merge } from '@lumeland/core/utils/object.ts';
import {
  NodeCompiler,
  type NodeHtmlOutputExecResult,
  type NodeTypstCompileResult,
} from '@myriaddreamin/typst-ts-node-compiler';
import type { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { select } from 'hast-util-select';
import rehypeStringify from 'rehype-stringify';
import { type PluggableList, unified } from 'unified';
import { visit } from 'unist-util-visit';

type Options = {
  extensions?: Array<string>;
  inputs?: Record<string, string>;
  pageSubExtension?: string;
  plugins?: PluggableList;
  selector?: string;
};

const defaults = {
  extensions: ['.typ'],
  inputs: undefined,
  pageSubExtension: '.page',
  plugins: [],
  selector: '<frontmatter>',
} satisfies Options;

const unwrap = <
  Compilation extends NodeTypstCompileResult | NodeHtmlOutputExecResult,
>(
  compilation: Compilation
): NonNullable<Compilation['result']> => {
  const message = compilation
    .takeError()
    ?.shortDiagnostics.map(({ message }) => message)
    .join('\n');

  if (!compilation.result) {
    throw new Error(message || 'Typst compilation failed.');
  }

  if (message) {
    console.warn(message);
  }

  return compilation.result;
};

const openExternalLinksInNewTab = (node: Element) => {
  const { href } = node.properties;

  if (
    node.tagName !== 'a' ||
    typeof href !== 'string' ||
    href.startsWith('#')
  ) {
    return;
  }

  Object.assign(node.properties, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  });
};

const markCodeLanguage = (node: Element) => {
  const language = node.properties['data-lang'];

  if (node.tagName !== 'code' || !language) {
    return;
  }

  Object.assign(node.properties, { className: [`language-${language}`] });
};

const isTypstFrame = (
  node: Element
): node is Element & { properties: { src: string } } =>
  node.tagName === 'img' &&
  Boolean(node.properties.class?.toString().includes('typst-frame')) &&
  typeof node.properties.src === 'string';

const inlineTypstFrame = (
  node: Element,
  index: number | undefined,
  parent: Root | Element | undefined
) => {
  if (!isTypstFrame(node) || index === undefined || !parent) {
    return;
  }

  const [prefix, encoding, payload] = node.properties.src.split(/[;,]/, 3);

  if (prefix !== 'data:image/svg+xml') {
    return;
  }

  try {
    const markup =
      encoding === 'base64' ? atob(payload) : decodeURIComponent(payload);
    const root = fromHtml(markup, { fragment: true, space: 'svg' });
    const svg = root.children.find(
      (child): child is Element =>
        child.type === 'element' && child.tagName === 'svg'
    );

    if (svg) {
      parent.children.splice(index, 1, svg);
    }
  } catch {
    return;
  }
};

const extractBody = (html: Element): Root => {
  const body = select('body', html);

  if (body) {
    visit(body, 'element', (node, index, parent) => {
      openExternalLinksInNewTab(node);
      markCodeLanguage(node);
      inlineTypstFrame(node, index, parent);
    });
  }

  return { children: body?.children ?? [], type: 'root' };
};

const isRoot = (node: { type: string }): node is Root => node.type === 'root';

const createProcessor = (plugins: PluggableList) =>
  unified().use(plugins).use(rehypeStringify);

type Processor = ReturnType<typeof createProcessor>;

const loadPage = async (
  compiler: NodeCompiler,
  path: string,
  selector: string
) => {
  const document = unwrap(compiler.compileHtml({ mainFilePath: path }));
  const [frontmatter] = compiler.query(document, { selector });
  const content = await readFile(path, 'utf8');

  return { ...frontmatter?.value, content };
};

const renderPage = async (
  site: Site,
  compiler: NodeCompiler,
  processor: Processor,
  filename: string | undefined
) => {
  if (!filename) {
    throw new Error('Typst pages require a source filename to render.');
  }

  const output = unwrap(compiler.tryHtml({ mainFilePath: site.src(filename) }));
  const tree = await processor.run(extractBody(output.hast()));

  if (!isRoot(tree)) {
    throw new Error('Rehype plugins produced a non-root tree.');
  }

  return processor.stringify(tree);
};

const typst = (userOptions?: Options) => (site: Site) => {
  const options = merge(defaults, userOptions);
  const compiler = NodeCompiler.create({
    inputs: options.inputs,
    workspace: site.src('/'),
  });
  const processor = createProcessor(options.plugins);

  site.loadPages(options.extensions, {
    engine: {
      addHelper: () => {},
      deleteCache: () => {},
      render: (_content, _data, filename) =>
        renderPage(site, compiler, processor, filename),
    },
    loader: (path) => loadPage(compiler, path, options.selector),
    pageSubExtension: options.pageSubExtension,
  });
};

export default typst;
