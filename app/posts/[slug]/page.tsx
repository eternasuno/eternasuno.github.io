import Hero from '@/components/atoms/hero';
import Link from '@/components/atoms/link';
import Strong from '@/components/atoms/strong';
import Tag from '@/components/atoms/tag';
import Time from '@/components/atoms/time';
import MDProse from '@/components/molecules/md-prose';
import { getPostBySlug, getSlugs } from '@/libs/post';
import type { Metadata } from 'next';

export const dynamicParams = false;

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { title, date, content, tags } = await getPostBySlug(slug);

  return (
    <>
      <Hero className="space-y-2 text-center">
        <Time className="font-serif" dateTime={date} format="EEEE, LLLL do, yyyy" />
        <Strong asChild className="text-4xl md:text-6xl">
          <h1>{title}</h1>
        </Strong>
      </Hero>

      <div className="my-8 space-y-8 md:my-12">
        <MDProse className="flex-1" markdown={content} />
        <ul className="flex flex-wrap gap-2">
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
      </div>
    </>
  );
};

export const generateStaticParams = async () => (await getSlugs()).map((slug) => ({ slug }));

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { title, excerpt: description } = await getPostBySlug(slug);

  return {
    alternates: { canonical: `/posts/${slug}` },
    description,
    title,
  } as Metadata;
};

export default Page;
