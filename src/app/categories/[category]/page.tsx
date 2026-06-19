import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
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
    <ScreenFrame eyebrow="Category Channel" title={name} description={`${posts.length} 篇文章已接入该分类频道。`}>
      <PostGrid posts={posts} />
    </ScreenFrame>
  );
}
