import TerminalCommand, { type Props as CommandProps } from './terminal-command.tsx';

interface Props extends Omit<CommandProps, 'cursor'> {
  children: Lume.Data['children'];
}

const Titlebar = (props: CommandProps) => (
  <header class='flex items-center gap-3 border-b border-primary/30 bg-base-200 px-4 py-3'>
    <div class='flex shrink-0 gap-2' aria-hidden='true'>
      <span class='size-3 rounded-full bg-error'></span>
      <span class='size-3 rounded-full bg-warning'></span>
      <span class='size-3 rounded-full bg-success'></span>
    </div>
    <p
      class="min-w-0 flex-1 truncate text-base-content/75 text-xs leading-relaxed"
      aria-label='Terminal command'
      data-pagefind-ignore
    >
      <TerminalCommand {...{ ...props, cursor: true }} />
    </p>
  </header>
);

export default ({ children, ...command }: Props) => (
  <article class="mx-auto w-full max-w-[62.5rem] overflow-hidden rounded-xl border border-primary/30 bg-base-100 shadow-primary/10 shadow-xl">
    <Titlebar {...command} />
    <div class='relative p-6 sm:p-8 lg:p-12'>{children}</div>
  </article>
);
