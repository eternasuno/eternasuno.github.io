#import "./_template.typ": post

#show: post.with(
  title: "Hello World",
  description: "从 Next.js + Markdown 迁移到 Lume + Typst：记录这个博客的选型过程、遇到的问题与对 SSG 的思考。",
  tags: ("typst", "lume", "ssg"),
)

之前我一直使用 #link("https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation")[Next.js 静态生成（SSG）]搭建博客。但框架日益臃肿、构建速度缓慢，加上 Next.js 此前接连爆出安全漏洞，高昂的维护成本最终促使我决定重构博客。

与此同时，Markdown 的局限也在过去写博客的过程中逐渐显现。数学公式这类复杂功能不必说，连删除线这样的基础格式也不在核心规范内，必须依赖扩展。扩展用得越多，维护成本越高，文档的可移植性也越差。所以我想借这次重构，试试其他的排版语言。

我对新方案的要求有四点：

+ 原生支持 Unicode（正文是中文）。
+ 能排版数学公式。
+ 能编译成 HTML。
+ 能在 JavaScript 环境中运行（便于接入静态网站生成器）。

= 通向 Typst 之路

提到排版语言，我首先想到的是 #link("https://www.latex-project.org/")[LaTeX]。但传统 LaTeX 历史包袱较重，也没有足够简单、成熟的 JavaScript 库能把完整文档编译成 HTML。

接着我调研了 #link("https://asciidoctor.org/")[Asciidoctor]。它有官方的 JavaScript 编译库并维护了一部分常用插件，但当时 #link("https://docs.asciidoctor.org/asciidoctor.js/latest/")[Asciidoctor.js] 的更新并不积极，而且 Asciidoctor 本身相对小众，社区和生态都比较有限。（注：在我放弃之后，Asciidoctor.js 反而恢复了频繁更新。）

最终我选择了 #link("https://typst.app/")[Typst]。它是一个基于 Rust 的开源排版系统，原生支持 Unicode 和数学公式，也可以编译成 HTML。同时，#link("https://myriad-dreamin.github.io/typst.ts/cookery/get-started.html")[typst.ts] 提供了编译绑定，让它可以直接在 JavaScript 环境中运行。这四点要求它都满足。

不过，将 Typst 编译为 HTML 还有一些细节需要打磨。下面是我遇到的问题和解决办法：

+ *数学公式渲染。* 最初写作本文时，Typst 的 HTML 导出还不支持 MathML，只能把公式编译成 SVG。好在 Typst 从 #link("https://typst.app/docs/changelog/0.15.0/")[0.15.0] 版本起支持了 MathML，本站现在直接使用 MathML 输出公式。
+ *SVG 无法被 CSS 控制。* Typst 导出的 SVG 会以 data URL 的形式放进 `<img>` 标签，与页面样式隔离，无法通过 CSS 调整样式。我专门写了一段后处理逻辑，将 SVG 从 data URL 中提取出来并内联到页面中。公式改用 MathML 之后，这段逻辑现在继续用于正文的矢量绘图。
+ *代码高亮不支持主题切换。* Typst 内置的代码高亮会在编译时把配色硬编码到 HTML 中，无法同时适配浅色与深色模式。因此我关闭了内置高亮，引入 #link("https://shiki.app/")[Shiki] 对 HTML 做后处理，解决了双主题切换的问题。

= 选择 Lume

吸取 Next.js 的教训，这次重构我不打算再用通用前端框架，而是选用专门的静态网站生成器。但第一个问题就是对 Typst 的支持：几乎所有静态网站生成器都只默认支持 Markdown，要接入 Typst 就必须自定义渲染管线。因此，能否方便地扩展渲染管线成了选型的关键。

最终我选了 #link("https://lume.land/")[Lume]。它是一个轻量的静态网站生成器（最初基于 #link("https://deno.com/")[Deno]，现已迁移至 Node.js，本站目前也运行在 Node.js 上）。Lume 官方虽然提供了一个实验性的 Typst 插件，但为了解决前面提到的 SVG 内联和代码高亮问题，我还是以官方插件为参考，自己编写了渲染插件。

除此之外，还有一些意外收获。Lume 支持用 #link("https://lume.land/plugins/jsx/")[JSX/TSX] 作为模板语言——对习惯 JSX 的前端开发者来说，这比专门去适应其他传统模板语法更顺手。同时，Lume 内置了 #link("https://lume.land/plugins/tailwindcss/")[Tailwind CSS]、#link("https://lume.land/plugins/og_images/")[OG 图片]等常用插件，大幅简化了网站开发。

= 感想

这次重构最大的收获是发现了 Lume。这不只是因为 Lume 本身好用，更因为它让我重新思考 SSR 与 SSG 在前端开发中的定位。

如今大部分前端框架都把重心放在 SSR 上，但真正只能用 SSR、无法用 SSG 替代的场景其实并不多。在构建时一次性生成全部静态文件，在性能和部署上反而更有优势：静态文件可以直接放到 CDN 上缓存，部署也不需要维护服务器——比如这个博客就直接托管在 GitHub Pages 上，构建与访问都重新变得简单、轻快。
