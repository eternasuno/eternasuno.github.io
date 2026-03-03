import { component$ } from '@builder.io/qwik';
import {
  routeLoader$,
  type DocumentHead,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { getAllPosts, getPostBySlug } from '~/lib/posts';

export const useGetPost = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    requestEvent.status(404);
    return null;
  }

  return post;
});

export default component$(() => {
  const post = useGetPost();

  if (!post.value) {
    return (
      <main class="mx-auto max-w-3xl p-6">
        <h1 class="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main class="mx-auto max-w-3xl p-6">
      <article class="prose prose-lg max-w-none">
        <h1>{post.value.title}</h1>
        {post.value.date && <time class="text-sm text-gray-500">{post.value.date}</time>}
        <div dangerouslySetInnerHTML={post.value.content} />
      </article>
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const posts = await getAllPosts();
  return {
    params: posts.map((post) => ({ slug: post.slug })),
  };
};

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(useGetPost);
  return {
    title: post?.title || 'Post',
    meta: [
      {
        name: 'description',
        content: post?.description || '',
      },
    ],
  };
};
