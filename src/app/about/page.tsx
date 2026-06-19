import type { Metadata } from "next";
import { ScreenFrame } from "@/components/layout/ScreenFrame";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 effective-garbanzo 的写作主题与联系方式。",
};

export default function AboutPage() {
  return (
    <ScreenFrame eyebrow="Operator Profile" title="关于" maxWidth="narrow">
      <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-kimi-text prose-a:text-kimi-green">
        <p>
          effective-garbanzo 是一个个人知识终端，用来沉淀技术文章、项目记录、阅读笔记和一些不急着被算法吞掉的长期想法。
        </p>
        <p>
          这个初始版本采用黑白灰、CRT 扫描线和像素控制台语言作为视觉基底。后续会逐步补齐 Three.js 巨型老式显示屏、
          本地搜索、代码复制、归档统计和更完整的阅读增强体验。
        </p>
        <p>联系方式与项目链接可以在这里继续补充。</p>
      </div>
    </ScreenFrame>
  );
}
