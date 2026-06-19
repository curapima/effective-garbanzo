import type { Metadata } from "next";
import { LinkPanel } from "@/components/LinkPanel";
import { getCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "分类",
  description: "浏览 TKY Blog 的文章分类。",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-kimi-green">Signal Channels</p>
      <h1 className="mt-3 text-4xl font-black">分类</h1>
      <div className="mt-10 grid gap-3">
        {categories.map((category) => (
          <LinkPanel
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name)}`}
            title={category.name}
            meta={`${category.count} 篇`}
          />
        ))}
      </div>
    </section>
  );
}
