export default ({ author, title, children, comp }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' href='/style.css'></link>
      <link rel='alternate' type='application/rss+xml' href='/rss.xml'></link>
      <title>{title}</title>
    </head>
    <body class='flex min-h-dvh min-w-max flex-col'>
      <comp.Header author={author} />
      <main class='mx-auto w-screen max-w-7xl grow space-y-12 px-6 py-12'>{children}</main>
      <comp.Footer author={author} />
    </body>
  </html>
);
