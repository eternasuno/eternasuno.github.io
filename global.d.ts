declare module '*.md' {
  export interface MarkdownModule {
    content: string;
    excerpt: string;
    metadata: Record<string, unknown>;
  }

  const module: MarkdownModule;
  export default module;

  export const content: string;
  export const excerpt: string;
  export const metadata: Record<string, unknown>;
}
