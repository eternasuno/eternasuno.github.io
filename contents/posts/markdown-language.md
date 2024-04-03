---
title: markdown 语法备忘
date: 2024-04-03
lastmod: 2024-04-03
draft: false
tags:
  - markdown
type: post
---

Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。

## 标题

要创建标题，请在单词或短语前面添加井号 (#) 。# 的数量代表了标题的级别。

```markdown
# Heading level 1

## Heading level 2 

### Heading level 3
``` 

# Heading level 1

## Heading level 2 

### Heading level 3

## 粗体

要加**粗文本**，请在单词或短语的前后各添加两个星号，例如：`**粗体**`。

## 斜体

要用*斜体*显示文本，请在单词或短语前后添加一个星号，例如：`*斜体*`。

## 删除线

您可以通过在单词中心放置一条水平线来删除单词。结果看起来像~~这样~~。此功能使您可以指示某些单词是一个错误，要从文档中删除。若要删除单词，请在单词前后使用两个波浪号`~~`。

## 引用

> 要创建块引用，请在段落前添加一个 > 符号。

```markdown
> 要创建块引用，请在段落前添加一个 > 符号。
```

## 有序列表

要创建有序列表，请在每个列表项前添加数字并紧跟一个英文句点。

```markdown
1. First item
2. Second item
3. Third item
4. Fourth item
```

1. First item
2. Second item
3. Third item
4. Fourth item

## 无序列表

要创建无序列表，请在每个列表项前面添加破折号 (-) 。缩进一个或多个列表项可创建嵌套列表。

```markdown
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

- First item
- Second item
- Third item
  - Indented item
  - Indented item
- Fourth item

## 代码 & 代码块

要将单词或短语表示为`代码`，请将其包裹在反引号 (`) 中。如果你要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双反引号(``)中。

```markdown
``Use `code` in your Markdown file.``
```

``Use `code` in your Markdown file.``

在代码块之前和之后的行上使用三个反引号(```）来创建代码块，在受防护的代码块之前的反引号旁边可以指定代码的语言。

````markdown
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

## 链接

链接文本放在中括号内，链接地址放在后面的括号中。链接title是当鼠标悬停在链接上时会出现的文字，这个title是可选的，它放在圆括号中链接地址后面，跟链接地址之间以空格分隔。

```markdown
这是一个链接 [Markdown语法](https://markdown.com.cn "最好的markdown教程")。
```

这是一个链接 [Markdown语法](https://markdown.com.cn "最好的markdown教程")。

## 图片

要添加图像，请使用感叹号 (!), 然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本。

![nextjs](/img/next.svg)

## 表格

要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。您可以选择在表的任一端添加管道。

```markdown
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

呈现的输出如下所示：

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

您可以通过在标题行中的连字符的左侧，右侧或两侧添加冒号（:），将列中的文本对齐到左侧，右侧或中心。

```markdown
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## 任务列表

任务列表使您可以创建带有复选框的项目列表。在支持任务列表的Markdown应用程序中，复选框将显示在内容旁边。要创建任务列表，请在任务列表项之前添加破折号-和方括号[ ]，并在[ ]前面加上空格。要选择一个复选框，请在方括号[x]之间添加 x 。

```markdown
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

## 数学公式

在markdown里使用在前后添加`$`表示数学公式，例如$a^2$。如果需要表示公式块则在前后添加`$$`。

$$ a^2 + b^2 = c^2 $$