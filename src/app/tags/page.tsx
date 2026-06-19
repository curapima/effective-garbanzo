import type { Metadata } from "next";
import { LinkPanel } from "@/components/LinkPanel";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
import { getTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "浏览 effective-garbanzo 的全部文章标签。",
};

export default function TagsPage() {
  const tags = getTags();

  return (
    <ScreenFrame eyebrow="Tag Index" title="标签" description="扫描标签索引，进入对应文章信号。">
      <div className="grid gap-3 sm:grid-cols-2">
        {tags.map((tag) => (
          <LinkPanel
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            title={`#${tag.name}`}
            meta={`${tag.count} 篇`}
          />
        ))}
      </div>
    </ScreenFrame>
  );
}
