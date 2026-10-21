export default ({ children, id }: { children: Lume.Data['children']; id?: string }) => (
  <h1
    id={id}
    class='m-0 text-3xl font-bold leading-tight tracking-tight text-primary wrap-anywhere text-shadow-sm text-shadow-primary/30 lg:text-4xl'
  >
    {children}
  </h1>
);
