export default ({ author }: { author: string }) => {
  const year = new Date().getFullYear();

  return (
    <footer class="mt-16 pt-6 border-t border-[#b8b0a4] text-xs text-[#6b6560]">
      <p>
        &copy; {year} {author} &middot;{" "}
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em]"
        >
          rss
        </a>{" "}
        &middot;{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em]"
        >
          CC BY-NC-SA 4.0
        </a>
      </p>
    </footer>
  );
};
