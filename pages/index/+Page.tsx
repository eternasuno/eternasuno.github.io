import { useData } from 'vike-solid/useData';
import { Link } from '../../components/Link';

type Post = {
  content: string;
  excerpt: string;
  publishAt: Date;
  slug: string;
  title: string;
};

export default function Page() {
  const data = useData<{ posts: Post[] }>();
  const posts = data?.posts || [];

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-12 text-center">
        <h1 class="mb-4 font-bold text-5xl text-primary">我的博客</h1>
        <p class="text-base-content/70 text-lg">分享技术见解与思考</p>
      </div>

      {posts.length > 0 ? (
        <div class="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div class="card bg-base-100 shadow-xl transition-all hover:shadow-2xl">
              <div class="card-body">
                <h2 class="card-title text-2xl">
                  <Link href={`/posts/${post.slug}`} class="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <div class="mb-3 flex items-center gap-2 text-base-content/60 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
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
                  <time>{new Date(post.publishAt).toLocaleDateString('zh-CN')}</time>
                </div>
                {post.excerpt && (
                  <div class="text-base-content/80 line-clamp-3" innerHTML={post.excerpt} />
                )}
                <div class="card-actions justify-end mt-4">
                  <Link href={`/posts/${post.slug}`} class="btn btn-primary btn-sm">
                    阅读更多
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="text-center py-16">
          <p class="text-base-content/60 text-xl">暂无文章</p>
        </div>
      )}
    </div>
  );
}
