export default ({ author, metas, children, comp, search, title, url }: Lume.Data) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <title>{metas?.site}</title>
    </head>
    <body class="bg-[#ddd5c8] text-[#2a2a2a]">
      <div class="mx-auto flex min-h-dvh max-w-6xl flex-col lg:flex-row">
        <aside class="w-full lg:w-[35%] p-6 lg:p-8 lg:pr-12 lg:sticky lg:top-0 lg:h-fit">
          <comp.Sidebar search={search} metas={metas} title={title} url={url} />
        </aside>
        <main class="w-full lg:w-[65%] p-6 lg:p-8 lg:pl-12 flex-1">
          {children}
          <comp.Footer author={author} />
        </main>
      </div>
    </body>
  </html>
);
