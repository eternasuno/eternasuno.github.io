import Site from 'lume/core/site.ts';
import { merge } from 'lume/core/utils/object.ts';
import { read } from 'lume/core/utils/read.ts';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { makeTypstRehypePlugin } from './typst-rehype.ts';

export type Options = {
  extensions?: string[];
  inputs?: Record<string, string>;
  pageSubExtension?: string;
  plugins?: Array<unknown | Array<unknown>>;
  selector?: string;
};

export const defaults = {
  extensions: ['.typ'],
  inputs: undefined,
  pageSubExtension: '.page',
  plugins: [],
  selector: undefined,
} satisfies Options;

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

export const typst = (userOptions?: Options) => {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    const typstRehypePlugin = makeTypstRehypePlugin({
      inputs: options.inputs,
      selector: options.selector,
      workspace: site.src('/'),
    });

    const processor = makeProcessor([typstRehypePlugin, ...options.plugins, rehypeStringify]);

    const compile = async (str: string) => {
      const file = await processor.process(str);
      const metadata = file.data.metadata as Record<string, unknown>;
      const content = String(file);
      console.log('Compiled Typst content:', {  metadata });

      return { content, ...metadata } as { content: string } & Record<string, unknown>;
    };

    site.loadPages(options.extensions, {
      loader: (path) => read(path, false).then(compile),
      pageSubExtension: options.pageSubExtension,
    });

    site.filter('typst', (str: string) => compile(str).then((result) => result.content), true);
  };
};

export default typst;

declare global {
  namespace Lume {
    export interface Helpers {
      typst: (str: string) => Promise<string>;
    }
  }
}
