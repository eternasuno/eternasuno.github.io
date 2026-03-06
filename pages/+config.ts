import type { Config } from 'vike/types';
import vikeSolid from 'vike-solid/config';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  description: 'Demo showcasing Vike',
  extends: [vikeSolid],
  prerender: true,
  // https://vike.dev/head-tags
  title: 'My Vike App',
} satisfies Config;
