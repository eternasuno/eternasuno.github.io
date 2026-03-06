import { getPosts } from '../../lib/post';

export const data = async () => {
  const posts = getPosts();
  return { posts };
};
