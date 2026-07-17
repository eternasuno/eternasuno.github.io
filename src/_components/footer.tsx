export default ({ author }: { author: string }) => {
  const year = new Date().getFullYear();

  return (
    <footer class="py-8 text-xs text-[#3a4a5c] text-center">
      <p>
        &copy; {year} {author} &middot;{" "}
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          rss
        </a>{" "}
        &middot;{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          CC BY-NC-SA 4.0
        </a>
      </p>
    </footer>
  );
};
