import type { Config } from 'vike/types';
import vikeSolid from 'vike-solid/config';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  description: '我的技术博客 - 分享前端开发与技术思考',
  extends: [vikeSolid],
  prerender: true,
  // https://vike.dev/head-tags
  title: '我的博客',
} satisfies Config;
