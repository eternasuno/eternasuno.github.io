import rehypeShiki from '@shikijs/rehype';
import lume from 'lume/mod.ts';
import base_path from 'lume/plugins/base_path.ts';
import extract_date from "lume/plugins/extract_date.ts";
import favicon from 'lume/plugins/favicon.ts';
import feed from 'lume/plugins/feed.ts';
import jsx from 'lume/plugins/jsx.ts';
import og_images from 'lume/plugins/og_images.ts';
import picture from 'lume/plugins/picture.ts';
import robots from 'lume/plugins/robots.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';
import transform_images from 'lume/plugins/transform_images.ts';
import typst from './_lib/typst-plugin.ts';

const site = lume();

site.use(jsx());
site.use(robots());
site.use(tailwindcss());
site.use(base_path());
site.use(og_images());
site.use(favicon());
site.use(picture());
site.use(transform_images());
site.use(feed());
site.use(extract_date());
site.use(typst({
  plugins: [
    [rehypeShiki, {
      inline: 'tailing-curly-colon',
      themes: { dark: 'one-dark-pro', light: 'one-light' },
    }],
  ],
  inputs: {target:'html'},
  selector: '<frontmatter>',
}));

site.add('_assets/images', 'images');

export default site;
