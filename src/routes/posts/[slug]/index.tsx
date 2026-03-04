import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { getPostBySlug, getSlugs } from '@/lib/posts';

export const useGetPost = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;
  const post = getPostBySlug(slug);

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
        <h1 class="font-bold text-2xl">Post not found</h1>
      </main>
    );
  }

  return (
    <main class="mx-auto max-w-3xl p-6">
      <article class="prose-lg prose max-w-none">
        <h1>{post.value.title}</h1>
        {post.value.publishAt && (
          <time class="text-gray-500 text-sm">{post.value.publishAt.toDateString()}</time>
        )}
        <div dangerouslySetInnerHTML={post.value.content} />
      </article>
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const slugs = await getSlugs();
  return {
    params: slugs.map((slug) => ({ slug })),
  };
};

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(useGetPost);
  return {
    meta: [
      {
        content: post?.excerpt || '',
        name: 'description',
      },
    ],
    title: post?.title || 'Post',
  };
};
