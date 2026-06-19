import type { Metadata } from "next";
import { PostGrid } from "@/components/post/PostGrid";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "按时间倒序浏览 effective-garbanzo 的全部文章。",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Archive Feed</p>
      <h1 className="mt-3 font-pixel text-4xl font-black">文章</h1>
      <p className="mt-4 max-w-2xl text-kimi-muted">按时间倒序扫描所有技术文章、项目记录和随笔。</p>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
