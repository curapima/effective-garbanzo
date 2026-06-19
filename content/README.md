# 发布 Markdown 文章

博客文章放在 `content/posts/` 目录，支持 `.md` 和 `.mdx` 文件。对博客所有者来说，最简单的上传方式是把带 frontmatter 的 Markdown 文件复制到这个目录，然后提交并部署。

## 快速创建

```bash
npm run new:post -- "文章标题" --category=技术 --tags=Next.js,博客
```

脚本会在 `content/posts/` 下生成一个 `.md` 草稿文件。确认内容后，把 frontmatter 里的 `draft` 改成 `false` 即可发布。

## 手动上传

新建或上传一个 Markdown 文件，例如：

```text
content/posts/my-new-post.md
```

文件顶部必须包含：

```yaml
---
title: "文章标题"
description: "文章摘要，用于列表页和 SEO。"
date: "2026-06-19"
updated: "2026-06-19"
category: "技术"
tags:
  - "Next.js"
  - "博客"
draft: false
---
```

正文直接写 Markdown。文件名会成为文章地址，例如 `my-new-post.md` 会生成 `/posts/my-new-post`。

## 图片

图片建议放在 `public/images/posts/`，文章里这样引用：

```md
![图片说明](/images/posts/example.png)
```

## 发布检查

```bash
npm run lint
npm run build
```
