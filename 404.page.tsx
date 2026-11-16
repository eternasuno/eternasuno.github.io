import Terminal from './_components/terminal.tsx';
import TerminalCommand from './_components/terminal-command.tsx';
import TerminalHeading from './_components/terminal-heading.tsx';
import TerminalStatus from './_components/terminal-status.tsx';

export const title = '404 Not Found';

const banner = [
  ' _  _    ___  _  _',
  '| || |  / _ \\| || |',
  '| || |_| | | | || |_',
  '|__   _| |_| |__   _|',
  '   |_|  \\___/   |_|',
].join('\n');

const suggestionClass =
  'flex w-full cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-b-primary/12 border-l-2 border-l-transparent px-3 py-3 text-left hover:border-l-primary hover:bg-primary/8 focus-visible:border-l-primary focus-visible:bg-primary/8';

const RequestPath = () => <span data-request-path>this-page</span>;

const Comment = ({ children }: { children: Lume.Data['children'] }) => (
  <span class="text-base-content/75">
    <span aria-hidden="true"># </span>
    {children}
  </span>
);

const Suggestions = ({ user, host }: { user: string; host: string }) => (
  <nav class="mb-8" aria-label="Suggestions">
    <p class="mb-3 text-base-content/75 text-sm">
      It may have been moved or deleted. Try:
    </p>
    <ul class="text-sm leading-relaxed">
      <li>
        <a class={suggestionClass} href="/">
          <span aria-hidden="true">
            <TerminalCommand user={user} host={host} path="~" command="cd ~" />
          </span>
          <Comment>Back to home</Comment>
        </a>
      </li>
      <li>
        <button
          type="button"
          class={suggestionClass}
          aria-haspopup="dialog"
          aria-controls="search_modal"
          onclick="const dialog = document.getElementById('search_modal'); dialog.showModal(); dialog.querySelector('input')?.focus()"
        >
          <span aria-hidden="true">
            <TerminalCommand
              user={user}
              host={host}
              path="~"
              command="find . -name"
            />
          </span>
          <Comment>Search posts</Comment>
        </button>
      </li>
    </ul>
  </nav>
);

export default ({ author, hostname }: Lume.Data) => (
  <Terminal
    user={author}
    host={hostname}
    path="~"
    command={
      <>
        cd <RequestPath />
      </>
    }
  >
    <p class="wrap-anywhere mb-8 text-base-content/75 text-sm">
      bash: cd: <RequestPath />: No such file or directory
    </p>
    <header class="mb-8 border-b border-primary/30 pb-6">
      <pre
        class="mb-6 text-primary text-shadow-primary/30 text-shadow-sm text-xs leading-tight sm:text-sm"
        aria-hidden="true"
      >
        {banner}
      </pre>
      <TerminalHeading>Page not found</TerminalHeading>
    </header>
    <Suggestions user={author} host={hostname} />
    <TerminalStatus>E404: Not Found</TerminalStatus>
    <script
      dangerouslySetInnerHTML={{
        __html:
          "for (const node of document.querySelectorAll('[data-request-path]')) node.textContent = location.pathname;",
      }}
    />
  </Terminal>
);
