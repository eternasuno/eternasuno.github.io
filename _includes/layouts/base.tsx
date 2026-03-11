export default ({ title, children }: Lume.Data) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel='stylesheet' href='/style.css'></link>
    </head>
    <body>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </body>
  </html>
);
