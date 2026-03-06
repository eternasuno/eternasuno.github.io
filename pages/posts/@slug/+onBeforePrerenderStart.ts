import { getSlugs } from '../../../lib/post';

export const onBeforePrerenderStart = () => {
  const slugs = getSlugs();
  return slugs.map((slug) => `/posts/${slug}`);
};
