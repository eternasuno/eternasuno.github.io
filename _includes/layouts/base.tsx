export default ({ title, children, comp }: Lume.Data) => (
  <html lang='zh-CN' data-theme='newsprint-night'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>
      <link rel='stylesheet' href='/style.css'></link>
    </head>
    <body class='min-h-screen text-base-content'>
      <div class='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
        <div class='news-grid absolute inset-0 opacity-20'>
        </div>
      </div>

      <comp.Header />
      <main class='mx-auto max-w-6xl px-4 py-10 md:px-6'>{children}</main>
      <comp.Footer />
    </body>
  </html>
);
