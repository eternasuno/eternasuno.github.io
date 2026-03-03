import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getAllPosts } from '~/lib/posts';

export const useGetPosts = routeLoader$(async () => {
  return await getAllPosts();
});

export default component$(() => {
  const posts = useGetPosts();

  return (
    <main class="mx-auto max-w-3xl p-6">
      <h1 class="mb-8 text-3xl font-bold">Blog</h1>
      <ul class="space-y-4">
        {posts.value.map((post) => (
          <li key={post.slug} class="border-b pb-4">
            <Link href={`/posts/${post.slug}`} class="hover:underline">
              <h2 class="text-xl font-semibold">{post.title}</h2>
            </Link>
            {post.date && <time class="text-sm text-gray-500">{}</time>}
            {post.description && <p class="mt-1 text-gray-600">{post.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Blog',
  meta: [
    {
      name: 'description',
      content: 'My blog posts',
    },
  ],
};
