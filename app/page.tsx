import { getPosts } from '@/lib/post';

export default async () => {
  const posts = await getPosts();

  return (
    <div className="bg-white">
      {posts.map((post) => (
        <div key={post.slug} className="mb-4">
          <h2 className="font-bold text-xl">{post.title}</h2>
          {/** biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the content is sanitized */}
          <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
        </div>
      ))}
    </div>
  );
};
