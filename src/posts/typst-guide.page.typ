#import "./_template.typ": post

#show: post.with(
  title: "Typst 语法速览",
  description: "常见 Typst 语法示例：标题、文本样式、列表、链接、代码、数学、表格、图片、图形与脚注。",
  tags: ("typst", "syntax", "guide"),
)

这篇文章用具体示例过一遍最常见的 Typst 语法。

= 标题与段落

标题用 `=` 表示层级，一级标题一个 `=`，二级两个 `==`，三级三个 `===`，依此类推。段落直接书写，空行分段。

== 三级标题示例

这是一段普通的正文。行内的换行会被当作空格处理，真正的分段要靠空行。

注释用 `//` 开头，编译器会直接忽略：

```
// 这是一条注释，不会出现在输出中
```

= 文本样式

- *粗体* 用 `*...*` 包裹
- _斜体_ 用 `_..._` 包裹
- #underline[下划线] 用 `#underline[...]` 函数
- #strike[删除线] 用 `#strike[...]` 函数
- 行内代码 `#text(...)` 用一对反引号包裹

字号、颜色等排版属性用 `#text(...)` 设置，例如 #text(size: 0.9em)[小一号的字]。

= 列表

无序列表每一项以 `- ` 开头，可以嵌套：

- 第一项
- 第二项
  - 嵌套的子项
  - 另一个子项
- 第三项

有序列表每一项以 `+ ` 开头：

+ 第一步：编写内容
+ 第二步：构建站点
+ 第三步：部署上线

= 链接与引用

链接用 `#link("url")[文字]`，例如 Typst 官网 #link("https://typst.app/")[typst.app]。

引用块用 `#quote[...]`：

#quote[
  这是一段引用文字，用来测试引用块的样式。
]

= 代码

代码块用三个反引号包裹，反引号后跟语言名即可获得语法高亮：

```python
def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]


print(fibonacci(10))
```

TypeScript 同样支持：

```ts
interface Post {
  title: string;
  tags: string[];
  published: boolean;
}

const posts: Post[] = await loadAllPosts();
const drafts = posts.filter((p) => !p.published);
console.log(`Found ${drafts.length} draft(s).`);
```

= 数学公式

数学是 Typst 的强项，行内公式用 `$...$`（美元符号与内容之间没有空格），块级公式用 `$ ... $`（两侧留有空格）。

行内公式示例：勾股定理 $a^2 + b^2 = c^2$，欧拉恒等式 $e^(i pi) + 1 = 0$。

块级公式单独成行并居中：

$ lim_(n -> infinity) (1 + 1/n)^n = e $

分数、根式与积分：

$ integral_0^infinity e^(-x^2) d x = sqrt(pi) / 2 $

矩阵用 `mat(...)`，行与行之间用分号分隔：

$ mat(1, 0, 0; 0, cos theta, -sin theta; 0, sin theta, cos theta) $

= 表格

表格用 `#table(...)` 创建，`columns` 指定列宽，`table.header(...)` 标记表头行，单元格内容用方括号包裹，可以是任意内容（公式、代码、图片都可以）：

#table(
  columns: (1fr, 1.2fr, 2fr),
  stroke: 0.5pt,
  table.header([元素], [示例], [说明]),
  [行内公式], [$a^2 + b^2 = c^2$], [与文字混排显示],
  [块级公式], [$E = m c^2$], [单独成行、居中显示],
  [行内代码], [`deno task serve`], [等宽字体与底色],
  [图片], [#image("../_includes/images/typst-logo.png", width: 60%)], [相对路径引入],
  [链接], [#link("https://lume.land/")[Lume]], [链接颜色与下划线],
)

= 图片

图片用 `#image("路径")` 引入，路径相对于文章所在目录：

#image("../_includes/images/typst-logo.png")

带题注的图片用 `#figure(...)` 包裹，题注会自动编号：

#figure(
  image("../_includes/images/typst-logo.png"),
  caption: [Typst 的 Logo],
)

= 图形绘制

Typst 可以原生绘制矢量图形，例如矩形 `#rect(...)` 和圆形 `#circle(...)`：

#figure(
  {
    set align(center)
    box(rect(width: 34pt, height: 18pt, fill: rgb("#e74c3c"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 34pt, fill: rgb("#3498db"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 52pt, fill: rgb("#2ecc71"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 44pt, fill: rgb("#f39c12"), radius: 2pt))
  },
  caption: [用 `rect` 绘制的柱状图],
)

圆与描边：

#figure(
  {
    set align(center)
    circle(radius: 22pt, stroke: 2pt + rgb("#8e44ad"), fill: rgb("#8e44ad").transparentize(70%))
    h(10pt)
    box(rect(width: 60pt, height: 30pt, stroke: 1pt + rgb("#555555")))
  },
  caption: [`circle` 与带描边的 `rect`],
)

= 脚注

脚注用 `#footnote[...]`，点击编号可以跳转到文末的注释列表。示例：Typst 是一门排版语言#footnote[Typst 是 2019 年开始开发的排版系统，目标是取代 LaTeX。]。
