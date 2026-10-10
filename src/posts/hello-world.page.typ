#import "./_template.typ": post

#show: post.with(
  title: "Hello World",
  description: "记录基于 Lume 框架，使用 Typst 作为内容格式搭建这个博客的过程与思考。",
  tags: ("typst", "lume", "ssg", "deno", "shiki"),
)


搭建博客这件事我折腾过很多次。在此之前，我也曾使用过多种框架，但这一次的技术组合非常有趣，因此想详细记录一下。

= 为什么选择 Typst 而不是 Markdown？

在大多数静态站点生成器中，Markdown 是默认的内容格式。但我最终决定用 #link("https://typst.app/")[Typst] 来替代它。

== 排版与数学公式的天然优势

Typst 对数学公式和精细排版的支持远胜于 Markdown。虽然 Markdown 也有各种插件（如 KaTeX、MathJax）可以支持数学公式，但这些往往依赖于复杂的扩展。一方面，这些插件的质量参差不齐；另一方面，过多的扩展会严重影响文档的移植性。我希望我的博客文章能在各种软件中都能有相对一致的格式，而 Typst 作为一个现代的排版系统，原生就提供了这些能力。

== 吐槽：Typst 转 HTML 的坎坷之路

尽管 Typst 在排版上很出色，但在 Web 端展示时，目前的生态还不够成熟：

+ *MathML 的缺失*：Typst 编译成 HTML 时，数学公式目前还不支持编译成 MathML，只能编译成 SVG。
+ *SVG 的处理困难*：我使用的 `@myriaddreamin/typst-ts-node-compiler` 在编译 SVG 时，会把 SVG 的内容直接嵌入到 `<img>` 标签中。这导致我无法直接通过 CSS 修改公式的颜色（比如跟随主题色）。为了解决这个问题，我不得不写了一段逻辑，专门将 SVG 内容提取出来进行修改。
+ *代码高亮的暗黑模式*：原生编译出的代码块同样不支持动态修改主题，无法完美适应暗黑模式。最终，我通过引入 #link("https://shiki.style/")[Shiki] 进行后处理，才彻底解决了这个问题。

= 基于 Deno 的 Lume 框架

这次博客的骨架我选用了 #link("https://lume.land/")[Lume]。它是一个基于 Deno 的静态网站框架，非常符合我目前的技术偏好。

== 开发者友好

作为一个基于 Deno 的框架，Lume 的运行非常方便。它支持多种模板语言，包括 TSX。对于有 React 开发背景的人来说，使用 TSX 来编写布局（Layouts）和组件非常友好。

== 全面的 SEO 与功能支持

Lume 对 SEO 的支持非常全面。它能方便地定义多个元数据（Meta Data），甚至支持动态生成 OG Image（Open Graph Images），这在其他框架中并不多见。这种能力极大提升了文章在社交平台上分享时的视觉效果。

== 强大的扩展性

Lume 的优势还在于它可以非常方便地添加各种插件。由于 Typst 的编译插件是我自己写的，能够轻松将 Typst 集成到 Lume 中，也正是 Lume 扩展性的体现。

