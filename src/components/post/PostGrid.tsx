import { PostCard } from "@/components/post/PostCard";
import type { Post } from "@/lib/posts";

export function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="border border-kimi-border bg-kimi-panel p-6 text-kimi-muted">
        暂无文章信号。请稍后重新扫描频道。
      </p>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
