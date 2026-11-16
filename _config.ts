import process from 'node:process';
import lume from '@lumeland/lume';
import base_path from '@lumeland/plugin-base-path';
import check_urls from '@lumeland/plugin-check-urls';
import favicon from '@lumeland/plugin-favicon';
import feed from '@lumeland/plugin-feed';
import image_size from '@lumeland/plugin-image-size';
import jsx from '@lumeland/plugin-jsx';
import metas from '@lumeland/plugin-metas';
import og_images from '@lumeland/plugin-og-images';
import pagefind from '@lumeland/plugin-pagefind';
import reading_info from '@lumeland/plugin-reading-info';
import resolve_urls from '@lumeland/plugin-resolve-urls';
import robots from '@lumeland/plugin-robots';
import tailwindcss from '@lumeland/plugin-tailwindcss';
import rehypeShiki from '@shikijs/rehype';
import type { Element } from 'hast';
import typst from './_plugins/typst-plugin.ts';

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

const site = lume({
  location: new URL(DOMAIN),
  watcher: {
    dependencies: {
      'posts/*.page.typ': ['posts/_template.typ'],
    },
  },
});

site.ignore('AGENTS.md');
site.ignore('devenv.yaml');

site.add('_includes/style.css', 'style.css');
site.add('_includes/images', 'img');

site.data('hostname', site.options.location.hostname);

site.use(jsx());
site.use(
  typst({
    inputs: { target: 'html' },
    plugins: [
      [
        rehypeShiki,
        {
          colorsRendering: 'none',
          defaultColor: 'light-dark()',
          defaultLanguage: 'text',
          inline: 'tailing-curly-colon',
          themes: { dark: 'one-dark-pro', light: 'one-light' },
          transformers: [
            {
              name: 'add-line-numbers',
              line(node: Element, line: number) {
                Object.assign(node.properties, { 'data-line': line });
              },
            },
          ],
        },
      ],
    ],
  })
);
site.use(robots({ allow: [], disallow: '*' }));
site.use(tailwindcss());
site.use(resolve_urls());
site.use(image_size());
site.use(base_path());
site.use(og_images());
site.use(favicon({ input: '_includes/favicon.svg' }));
site.use(metas());
site.use(
  feed({
    output: 'rss.xml',
    query: 'url^=/posts/',
    info: {
      title: "Eternasuno's Blog",
      generator: false,
    },
  })
);
site.use(reading_info({ extensions: ['.page.typ'] }));
site.use(pagefind());
site.use(check_urls());

export default site;
