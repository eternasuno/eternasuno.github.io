import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';
import { getPosts } from '@/lib/posts';

export const useGetPosts = routeLoader$(async () => {
  return await getPosts();
});

export default component$(() => {
  const posts = useGetPosts();

  return (
    <main class="mx-auto max-w-3xl p-6">
      <h1 class="mb-8 font-bold text-3xl">Blog</h1>
      <ul class="space-y-4">
        {posts.value.map((post) => (
          <li key={post.slug} class="border-b pb-4">
            <Link href={`/posts/${post.slug}`} class="hover:underline">
              <h2 class="font-semibold text-xl">{post.title}</h2>
            </Link>
            {post.publishAt && (
              <time class="text-gray-500 text-sm">{post.publishAt.toDateString()}</time>
            )}
            <div class="mt-1 text-gray-600" dangerouslySetInnerHTML={post.excerpt} />
          </li>
        ))}
      </ul>
    </main>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      content: 'My blog posts',
      name: 'description',
    },
  ],
  title: 'Blog',
};
