#import "./_template.typ": post

#show: post.with(
  title: "Hello world",
  description: "记录这个博客的搭建过程：基于 Lume 框架，以 Typst 作为内容格式，从零打造一个高自由度的静态博客。",
  tags: ("typst", "lume", "ssg", "deno"),
)

= 起因

想搭一个个人博客的念头由来已久，但市面上的方案总让我有些纠结。Hugo、Jekyll、Hexo 各有生态，却也各有束缚——主题系统、模板语言、配置约定，走进去容易，改起来费劲。我想要的是一个能真正随心所欲折腾的博客，而不是在别人划好的框框里填内容。

最终我选择了两个有些「非主流」的组合：*Lume* 作为构建框架，*Typst* 作为写作格式。

= Lume：极高自由度的 SSG 框架

#link("https://lume.land")[Lume] 是一个基于 Deno 的静态站点生成器。与那些「约定即配置」的框架不同，Lume 的核心理念是*显式优于隐式*——你需要明确告诉它每一步该做什么，而它给你的回报是近乎无限的扩展空间。

== 插件系统

Lume 的插件系统设计得相当干净。每个插件就是一个接收 `Site` 实例的函数，可以在上面注册加载器、处理器、变换器。官方提供了覆盖常见需求的插件集合：

- `tailwindcss` —— CSS 样式
- `jsx` —— 用 TSX 写布局模板
- `og_images` —— 自动生成 Open Graph 封面图
- `pagefind` —— 客户端全文搜索
- `feed` —— 生成 RSS/Atom 订阅

这套插件体系最妙的地方在于：你可以轻松地*混用多种内容格式*。本站同时支持 `.tsx` 页面和 `.typ` 文章，两者在同一套构建流水线里和平共处。

== 模板自由度

布局文件是普通的 TSX 组件，数据流完全透明。页面元数据（标题、描述、标签）经由插件提取后，作为普通对象传入模板，不存在任何黑盒。如果嫌内置的东西不够用，自己写一个插件插进去就行了——下面马上会讲到这一点。

= 自制 Typst 插件

Lume 原生不支持 Typst，但得益于它开放的加载器 API，接入并不复杂。插件的核心逻辑分三层：

+ *编译*：调用 `@myriaddreamin/typst-ts-node-compiler` 将 `.typ` 文件编译为内部文档对象。
+ *查询*：通过 `compiler.query()` 提取文档中的 `<frontmatter>` 元数据（标题、标签、描述），回传给 Lume 作为页面属性。
+ *转换*：将编译产物转为 HAST（HTML 抽象语法树），再经由 rehype 流水线处理后输出为 HTML 字符串。

```typescript
const makeTypstRehype = ({ workspace, inputs, selector }) => {
  const compiler = NodeCompiler.create({ workspace, inputs });

  return function () {
    this.parser = (doc, file) => {
      const document = compile(doc)(compiler);
      file.data.metadata = selector
        ? matter(selector)(document)(compiler)
        : undefined;
      return rewrite(toHast(document)(compiler));
    };
  };
};
```

插件接入 Lume 只需一行配置：

```typescript
site.use(typst({
  inputs: { target: 'html' },
  selector: '<frontmatter>',
  plugins: [[rehypeShiki, { themes: { dark: 'one-dark-pro', light: 'one-light' } }]],
}));
```

由于整个处理流程基于标准的 unified/rehype 生态，代码高亮、HTML 后处理等额外需求都可以作为普通 rehype 插件插入，毫无摩擦。

== Typst 模板侧的配合

为了让 Typst 文件能正确输出 HTML，模板里对渲染目标做了区分。以数学公式为例：

```typst
show math.equation.where(block: false): it => {
  if target == "html" {
    html.elem("span", html.frame(it),
      attrs: ("class": "typst-math-inline"))
  } else {
    it
  }
}
```

同一份源文件，传入 `target = "html"` 时输出带语义标签的 HTML，否则走 Typst 原生排版——兼顾了网页展示与 PDF 导出两种场景。

= 为什么是 Typst？

Typst 是一门现代排版语言，语法比 LaTeX 简洁得多，却保留了对数学公式、精细排版的完整支持。对于面向 Web 的场景，它的 HTML 导出功能（目前仍在完善中）已经足够实用。

更重要的是，它是一个*有编程能力的文档格式*。函数、变量、条件、循环，该有的都有。这意味着与构建系统的集成可以做得非常深——元数据嵌入文档语义、渲染行为随目标切换，这些在 Markdown 里要靠 frontmatter 加各种约定实现的东西，在 Typst 里都是原生语言特性。

= 小结

这个博客目前的技术栈如下：

- *构建*：Deno + Lume v3
- *内容格式*：Typst（文章）+ TSX（页面/布局）
- *样式*：Tailwind CSS v4
- *搜索*：Pagefind
- *部署*：GitHub Pages
