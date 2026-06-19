import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/post/PostGrid";
import { getAllPosts, getTags } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const name = decodeURIComponent(tag);

  return {
    title: `#${name}`,
    description: `浏览 #${name} 标签下的文章。`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const posts = getAllPosts().filter((post) => post.tags.includes(name));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Tag Signal</p>
      <h1 className="mt-3 font-pixel text-4xl font-black">#{name}</h1>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
