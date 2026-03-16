export default ({ title, metas, children, comp }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' href='/style.css'></link>
      <title>{title}</title>
    </head>
    <body class='mx-auto flex min-h-dvh max-w-3xl flex-col space-y-4 p-6'>
      <comp.Header title={metas?.site} />
      <main class='grow'>{children}</main>
      <comp.Footer />
    </body>
  </html>
);
