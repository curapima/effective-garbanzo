import type { Metadata } from "next";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
import { PostGrid } from "@/components/post/PostGrid";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "按时间倒序浏览 effective-garbanzo 的全部文章。",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <ScreenFrame eyebrow="Archive Feed" title="文章" description="按时间倒序扫描所有技术文章、项目记录和随笔。">
      <PostGrid posts={posts} />
    </ScreenFrame>
  );
}
