import Hero from '@/components/atoms/hero';
import Link from '@/components/atoms/link';
import Strong from '@/components/atoms/strong';
import Tag from '@/components/atoms/tag';
import Post from '@/components/organisms/post';
import { getPosts, getTags } from '@/libs/post';
import type { Metadata } from 'next';

const Page = async () => {
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  return (
    <>
      <Hero className="space-y-8">
        <Strong asChild className="text-3xl md:text-5xl">
          <h1>
            explore <span className="text-primary">all</span> posts by tags
          </h1>
        </Strong>
        <ul className="flex flex-wrap gap-2">
          <li key="all">
            <Tag className="cursor-not-allowed bg-primary text-primary-content">All</Tag>
          </li>
          {tags.map((tag) => (
            <li key={tag}>
              <Tag asChild>
                <Link $primary href={`/tags/${tag}`}>
                  {tag}
                </Link>
              </Tag>
            </li>
          ))}
        </ul>
      </Hero>

      <ol className="divide-y divide-neutral/50">
        {posts.map((post) => (
          <li key={post.slug}>
            <Post {...post} />
          </li>
        ))}
      </ol>
    </>
  );
};

export const generateMetadata = async () =>
  ({ alternates: { canonical: 'tags' }, title: 'tags' }) as Metadata;

export default Page;
