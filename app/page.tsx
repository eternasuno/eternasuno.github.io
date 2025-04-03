import Container from '@/components/atoms/container';
import Link from '@/components/atoms/link';
import Time from '@/components/atoms/time';
import Markdown from '@/components/molecules/markdown';
import { getPosts } from '@/libs/post';

export default async function Home() {
  const posts = await getPosts();

  return (
    <ol>
      {posts.map(({ excerpt, publishAt, slug, title }) => (
        <Container asChild key={slug}>
          <li>
            <h2 className="text-3xl capitalize">
              <Link className="no-underline" href={`/posts/${slug}`}>
                {title}
              </Link>
            </h2>
            <Time className="text-sm text-base-content/75" date={publishAt} />
            <Markdown className="mt-5 pl-3">{excerpt}</Markdown>
          </li>
        </Container>
      ))}
    </ol>
  );
}
