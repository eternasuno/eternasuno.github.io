import TerminalCommand, { type Props as CommandProps } from './terminal-command.tsx';

interface Props extends Omit<CommandProps, 'user' | 'command' | 'cursor'> {
  author: string;
}

export default ({ author, ...prompt }: Props) => (
  <footer class='mt-8 border-t border-dashed border-primary/30 pt-6'>
    <p class='mb-1 text-sm text-base-content/75' data-pagefind-ignore>
      <TerminalCommand {...prompt} user={author} command='whoami' />
    </p>
    <p class='mb-6 text-sm text-primary/80'>
      Maintained by{' '}
      <a class='link link-hover text-info decoration-dashed underline-offset-4' href='/'>
        {author}
      </a>
    </p>
  </footer>
);
