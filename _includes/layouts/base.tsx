export default ({ author, metas, children, comp }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' href='/style.css'></link>
      <link rel='alternate' type='application/rss+xml' href='/rss.xml'></link>
      <title>{metas?.site}</title>
    </head>
    <body class='mx-auto flex min-h-dvh w-screen max-w-196 flex-col gap-y-4 p-8'>
      <comp.Header title={metas?.site} />
      <main class='grow'>{children}</main>
      <comp.Footer author={author} />
    </body>
  </html>
);
