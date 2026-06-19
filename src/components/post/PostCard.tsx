import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border border-kimi-border bg-kimi-panel p-5 shadow-pixel transition hover:-translate-y-1 hover:border-kimi-green">
      <div className="mb-4 flex flex-wrap items-center gap-2 font-pixel text-xs uppercase tracking-[0.18em] text-kimi-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span>/</span>
        <span>{post.category}</span>
        <span>/</span>
        <span>{post.readingMinutes} min</span>
      </div>
      <h2 className="font-pixel text-xl font-semibold text-kimi-text">
        <Link href={`/posts/${post.slug}`} className="flex items-start justify-between gap-3">
          <span>{post.title}</span>
          <ArrowUpRight className="mt-1 shrink-0 text-kimi-dim transition group-hover:text-kimi-green" size={18} />
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-7 text-kimi-muted">{post.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="border border-kimi-border bg-kimi-black px-2 py-1 font-pixel text-xs text-kimi-muted hover:border-kimi-green hover:text-kimi-green"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
