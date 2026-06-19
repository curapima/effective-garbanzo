import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/post/PostGrid";
import { getAllPosts, getCategories } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.name }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);

  return {
    title: `${name} 分类`,
    description: `浏览 ${name} 分类下的文章。`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getAllPosts().filter((post) => post.category === name);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-kimi-green">Category Channel</p>
      <h1 className="mt-3 text-4xl font-black">{name}</h1>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
