#import "./_template.typ": post, drawing

#show: post.with(
  title: "Typst 语法速览",
  description: "常见 Typst 语法示例：标题、文本样式、列表、链接、代码、数学、表格、图片、图形与脚注。",
  tags: ("typst", "syntax", "guide"),
)

Typst 是一种用文字和简单标记编写文档的排版工具。你可以用它写笔记、报告或论文。这篇文章从常用写法开始，介绍文字、列表、代码、公式和图片等内容。

下面的示例中，`#` 表示调用 Typst 的函数或进入代码表达式，`(...)` 用来传入参数，`[...]` 用来放文字等文档内容。例如，`#underline[重点]` 就是给“重点”加上下划线。

= 标题与段落

标题用 `=` 表示层级，一级标题一个 `=`，二级两个 `==`，三级三个 `===`，依此类推。段落直接书写，空行分段。

== 二级标题示例

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

字号、颜色等文字样式可以用 `#text(...)` 设置。例如，`#text(size: 0.9em)[小一号的字]` 会显示为 #text(size: 0.9em)[小一号的字]。这里的 `0.9em` 表示当前字号的 90%。

= 列表

无序列表每一项以 `- ` 开头，可以嵌套：

- 第一项
- 第二项
  - 嵌套的子项
  - 另一个子项
- 第三项

有序列表每一项以 `+ ` 开头：

+ 第一步：准备材料
+ 第二步：整理内容
+ 第三步：检查文档

= 链接与引用

链接用 `#link("url")[文字]`，例如 Typst 官网 #link("https://typst.app/")[typst.app]。

引用别人的话时，可以用 `#quote[...]`。如果想让引用单独成块，可以写成 `#quote(block: true)[...]`：

#quote(block: true)[
  这是一段引用文字，可以换成你想引用的原文。
]

= 代码

多行代码用三个反引号包裹，在开头的反引号后写上语言名，例如 `python`。Typst 可以根据语言名为代码着色：

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
interface Book {
  title: string;
  finished: boolean;
}

const books: Book[] = [
  { title: "学习 Typst", finished: false },
  { title: "旅行笔记", finished: true },
];
const unread = books.filter((book) => !book.finished);
console.log(`还有 ${unread.length} 本书没读完。`);
```

= 数学公式

公式写在一对美元符号之间。紧贴两侧美元符号书写的 `$...$` 会嵌在文字中；两侧都留出空白的 `$ ... $` 会单独成行。公式内部仍然可以使用空格，让源码更容易阅读。

行内公式示例：勾股定理 $a^2 + b^2 = c^2$，欧拉恒等式 $e^(i pi) + 1 = 0$。

块级公式单独成行并居中：

$ lim_(n -> infinity) (1 + 1/n)^n = e $

分数、根式与积分：

$ integral_0^infinity e^(-x^2) d x = sqrt(pi) / 2 $

矩阵用 `mat(...)`，行与行之间用分号分隔：

$ mat(1, 0, 0; 0, cos theta, -sin theta; 0, sin theta, cos theta) $

= 表格

表格用 `#table(...)` 创建。`columns` 可以指定列数，也可以像下面这样设置各列的宽度比例：`(1fr, 1.2fr, 2fr)` 表示三列按 1∶1.2∶2 分配可用宽度。

`table.header(...)` 用来设置表头。每个单元格的内容放在 `[...]` 中，按从左到右、从上到下的顺序填写。单元格里也能放公式、代码和图片：

#table(
  columns: (1fr, 1.2fr, 2fr),
  stroke: 0.5pt,
  table.header([元素], [示例], [说明]),
  [行内公式], [$a^2 + b^2 = c^2$], [与文字混排显示],
  [块级公式], [$E = m c^2$], [单独成行、居中显示],
  [行内代码], [`print("Hello")`], [显示一小段代码],
  [图片], [#image("../_includes/images/typst-logo.png", width: 60%)], [相对路径引入],
  [链接], [#link("https://typst.app/")[Typst 官网]], [点击后打开网页],
)

= 图片

图片用 `#image("路径")` 引入。相对路径从当前 Typst 文件所在的目录开始查找。例如，把图片 `photo.png` 放在文档旁边，就可以写 `#image("photo.png")`。下面是一张图片示例：

#image("../_includes/images/typst-logo.png")

想给图片加上说明文字，可以用 `#figure(...)` 包裹图片，并通过 `caption` 设置题注。Typst 会自动为它编号：

#figure(
  image("../_includes/images/typst-logo.png"),
  caption: [Typst 的 Logo],
)

= 图形绘制

不准备图片文件，也可以直接用 Typst 画简单图形。`#rect(...)` 用来画矩形，`#circle(...)` 用来画圆形。`width` 和 `height` 设置宽高，`fill` 设置填充颜色。下面用几个不同高度的矩形组成柱状图：

#figure(
  drawing({
    set align(center)
    box(rect(width: 34pt, height: 18pt, fill: rgb("#e74c3c"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 34pt, fill: rgb("#3498db"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 52pt, fill: rgb("#2ecc71"), radius: 2pt))
    h(10pt)
    box(rect(width: 34pt, height: 44pt, fill: rgb("#f39c12"), radius: 2pt))
  }),
  caption: [用 `rect` 绘制的柱状图],
)

`radius` 可以设置圆的半径，`stroke` 可以设置边框的粗细和颜色。下面是一个圆和一个矩形：

#figure(
  drawing({
    set align(center)
    circle(radius: 22pt, stroke: 2pt + rgb("#8e44ad"), fill: rgb("#8e44ad").transparentize(70%))
    h(10pt)
    box(rect(width: 60pt, height: 30pt, stroke: 1pt + rgb("#555555")))
  }),
  caption: [`circle` 与带描边的 `rect`],
)

= 脚注

脚注用 `#footnote[...]` 添加，方括号里写补充说明。Typst 会自动生成编号，并把说明放到相应的注释区域；具体位置取决于输出格式。示例：Typst 可以用来编写文档#footnote[常见用途包括笔记、报告、论文和演示文稿。]。
