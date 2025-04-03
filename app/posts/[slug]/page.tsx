import Container from '@/components/atoms/container';
import Time from '@/components/atoms/time';
import Markdown from '@/components/molecules/markdown';
import { getPostBySlug, getSlugs } from '@/libs/post';

export const dynamicParams = false;

export const generateStaticParams = async () => (await getSlugs()).map((slug) => ({ slug }));

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { content, publishAt, title } = await getPostBySlug(slug);

  return (
    <Container className="space-y-8">
      <h2 className="text-3xl capitalize">{title}</h2>
      <Time className="text-sm text-base-content/75" date={publishAt} />
      <Markdown className="mt-5 pl-3">{content}</Markdown>
    </Container>
  );
};

export default Page;
