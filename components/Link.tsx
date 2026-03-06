import { createMemo, type JSX } from 'solid-js';
import { usePageContext } from 'vike-solid/usePageContext';

export const Link = (props: { href: string; children: JSX.Element; class?: string }) => {
  const pageContext = usePageContext();
  const isActive = createMemo(() =>
    props.href === '/'
      ? pageContext.urlPathname === props.href
      : pageContext.urlPathname.startsWith(props.href)
  );

  const className = createMemo(() => {
    const classes = [props.class, isActive() ? 'is-active' : undefined].filter(Boolean).join(' ');
    return classes || undefined;
  });

  return (
    <a href={props.href} class={className()}>
      {props.children}
    </a>
  );
};
