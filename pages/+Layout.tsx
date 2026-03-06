// https://vike.dev/Layout

import './tailwind.css';
import type { JSX } from 'solid-js';
import { Link } from '../components/Link';

export default function Layout(props: { children?: JSX.Element }) {
  return (
    <div class="min-h-screen bg-base-100">
      {/* 导航栏 */}
      <nav class="navbar bg-base-200 shadow-lg">
        <div class="container mx-auto">
          <div class="flex-1">
            <Link href="/" class="btn btn-ghost text-xl font-bold text-primary">
              📝 我的博客
            </Link>
          </div>
          <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
              <li>
                <Link href="/" class="font-medium">
                  首页
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main class="min-h-[calc(100vh-8rem)]">{props.children}</main>

      {/* 页脚 */}
      <footer class="footer footer-center bg-base-200 p-10 text-base-content">
        <aside>
          <p class="font-semibold text-lg">我的技术博客</p>
          <p class="text-base-content/70">分享前端开发与技术思考</p>
          <p class="text-sm text-base-content/60 mt-2">
            © {new Date().getFullYear()} - 使用 Vike + Solid 构建
          </p>
        </aside>
      </footer>
    </div>
  );
}
