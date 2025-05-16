import Link from '../atoms/link';
import Time from '../atoms/time';
import Markdown from '../molecules/markdown';

type Props = {
  content: string;
  publishAt: Date;
  slug: string;
  title: string;
};

const Post = ({ content, publishAt, slug, title }: Props) => (
  <div className="space-y-4 sm:space-y-8">
    <h1 className="border-b-2 border-dashed pb-4 text-2xl font-normal text-primary">
      <Link href={`/posts/${slug}`}>{title}</Link>
    </h1>
    <Markdown>{content}</Markdown>
    <p className="text-end text-sm text-primary/75">
      <Time date={publishAt} />
    </p>
  </div>
);

export default Post;
