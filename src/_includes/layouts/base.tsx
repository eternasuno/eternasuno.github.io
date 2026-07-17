export default ({ author, metas, children, comp, search, title, url }: Lume.Data) => (
  <html data-theme="custom-dark">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <title>{metas?.site}</title>
    </head>
    <body class="bg-[#0f1722] text-[#c8d6e5] min-h-dvh">
      <div class="mx-auto max-w-[800px] px-6 flex flex-col min-h-dvh">
        <header class="pt-8">
          <comp.Header metas={metas} title={title} url={url} />
        </header>
        <main class="flex-1">
          {children}
        </main>
        <comp.Footer author={author} />
        <comp.Searchdialog />
      </div>
    </body>
  </html>
);
