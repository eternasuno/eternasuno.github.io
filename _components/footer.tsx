export default ({ author }: { author: string }) => (
  <footer class='flex justify-between gap-4 bg-primary p-2 text-primary-content/75 text-xs hover:text-primary-content'>
    <span>© 2026 {author}</span>
    <a class='link link-hover justify-self-end' href=''>CC BY-NC 4.0</a>
  </footer>
);
