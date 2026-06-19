# effective-garbanzo

黑白灰像素终端风格的个人博客初始版本，使用 Next.js、TypeScript、Tailwind CSS 和 Three.js 构建。

## 当前状态

- 已建立可在浏览器访问的 Next.js App Router 项目。
- 首页包含 Three.js 渲染的老式 CRT 显示屏场景。
- 已实现首页、文章列表、文章详情、分类、标签、关于页和 404 页面。
- 已加入 3 篇示例文章，覆盖段落、列表、表格、引用和代码块。
- 已生成 RSS、sitemap 和 robots 路由，面向 Vercel 部署。

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- Three.js
- Markdown/MDX frontmatter
- react-markdown + remark-gfm
- lucide-react

## 字体

- UI 标签、标题、导航和数字使用本地托管的 `Fusion Pixel 12px Monospaced` 像素字体。
- 正文继续使用系统无衬线字体，避免长文阅读疲劳。
- 字体文件位于 `public/fonts/fusion-pixel/`，许可证文件保留在同一目录。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：`http://localhost:3000`

## 常用脚本

```bash
npm run dev
npm run build
npm run start
```

## 内容结构

文章存放在：

```text
content/posts/
```

每篇文章使用 Markdown/MDX，并包含 frontmatter。博客所有者可以直接把 `.md` 文件上传或复制到 `content/posts/`：

```yaml
---
title: "文章标题"
description: "文章摘要，用于列表页和 SEO。"
date: "2026-06-19"
updated: "2026-06-19"
category: "技术"
tags:
  - "Next.js"
  - "前端"
draft: false
---
```

说明：

- slug 默认来自文件名。
- `draft: true` 的文章在生产环境默认不展示。
- 阅读时间会根据正文自动计算。
- 分类和标签页面会根据文章 frontmatter 自动聚合。

快速创建 Markdown 草稿：

```bash
npm run new:post -- "文章标题" --category=技术 --tags=Next.js,博客
```

更完整的上传说明见 `content/README.md`。

## 主要目录

```text
src/
  app/
    page.tsx
    posts/
    categories/
    tags/
    about/
    rss.xml/
    sitemap.ts
    robots.ts
  components/
    layout/
    post/
    three/
  lib/
    posts.ts
    site.ts
content/
  posts/
```

## 部署

部署目标为 Vercel。推荐将 GitHub 仓库连接到 Vercel，由 Vercel 自动执行：

```bash
npm run build
```

生产站点 URL 可通过环境变量配置：

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

该变量会用于 metadata、RSS、sitemap 和 robots 中的绝对链接。未配置时默认使用 `https://effective-garbanzo.vercel.app`。

## 后续计划

- 优化 Three.js CRT 模型细节和移动端性能。
- 增加代码块复制按钮和语法高亮。
- 增加本地搜索、归档页和阅读进度。
- 补充 Open Graph 图片和像素字体资源。
