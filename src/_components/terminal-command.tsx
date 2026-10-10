export interface Props {
  user: string;
  host: string;
  command: string;
  path?: string;
  cursor?: boolean;
}

export default ({ user, host, command, path = '~/blog', cursor = false }: Props) => (
  <>
    <span class='hidden sm:inline'>
      <span class='terminal-prompt'>{user}@{host}:</span>
    </span>
    <span class='terminal-path'>{path}</span> <span class='terminal-prompt'>$</span>{' '}
    <span class='terminal-cmd'>{command}</span>
    {cursor && <span class='terminal-cursor' aria-hidden='true'></span>}
  </>
);
