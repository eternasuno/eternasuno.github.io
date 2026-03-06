import { useData } from 'vike-solid/useData';
import { Link } from '../../../components/Link';

type Post = {
  content: string;
  excerpt: string;
  publishAt: Date;
  slug: string;
  title: string;
};

export default function Page() {
  const post = useData<Post>();

  return (
    <div class="container mx-auto max-w-4xl px-4 py-8">
      {/* 返回按钮 */}
      <div class="mb-8">
        <Link href="/" class="btn btn-ghost btn-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>
      </div>

      {/* 文章头部 */}
      <article class="prose prose-lg max-w-none">
        <div class="mb-8 border-b border-base-300 pb-8">
          <h1 class="mb-4 font-bold text-4xl md:text-5xl text-base-content">{post.title}</h1>
          <div class="flex items-center gap-4 text-base-content/60">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time>
                {new Date(post.publishAt).toLocaleDateString('zh-CN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>

        {/* 文章内容 */}
        <div
          class="prose-headings:text-base-content prose-p:text-base-content/90 prose-a:text-primary prose-strong:text-base-content prose-code:text-primary prose-pre:bg-base-200 prose-img:rounded-lg prose-blockquote:border-l-primary"
          innerHTML={post.content}
        />
      </article>

      {/* 文章底部导航 */}
      <div class="mt-12 pt-8 border-t border-base-300">
        <div class="flex justify-center">
          <Link href="/" class="btn btn-primary">
            查看更多文章
          </Link>
        </div>
      </div>
    </div>
  );
}
