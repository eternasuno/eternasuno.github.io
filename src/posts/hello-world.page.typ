#import "./_template.typ": post

#show: post.with(
  title: "Hello World",
  description: "记录基于 Lume 框架，使用 Typst 作为内容格式搭建这个博客的过程与思考。",
  tags: ("typst", "lume"),
)

之前一直使用 #link("https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation")[Next.js 静态编译（SSG）]的方式来搭建博客，但是 Next.js 缓慢的编译速度说明这不是一个好的选择，再加上之前 Next.js 之前连续爆出安全漏洞，这成了我决定重构博客的最后一根稻草。

此外在之前编写博客的过程中，我发现 Markdown 是有极限的。不仅是数学公式等复杂功能，即使是删除线这样的格式也要依赖扩展。而过多的扩展不仅会增加后续的维护难度，而且会影响文档的可移植性。所以借这次重构的机会我决定也要探索其他的排版语言。

= 通向 Typst 之路

提到排版语言，首先想到的是 #link("https://www.latex-project.org/")[LaTeX]，但是 LaTeX 对 Unicode 的支持并不好，而且如何把 LaTeX 编译成 HTML 本身也没有足够简单成熟的 js 库。接着我找到了 #link("https://asciidoctor.org/")[asciidoctor]，不仅有官方提供的 js 编译库，并且官方维护了部分的常用插件。但是 #link("https://docs.asciidoctor.org/asciidoctor.js/latest/")[asciidoctor.js] 的维护并不积极（update: 在我放弃之后 asciidoctor.js 反而开始频繁更新 😂），另外 asciidoctor 本身也比较小众，这也是要考虑的内容。

因此我决定使用 #link("https://typst.app/")[Typst]。Typst 是一个基于 Rust 的开源排版系统，原生支持 Unicode，数学公式，并且可以编译成 HTML。同时有 wasm 编译库 #link("https://myriad-dreamin.github.io/typst.ts/cookery/get-started.html")[typst.ts]，可以在 js 环境中运行。这些可以说完全符合我的要求。

但是即使是这样，Typst 也有一些不足，主要是集中在编译成 HTML 的过程中：

+ Typst 的编译成 HTML 时，数学公式目前还不支持编译成 MathML，只能编译成 SVG。（update: Typst 在 #link("https://typst.app/docs/changelog/0.15.0/")[0.15.0] 版本中已经支持 MathML 了）
+ typst.ts 生成的 svg 会把 svg 的内容直接嵌入到 `<img>` 标签中。这导致我无法直接通过 CSS 修改公式的颜色（比如跟随主题色）。为了解决这个问题，我不得不写了一段逻辑，专门将 SVG 内容提取出来进行修改。
+ Typst 的编译成 HTML 时，代码高亮的暗黑模式并不支持动态修改主题，无法完美适应暗黑模式。最终，我通过引入 #link("https://shiki.app/")[Shiki] 进行后处理，才彻底解决了这个问题。

= lume: 意外收获

因为 Next.js 的前车之鉴，这次重构我不打算使用通用前端框架来搭建博客，而是使用专门的静态网站生成器。但是首先碰到的问题就是对 Typst 的支持。几乎所有的静态生成器都只支持 Markdown，想要支持 typst 就需要自定义渲染管线，而能否方便地自定义渲染管线就是选择的关键。

最终我找到了 #link("https://lume.land/")[lume], 一个基于 #link("https://deno.com/")[Deno] 的静态网站框架。lume 有一个实验性的 Typst 插件，但是因为上面提到的 svg 和 代码高亮的原因，最终决定自己实现一个 Typst 插件，但是官方的插件依然提供一个好的参考和开始。

除此之外，还有意外收获：lume 支持使用 #link("https://lume.land/plugins/jsx/")[jsx/tsx] 作为模版语言，这对于习惯了 jsx 的前端开发者来说，是比其他框架的实现的不通用的模版语言更好的选择。此外 lume 还有支持 #link("https://lume.land/plugins/tailwindcss/")[tailwindcss]，#link("https://lume.land/plugins/og_images/")[OG images] 等重要功能的插件，可以极大程度简化网站的开发。

= 感想

本次重构过程中最大的收获就是发现了 lume 这个框架，并不单指 lume 本身，而是这个框架让我重新思考 SSR / SSG 在前段开发中的应用。虽然大部分的框架都把重心放在 SSR 上，但只能使用 SSR 而不能使用 SSG 代替的情况实际上并不多，反而是在编译期就生成所有的静态文件在性能优化和部署上更有优势。之后在需要 SEO 或者加快渲染的时候 SSG 会是比 SSR 更有吸引力的选择。

