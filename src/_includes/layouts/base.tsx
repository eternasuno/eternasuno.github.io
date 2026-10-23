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
      <body class='flex min-h-dvh flex-col font-mono leading-relaxed antialiased [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-primary'>
        <Header site={siteName} />
        <main
          id='main-content'
          class='relative flex-1 bg-radial-[at_50%_0%] from-primary/5 to-65% to-transparent px-4 pt-12 pb-16 max-lg:px-3 max-lg:pt-6 max-lg:pb-8'
        >
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
};
