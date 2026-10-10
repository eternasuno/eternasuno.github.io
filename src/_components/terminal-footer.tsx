import TerminalCommand, { type Props as CommandProps } from './terminal-command.tsx';

interface Props extends Omit<CommandProps, 'user' | 'command' | 'cursor'> {
  author: string;
}

export default ({ author, ...prompt }: Props) => (
  <footer class='terminal-footer'>
    <p class='terminal-footer-line' data-pagefind-ignore>
      <TerminalCommand {...prompt} user={author} command={`echo "Maintained by ${author}"`} />
    </p>
    <p class='terminal-footer-output'>
      Maintained by <a class='link link-hover' href='/'>{author}</a>
    </p>
  </footer>
);
