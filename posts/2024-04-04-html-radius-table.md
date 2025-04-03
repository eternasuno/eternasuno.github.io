---
title: HTML 中圆角表格的实现
tags: [html]
---

表格是 HTML 中的基本元素，但是要给表格加上圆角却比想象中的复杂。

## 使用 border-radius

一开始的想法非常简单，使用 border-radius 定义圆角就可以了。

```html
<table>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>
```

```css
table {
  border-collapse: collapse;
  border-radius: 5px;
  border: 1px solid black;
}

th,
td {
  border: 1px solid black;
  padding: 1rem;
}
```

然而结果是并没有出现圆角。

![result](/public/assets/html-radius-table/border-radius.png 'border-radius 不生效')

## 使用 border-collapse: separate

border-radius 没有生效的原因是因为设置了 border-collapse: collapse 把表格的边框合并，那么不要合并就有圆角了，同时把 border-spacing 设置为 0 保证边框不分离。

```css
table {
  border-collapse: separate;
  border-radius: 5px;
  border-spacing: 0;
  border: 1px solid black;
}

th,
td {
  border: 1px solid black;
  padding: 1rem;
}
```

圆角确实出现了，但是因为有内部边框的存在，所有圆角内包含了直角，而且边框的宽度是原来的两倍。

![result](/public/assets/html-radius-table/border-collapse.png '边框分离')

当然可以通过不设置重复的边框来规避这些问题，但是这个方法麻烦而且普适性不高。

## 使用 outline

既然 border 不生效，那么换一个可以生效的属性来设置边框就可以了。

```css
table {
  border-collapse: collapse;
  border-radius: 5px;
  border: hidden;
  outline: 1px solid black;
}

th,
td {
  border: 1px solid black;
  padding: 1rem;
}
```

![result](/public/assets/html-radius-table/outline.png '使用 outline 定义边框')

## 使用 div 包裹

既然 table 的 border 属性不生效，那么就在外面包裹上一层 div，使用 div 来定义圆角边框。

```html
<div>
  <table>
    <thead>
      <tr>
        <th scope="col">Person</th>
        <th scope="col">Most interest in</th>
        <th scope="col">Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Chris</th>
        <td>HTML tables</td>
        <td>22</td>
      </tr>
      <tr>
        <th scope="row">Dennis</th>
        <td>Web accessibility</td>
        <td>45</td>
      </tr>
      <tr>
        <th scope="row">Sarah</th>
        <td>JavaScript frameworks</td>
        <td>29</td>
      </tr>
      <tr>
        <th scope="row">Karen</th>
        <td>Web performance</td>
        <td>36</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" colspan="2">Average age</th>
        <td>33</td>
      </tr>
    </tfoot>
  </table>
</div>
```

```css
div {
  border-radius: 5px;
  border: 1px solid black;
  display: inline-block;
}

table {
  border-collapse: collapse;
  border: hidden;
}

th,
td {
  border: 1px solid black;
  padding: 1rem;
}
```

![result](/public/assets/html-radius-table/div.png '使用 div 包裹')
