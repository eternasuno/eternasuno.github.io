export default ({ title, children, comp }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>
      <link rel='stylesheet' href='/style.css'></link>
    </head>
    <body class='min-h-dvh flex flex-col max-w-3xl mx-auto'>
      <comp.Header />
      <main class='grow'>{children}</main>
      <comp.Footer />
    </body>
  </html>
);
