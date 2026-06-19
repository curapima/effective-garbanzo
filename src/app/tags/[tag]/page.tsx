import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
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
    <ScreenFrame eyebrow="Tag Signal" title={`#${name}`} description={`${posts.length} 篇文章匹配该标签信号。`}>
      <PostGrid posts={posts} />
    </ScreenFrame>
  );
}
