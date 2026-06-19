import type { Metadata } from "next";
import { LinkPanel } from "@/components/LinkPanel";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
import { getCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "分类",
  description: "浏览 effective-garbanzo 的文章分类。",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <ScreenFrame eyebrow="Signal Channels" title="分类" description="所有分类频道都运行在同一台 CRT 博客终端里。">
      <div className="grid gap-3">
        {categories.map((category) => (
          <LinkPanel
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name)}`}
            title={category.name}
            meta={`${category.count} 篇`}
          />
        ))}
      </div>
    </ScreenFrame>
  );
}
