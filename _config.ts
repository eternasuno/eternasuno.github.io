import rehypeShiki from '@shikijs/rehype';
import { type Element } from 'hast';
import lume from 'lume/mod.ts';
import base_path from 'lume/plugins/base_path.ts';
import check_urls from 'lume/plugins/check_urls.ts';
import favicon from 'lume/plugins/favicon.ts';
import feed from 'lume/plugins/feed.ts';
import image_size from 'lume/plugins/image_size.ts';
import jsx from 'lume/plugins/jsx.ts';
import metas from 'lume/plugins/metas.ts';
import og_images from 'lume/plugins/og_images.ts';
import pagefind from 'lume/plugins/pagefind.ts';
import reading_info from 'lume/plugins/reading_info.ts';
import robots from 'lume/plugins/robots.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';
import process from 'node:process';
import typst from './src/_plugins/typst-plugin.ts';

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

const site = lume({
  src: 'src',
  location: new URL(DOMAIN),
  watcher: {
    dependencies: {
      'posts/*.page.typ': ['posts/_template.typ'],
    },
  },
});

site.add('_includes/style.css', 'style.css');
site.add('_includes/images', 'img');

site.use(jsx());
site.use(
  typst({
    inputs: { target: 'html' },
    selector: '<frontmatter>',
    plugins: [[rehypeShiki, {
      defaultColor: false,
      inline: 'tailing-curly-colon',
      themes: { dark: 'one-dark-pro', light: 'one-light' },
      transformers: [
        {
          name: 'add-line-numbers',
          line(node: Element, line: number) {
            node.properties['data-line'] = line;
          },
        },
      ],
    }]],
  }),
);
site.use(robots({ allow: [], disallow: '*' }));
site.use(tailwindcss());
site.use(image_size());
site.use(base_path());
site.use(og_images());
site.use(favicon({ input: '_includes/favicon.svg' }));
site.use(metas());
site.use(feed({
  output: 'rss.xml',
  query: 'url^=/posts/',
  info: {
    title: "Eternasuno's Blog",
    generator: false,
  },
}));
site.use(reading_info({ extensions: ['.page.typ'] }));
site.use(pagefind());
site.use(check_urls());

export default site;
