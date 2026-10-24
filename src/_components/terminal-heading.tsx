export default ({ children, id }: { children: Lume.Data['children']; id?: string }) => (
  <h1
    id={id}
    class="wrap-anywhere m-0 font-bold text-3xl text-primary text-shadow-primary/30 text-shadow-sm leading-tight tracking-tight lg:text-4xl"
  >
    {children}
  </h1>
);
