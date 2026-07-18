export default ({ metas, children, comp, title }: Lume.Data) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='stylesheet' href='/style.css' />
      <link rel='alternate' type='application/rss+xml' href='/rss.xml' />
      <title>{title}</title>
    </head>
    <body class='mx-auto flex min-h-dvh max-w-3xl flex-col'>
      <comp.Header site={metas?.site || 'Blog'} />
      <main class='flex-1'>
        {children}
      </main>
      <comp.Footer />
    </body>
  </html>
);
