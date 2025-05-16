import Post from '@/components/organisms/post';
import { getPosts } from '@/libs/post';

export default async function Home() {
  const posts = await getPosts();

  return (
    <ol className="space-y-8">
      {posts.map(({ excerpt, publishAt, slug, title }) => (
        <li className="border-b border-base-content/15 pb-8" key={slug}>
          <Post content={excerpt} publishAt={publishAt} slug={slug} title={title} />
        </li>
      ))}
    </ol>
  );
}
