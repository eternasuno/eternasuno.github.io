import type { MarkdownModule } from './plugins/vite-plugin-markdown';

declare module '*.md' {
  const module: MarkdownModule;

  export default module;

  export const content: string;
  export const excerpt: string;
  export const metadata: Record<string, unknown>;
}
