import Container from '@/components/atoms/container';
import Post from '@/components/organisms/post';
import { getPostBySlug, getSlugs } from '@/libs/post';

export const dynamicParams = false;

export const generateStaticParams = async () => (await getSlugs()).map((slug) => ({ slug }));

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { content, publishAt, title } = await getPostBySlug(slug);

  return (
    <Container asChild>
      <Post content={content} publishAt={publishAt} slug={slug} title={title} />
    </Container>
  );
};

export default Page;
