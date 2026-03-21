export default ({ author, title, children, comp }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' href='/style.css'></link>
      <link rel='alternate' type='application/rss+xml' href='/rss.xml'></link>
      <title>{title}</title>
    </head>
    <body class='mx-auto flex min-h-dvh min-w-max max-w-180 flex-col gap-y-4'>
      <comp.Header title={title} />
      <main class='grow'>{children}</main>
      <comp.Footer author={author} />
    </body>
  </html>
);
