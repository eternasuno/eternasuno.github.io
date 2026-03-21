export default ({ author }: { author: string }) => (
  <footer class='flex justify-between gap-4 py-2 text-base-content/75 text-xs'>
    <span class='hover:text-base-content'>© 2026 {author}</span>
    <a
      class='link link-hover hover:text-base-content'
      href='https://creativecommons.org/licenses/by-nc/4.0/'
      target='_blank'
      rel='noopener noreferrer'
    >
      CC BY-NC 4.0
    </a>
  </footer>
);
