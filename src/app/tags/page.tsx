import type { Metadata } from "next";
import { LinkPanel } from "@/components/LinkPanel";
import { getTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "浏览 TKY Blog 的全部文章标签。",
};

export default function TagsPage() {
  const tags = getTags();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-kimi-green">Tag Index</p>
      <h1 className="mt-3 text-4xl font-black">标签</h1>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {tags.map((tag) => (
          <LinkPanel
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            title={`#${tag.name}`}
            meta={`${tag.count} 篇`}
          />
        ))}
      </div>
    </section>
  );
}
