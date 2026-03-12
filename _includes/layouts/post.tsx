export default ({ title, children, comp }: Lume.Data) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel='stylesheet' href='/style.css'></link>
    </head>
    <body>
      <comp.Header>header</comp.Header>
      {children}
      <comp.Footer>footer</comp.Footer>
    </body>
  </html>
);
