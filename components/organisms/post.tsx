import Link from '../atoms/link';
import Strong from '../atoms/strong';
import Tag from '../atoms/tag';
import Time from '../atoms/time';
import MDProse from '../molecules/md-prose';

type Props = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

const Post = ({ slug, title, date, tags, excerpt }: Props) => (
  <section className="grid items-center gap-y-2 py-8 md:grid-cols-[1fr_4fr] md:py-12">
    <Strong asChild className="text-2xl md:col-start-2">
      <Link $primary href={`/posts/${slug}`}>
        {title}
      </Link>
    </Strong>
    <Time className="font-serif text-secondary italic md:row-start-1" dateTime={date} />
    <MDProse className="md:col-start-2 prose-p:my-2" markdown={excerpt} />
    <ul className="flex flex-wrap gap-2 md:col-start-2">
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
  </section>
);

export default Post;
