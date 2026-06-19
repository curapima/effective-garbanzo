---
title: "启动终端博客"
slug: "hello-terminal-blog"
description: "记录这个博客初始版本的设计目标、视觉语言和内容方向。"
date: "2026-06-19"
updated: "2026-06-19"
category: "项目记录"
tags:
  - "Next.js"
  - "博客"
  - "视觉主题"
draft: false
---

## 为什么先做博客终端

这个博客的第一目标不是展示复杂动效，而是建立一个可以长期写作和维护的内容系统。视觉上，它会逐步靠近老式 CRT、像素 UI 和黑白灰终端面板。

## 初始版本范围

- 首页可以进入文章、分类、标签和关于页。
- 文章从 `content/posts` 读取，并使用 frontmatter 生成元信息。
- 生产环境默认隐藏 `draft: true` 的文章。

```ts
const theme = "crt-terminal";
const focus = ["reading", "archive", "terminal"];
```

后续的 Three.js 场景会把首页第一屏升级为真正的巨大老式显示屏。
