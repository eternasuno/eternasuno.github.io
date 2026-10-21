import Footer from '../../_components/footer.tsx';
import Header from '../../_components/header.tsx';

export default ({ metas, children, title, author }: Lume.Data) => {
  const siteName = typeof metas?.site === 'string' ? metas.site : 'Blog';

  return (
    <html id='top' lang='zh-CN'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='/style.css' />
        <link rel='alternate' type='application/rss+xml' href='/rss.xml' />
        <title>{title}</title>
      </head>
      <body class='flex min-h-dvh flex-col leading-[1.7] antialiased'>
        <Header site={siteName} />
        <main
          id='main-content'
          class='terminal-guide'
        >
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
};
