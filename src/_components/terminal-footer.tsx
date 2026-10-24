import TerminalCommand, { type Props as CommandProps } from './terminal-command.tsx';

interface Props extends Omit<CommandProps, 'user' | 'command' | 'cursor'> {
  author: string;
}

export default ({ author, ...prompt }: Props) => (
  <footer class="mt-8 border-dashed border-primary/30 border-t pt-6">
    <p class="mb-1 text-base-content/75 text-sm" data-pagefind-ignore>
      <TerminalCommand user={author} command='whoami' {...prompt} />
    </p>
    <p class="mb-6 text-primary/80 text-sm">
      Maintained by{' '}
      <a class='link link-hover text-info decoration-dashed underline-offset-4' href='/'>
        {author}
      </a>
    </p>
  </footer>
);
