export type Props = {
  user: string;
  host: string;
  command: string;
  path?: string;
  cursor?: boolean;
};

export default ({
  user,
  host,
  command,
  path = '~/blog',
  cursor = false,
}: Props) => (
  <>
    <span class="hidden text-success-content sm:inline dark:text-success">
      {user}@{host}:
    </span>
    <span class="text-info-content">{path}</span>{' '}
    <span class="text-success-content dark:text-success">$</span>{' '}
    <span class="text-primary">{command}</span>
    {cursor && (
      <span
        class="ml-0.5 inline-block h-0.5 w-2 bg-primary align-text-bottom motion-safe:animate-pulse"
        aria-hidden="true"
      ></span>
    )}
  </>
);
