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
      <span class='text-success'>{user}@{host}:</span>
    </span>
    <span class='text-info'>{path}</span> <span class='text-success'>$</span>{' '}
    <span class='text-primary'>{command}</span>
    {cursor && (
      <span
        class='ml-0.5 inline-block h-0.5 w-2 align-text-bottom bg-primary motion-safe:animate-pulse'
        aria-hidden='true'
      >
      </span>
    )}
  </>
);
