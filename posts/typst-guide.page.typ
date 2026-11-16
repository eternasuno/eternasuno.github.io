#import "./_template.typ": post

#show: post.with(
  title: "Typst 语法速览",
  description: "常见 Typst 语法示例：标题、文本样式、列表、链接、代码、数学、表格、图片、图形、样式规则与脚注。",
  tags: ("typst", "syntax", "guide"),
)

Typst 是一种用纯文本和轻量标记编写文档的排版工具，常用于编写笔记、技术报告与学术论文。这篇文章从最常用的通用语法开始，介绍文本排版、列表、代码、数学公式、图表以及样式规则。

在 Typst 中，普通文字直接书写即可（标记模式）；`#` 用来调用函数或进入代码表达式，`(...)` 用来传入参数，`[...]` 用来包裹文档内容块。阅读下面的示例时，只需先了解两条通用规则：

- *尾随内容块可省略圆括号*：当内容块 `[...]` 是函数的最后一个（或唯一）参数时，可以直接写在函数名或 `(...)` 后面。例如 `#underline[重点]` 等价于 `#underline([重点])`，`#link("https://typst.app/")[官网]` 则同时传入了字符串参数与尾随内容块。
- *代码表达式内无需重复写 `#`*：一旦通过 `#` 进入了函数调用（如 `#figure(image("photo.png"))`），括号内部的 `image(...)` 就已经处于代码模式，不需要再写成 `#image`。

= 标题与段落

标题用 `=` 表示层级，一级标题一个 `=`，二级两个 `==`，三级三个 `===`，依此类推。

正文直接书写。源码中的单个换行不会分段，真正的分段要靠*空行*；如果需要在段落内部强制换行（不分段），可以在行尾加上反斜杠 `\`，或调用 `#linebreak()`。

注释有单行和多行两种写法，编译器会直接忽略：

````typ
= 一级标题
== 二级标题

这是第一段的第一行，\
行尾加反斜杠会在段内强制换行。

空出一行后，这里会开启新的段落。

// 单行注释：从双斜杠开始到行尾
/* 多行注释：
   可以跨越多行 */
````

== 二级标题示例

这是一段普通的正文。\
上一行末尾加了反斜杠，因此这里换到了下一行，但仍属于同一个段落。

= 文本样式

常用的行内文字修饰有简写标记，也可以调用对应的函数：

- *粗体* 用 `*粗体*` 包裹
- _斜体_ 用 `_斜体_` 包裹
- #underline[下划线] 用 `#underline[下划线]` 函数
- #strike[删除线] 用 `#strike[删除线]` 函数
- `行内代码` 用一对反引号 ``` `行内代码` ``` 包裹
- 上标#super[2]与下标#sub[0] 分别用 `#super[2]` 和 `#sub[0]` 函数

字号、颜色、字重等样式可以用 `#text(...)` 设置。例如：

```typ
#text(size: 0.9em, fill: rgb("#2563eb"), weight: "bold")[小一号的蓝色粗体字]
```

渲染效果为：#text(size: 0.9em, fill: rgb("#2563eb"), weight: "bold")[小一号的蓝色粗体字]。这里的 `0.9em` 表示当前字号的 90%。

= 列表

Typst 原生支持无序列表、有序列表和术语列表三种形式，均可通过缩进实现嵌套：

```typ
// 无序列表以 `- ` 开头
- 第一项
- 第二项
  - 嵌套的子项
  - 另一个子项

// 有序列表以 `+ ` 开头（自动递增编号），也可直接写 `1. `
+ 第一步：准备材料
+ 第二步：整理内容

// 术语列表以 `/ 术语: 解释` 书写
/ 标记模式: 直接书写正文与轻量标记的默认模式。
/ 代码模式: 通过 `#` 进入，用于调用函数、定义变量与控制逻辑。
```

无序列表渲染效果：

- 第一项
- 第二项
  - 嵌套的子项
  - 另一个子项
- 第三项

有序列表渲染效果：

+ 第一步：准备材料
+ 第二步：整理内容
+ 第三步：检查文档

术语列表渲染效果：

/ 标记模式: 直接书写正文与轻量标记的默认模式。
/ 代码模式: 通过 `#` 进入，用于调用函数、定义变量与控制逻辑。

= 链接、摘录与交叉引用

超链接可以直接书写完整网址（如 https://typst.app/ 会自动识别为链接），也可以用 `#link("url")[文字]` 自定义显示文本，例如 `#link("https://typst.app/")[Typst 官网]` 会显示为 #link("https://typst.app/")[Typst 官网]。

摘录他人话语（块引用）时，使用 `#quote(...)`。设置 `block: true` 可让摘录单独成块，`attribution` 用来注明出处：

```typ
#quote(block: true, attribution: [Donald Knuth])[
  过早的优化是万恶之源。
]
```

#quote(block: true, attribution: [Donald Knuth])[
  过早的优化是万恶之源。
]

在长文档中，可以为标题、图表或公式添加 `<标签名>`，并在正文中用 `@标签名` 进行交叉引用（同样适用于 `@文献名` 引用参考文献）：

```typ
= 数学公式 <sec-math>
详见 @sec-math 的介绍，以及 @fig-logo 中的图标。
```

= 代码

多行代码块用三个反引号 ```` ``` ```` 包裹，在开头的反引号后写上语言名称（如 `python`、`ts`、`typ`）即可启用语法高亮：

````typ
```python
def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]
```
````

渲染效果：

```python
def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]


print(fibonacci(10))
```

TypeScript 代码块示例：

```ts
type Book = {
  title: string;
  finished: boolean;
};

const books: Array<Book> = [
  { title: "学习 Typst", finished: false },
  { title: "旅行笔记", finished: true },
];

const unread = books.filter((book) => !book.finished);
console.log(`还有 ${unread.length} 本书没读完。`);
```

= 数学公式

公式写在一对美元符号之间：
- *行内公式*：两侧紧贴美元符号书写，如 `$a^2 + b^2 = c^2$`，会嵌入正文中显示为 $a^2 + b^2 = c^2$。
- *块级公式*：两侧美元符号内各留出至少一个空格（或换行），如 `$ E = m c^2 $`，会单独成行并居中显示。

Typst 的数学语法有三条核心规律：
1. *符号与希腊字母直接写英文名*（无需反斜杠 `\`）：例如 `pi`（$pi$）、`theta`（$theta$）、`infinity`（$infinity$），箭头与关系符可直接用字符组合 `->`（$->$）、`>=`（$>=$）、`!=`（$!=$）。
2. *上下标分组与自动分式*：`^` 和 `_` 默认作用于紧邻的单个元素；包含多个字符时用圆括号分组（如 `e^(i pi)`，用于分组的圆括号不会显示在结果中）。斜杠 `/` 会自动排版为分式（如 `(1 + 1/n)^n`）。
3. *单字母为变量，多字母为函数或算子*：单个字母如 `x` 是斜体变量；连续多个字母会被识别为内置符号或函数，如 `lim`、`sin`、`cos`、`sqrt(...)`、`integral`、`mat(...)`。

常见数学公式源码与渲染效果对照：

```typ
// 行内欧拉恒等式：$e^(i pi) + 1 = 0$
// 极限：
$ lim_(n -> infinity) (1 + 1/n)^n = e $

// 积分、分式与根号：
$ integral_0^infinity e^(-x^2) d x = sqrt(pi) / 2 $

// 矩阵：用逗号分隔列，用分号分隔行
$ mat(1, 0, 0; 0, cos theta, -sin theta; 0, sin theta, cos theta) $
```

极限公式渲染效果：

$ lim_(n -> infinity) (1 + 1/n)^n = e $

积分、分式与根式渲染效果：

$ integral_0^infinity e^(-x^2) d x = sqrt(pi) / 2 $

矩阵渲染效果：

$ mat(1, 0, 0; 0, cos theta, -sin theta; 0, sin theta, cos theta) $

= 表格

表格用 `#table(...)` 创建。`columns` 可以传入列数（如 `columns: 3`），也可以传入各列的宽度比例：`(1fr, 1.2fr, 2fr)` 表示三列按 1∶1.2∶2 分配可用宽度。`table.header(...)` 用来声明表头，其后每个单元格放在 `[...]` 中，按从左到右、从上到下的顺序排列：

```typ
#table(
  columns: (1fr, 1.2fr, 2fr),
  stroke: 0.5pt,
  table.header([元素], [渲染示例], [说明]),
  [行内公式], [$a^2 + b^2 = c^2$], [与文字混排显示],
  [块级公式], [$E = m c^2$], [单独成行、居中显示],
  [行内代码], [`print("Hello")`], [等宽字体显示代码片段],
  [图片], [#image("typst-logo.png", alt: "Typst Logo", width: 60%)], [按相对路径引入],
  [链接], [#link("https://typst.app/")[Typst 官网]], [点击后打开网页],
)
```

单元格内可以混排公式、代码、图片与链接，渲染效果如下：

#table(
  columns: (1fr, 1.2fr, 2fr),
  stroke: 0.5pt,
  table.header([元素], [渲染示例], [说明]),
  [行内公式], [$a^2 + b^2 = c^2$], [与文字混排显示],
  [块级公式], [$E = m c^2$], [单独成行、居中显示],
  [行内代码], [`print("Hello")`], [等宽字体显示代码片段],
  [图片], [#image("../_includes/images/typst-logo.png", alt: "Typst Logo", width: 60%)], [按相对路径引入],
  [链接], [#link("https://typst.app/")[Typst 官网]], [点击后打开网页],
)

= 图片

图片用 `#image("路径")` 引入，常用参数包括 `width`（宽度，如 `80%` 或 `12cm`）和 `alt`（无障碍替代文本）。相对路径从当前 `.typ` 文件所在的目录开始查找：

```typ
#image("typst-logo.png", width: 50%, alt: "Typst Logo")
```

#image("../_includes/images/typst-logo.png", alt: "Typst Logo")

需要为图片添加题注并自动编号时，用 `#figure(...)` 包裹图片并设置 `caption`：

```typ
#figure(
  image("typst-logo.png", width: 50%, alt: "Typst Logo"),
  caption: [Typst 的 Logo],
) <fig-logo>
```

#figure(
  image("../_includes/images/typst-logo.png", alt: "Typst Logo"),
  caption: [Typst 的 Logo],
)

= 图形绘制

不依赖外部图片文件，也可以直接用内置几何函数绘制图形：
- `#rect(...)` 绘制矩形，`#circle(...)` 绘制圆，`#line(...)` 绘制线段。
- `width`、`height`、`radius` 控制尺寸与圆角；`fill` 设置填充色；`stroke` 设置描边（可用 `2pt + rgb("#8e44ad")` 组合线宽与颜色）。
- 多个块级图形默认纵向排列；若要横向并排，可放入 `#stack(dir: ltr, spacing: 10pt, ...)`，或用 `#box(...)` 转为行内盒子并配合 `#h(10pt)` 控制水平间距。

下面用四个不同高度的圆角矩形组成简易柱状图：

```typ
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
```

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

下面的示例演示了圆形半透明填充（`.transparentize(70%)`）与带描边的矩形：

```typ
#figure(
  {
    set align(center)
    circle(
      radius: 22pt,
      stroke: 2pt + rgb("#8e44ad"),
      fill: rgb("#8e44ad").transparentize(70%),
    )
    h(10pt)
    box(rect(width: 60pt, height: 30pt, stroke: 1pt + rgb("#555555")))
  },
  caption: [`circle` 与带描边的 `rect`],
)
```

#figure(
  {
    set align(center)
    circle(
      radius: 22pt,
      stroke: 2pt + rgb("#8e44ad"),
      fill: rgb("#8e44ad").transparentize(70%),
    )
    h(10pt)
    box(rect(width: 60pt, height: 30pt, stroke: 1pt + rgb("#555555")))
  },
  caption: [`circle` 与带描边的 `rect`],
)

= 样式规则与自定义变量

Typst 不需要复杂的宏包配置，通过 `#set`、`#show` 和 `#let` 即可完成绝大多数排版定制：

- `#set` 用于修改元素的默认属性（自书写处向下生效，也可限制在 `#[...]` 作用域内）。
- `#show` 用于自定义某类元素或特定文本的呈现方式。
- `#let` 用于定义变量或封装可复用的自定义函数。

```typ
// 1. 设置页面、正文字体、段落与标题编号
#set page(paper: "a4", margin: 2cm)
#set text(lang: "zh", size: 11pt)
#set par(justify: true, first-line-indent: 2em)
#set heading(numbering: "1.1")

// 2. 定义变量与自定义函数
#let brand-color = rgb("#2563eb")
#let tag(label) = box(
  fill: brand-color.lighten(85%),
  inset: (x: 6pt, y: 2pt),
  radius: 3pt,
  text(fill: brand-color, weight: "bold", label),
)

// 3. 调用自定义函数
这是一个自定义标签：#tag[Typst]
```

= 脚注

脚注用 `#footnote[补充说明]` 添加，方括号内编写注释内容。Typst 会自动生成连续编号，并将说明文字放置到页面底部的注释区域：

```typ
Typst 可以用来编写各类结构化文档#footnote[常见用途包括笔记、报告、学术论文和演示文稿。]。
```

渲染效果：Typst 可以用来编写各类结构化文档#footnote[常见用途包括笔记、报告、学术论文和演示文稿。]。
