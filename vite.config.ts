import tailwindcss from '@tailwindcss/vite';
import vike from 'vike/plugin';
import vikeSolid from 'vike-solid/vite';
import { defineConfig } from 'vite';
import markdownPlugin from './plugins/vite-plugin-markdown';

export default defineConfig({
  plugins: [vike(), vikeSolid(), tailwindcss(), markdownPlugin()],
});
