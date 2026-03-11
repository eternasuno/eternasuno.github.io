import { bundledLanguages } from '@FuriouZz/shiki/deps.ts';
import shiki from '@FuriouZz/shiki/mod.ts';
import lume from 'lume/mod.ts';
import base_path from 'lume/plugins/base_path.ts';
import extract_date from 'lume/plugins/extract_date.ts';
import favicon from 'lume/plugins/favicon.ts';
import feed from 'lume/plugins/feed.ts';
import jsx from 'lume/plugins/jsx.ts';
import og_images from 'lume/plugins/og_images.ts';
import picture from 'lume/plugins/picture.ts';
import robots from 'lume/plugins/robots.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';
import transform_images from 'lume/plugins/transform_images.ts';
import process from 'node:process';
import typst from './plugins/typst-plugin.ts';

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

const site = lume({
  location: new URL(DOMAIN),
  watcher: {
    dependencies: {
      'posts/**/*.page.typ': ['posts/_template.typ'],
    },
  },
});

site.add('style.css');
site.add('_assets/images', 'images');

site.use(jsx());
site.use(typst({ inputs: { target: 'html' }, selector: '<frontmatter>' }));
site.use(robots({ disallow: '*' }));
site.use(tailwindcss());
site.use(base_path());
site.use(og_images());
site.use(favicon());
site.use(picture());
site.use(transform_images());
site.use(feed());
site.use(extract_date());
site.use(shiki(
  {
    highlighter: {
      langs: Object.keys(bundledLanguages),
      themes: ['github-light', 'github-dark'],
    },
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
));

export default site;
