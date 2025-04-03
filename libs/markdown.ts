import type { Element } from 'hast';

import rehypeMathML from '@daiji256/rehype-mathml';
import rehypeShiki from '@shikijs/rehype';
import rehypeGraphvizDiagram from 'rehype-graphviz-diagram';
import rehypeRewrite from 'rehype-rewrite';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { DOMAIN } from './config';

export const toHtml = async (markdown: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm, { singleTilde: false })
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeMathML, { displayMode: true })
      .use(rehypeGraphvizDiagram)
      .use(rehypeShiki, {
        inline: 'tailing-curly-colon',
        themes: {
          dark: 'one-dark-pro',
          light: 'one-light',
        },
      })
      .use(rehypeRewrite, {
        rewrite: (node) => {
          if (node.type !== 'element') {
            return;
          }

          switch (node.tagName) {
            case 'a':
              return rewriteAnchor(node);
            case 'img':
              return rewriteImg(node);
            default:
              return;
          }
        },
        selector: 'a,img',
      })
      .use(rehypeStringify)
      .process(markdown)
  );

const rewriteAnchor = (node: Element) => {
  const { properties } = node;
  const { href } = properties;
  if (typeof href !== 'string') {
    return;
  }

  properties.referrerpolicy = 'no-referrer';
  properties.rel = 'noopener';
  properties.target = '_blank';
};

const rewriteImg = (node: Element) => {
  const { properties } = node;
  const { src } = properties;
  if (typeof src !== 'string') {
    return;
  }

  properties.src = `${DOMAIN}/${src.replace(/^\/public/, '')}`;
};
