import Footer from '../../_components/footer.tsx';
import Header from '../../_components/header.tsx';

export default ({ metas, children, title, author }: Lume.Data) => {
  const siteName = typeof metas?.site === 'string' ? metas.site : 'Blog';

  return (
    <html id='top' lang='zh-CN' class='scroll-smooth bg-base-100'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='/style.css' />
        <link rel='alternate' type='application/rss+xml' href='/rss.xml' />
        <title>{title}</title>
      </head>
      <body class='flex min-h-dvh flex-col'>
        <Header site={siteName} />
        <main class='mx-auto w-screen max-w-160 flex-1 px-6 py-16'>
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
};
