---
title: 现代 CSS 特性探索
description: 介绍最新的 CSS 功能和用法
date: 2026-03-01
---

# 现代 CSS 特性探索

CSS 在不断发展，新的特性让样式编写更加强大。

## Grid 布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

## Flexbox 进阶

```css
.flex-container {
  display: flex;
  gap: 10px;
  align-items: center;
}
```

## 容器查询

容器查询允许样式基于容器大小而不是视口大小。

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```
