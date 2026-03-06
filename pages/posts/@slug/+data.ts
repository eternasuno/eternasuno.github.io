import type { PageContextServer } from 'vike/types';
import { getPostBySlug } from '../../../lib/post';

export const data = async (pageContext: PageContextServer) => {
  const { slug } = pageContext.routeParams;
  const post = getPostBySlug(slug);
  return post;
};
