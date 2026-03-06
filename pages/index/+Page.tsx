import post from '../../posts/2026-01-15-qwik-intro.md';
import { Counter } from './Counter.js';

export default function Page() {
  return (
    <>
      <div innerHTML={post.content}></div>
      <h1>My Vike app</h1>
      <p>This page is:</p>
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}
