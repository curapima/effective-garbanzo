---
title: "Three.js 老式显示屏路线图"
slug: "three-screen-roadmap"
description: "拆解首页 3D 场景的最小可行实现方式。"
date: "2026-06-17"
updated: "2026-06-17"
category: "技术"
tags:
  - "Three.js"
  - "3D"
  - "前端"
draft: false
---

## 最小模型

首页第一屏需要一个真正由 Three.js 渲染的老式显示屏。初始模型可以先由基础几何体拼装：机身、屏幕、按钮、旋钮和底座。

- 机身负责建立厚重的老式设备轮廓。
- 屏幕纹理负责承载博客标题、路由和文章指标。
- 旋钮与按钮负责提供游戏机控制台的细节感。

## 渐进增强

第一版只要确保 canvas 非空、模型可见、移动端不遮挡内容即可。之后再加入屏幕文字、悬停反馈、滚动时间线和更细的材质。

```ts
const crtScene = {
  model: "retro-monitor",
  screen: "blog-terminal",
  motion: "reduced-motion-aware",
};
```

> 3D 场景应该服务于博客探索，而不是替代文章本身。
