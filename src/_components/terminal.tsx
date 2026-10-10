import TerminalCommand, { type Props as CommandProps } from './terminal-command.tsx';

interface Props extends Omit<CommandProps, 'cursor'> {
  children: Lume.Data['children'];
}

const Titlebar = (props: CommandProps) => (
  <header class='terminal-titlebar'>
    <div class='terminal-buttons' aria-hidden='true'>
      <span class='terminal-dot bg-error'></span>
      <span class='terminal-dot bg-warning'></span>
      <span class='terminal-dot bg-success'></span>
    </div>
    <p class='terminal-title' aria-label='Terminal command' data-pagefind-ignore>
      <TerminalCommand {...props} cursor />
    </p>
  </header>
);

export default ({ children, ...command }: Props) => (
  <article class='terminal-window'>
    <Titlebar {...command} />
    <div class='terminal-body'>{children}</div>
  </article>
);
