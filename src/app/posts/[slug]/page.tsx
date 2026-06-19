import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((item) => item.slug === post.slug);
  const previous = allPosts[index + 1];
  const next = allPosts[index - 1];

  return (
    <article className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <Link href="/posts" className="font-pixel text-sm text-kimi-muted hover:text-kimi-green">
        ← 返回文章列表
      </Link>
      <header className="mt-8 border-b border-kimi-border pb-8">
        <div className="flex flex-wrap gap-2 font-pixel text-xs uppercase tracking-[0.18em] text-kimi-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>/</span>
          <Link href={`/categories/${encodeURIComponent(post.category)}`} className="hover:text-kimi-green">
            {post.category}
          </Link>
          <span>/</span>
          <span>{post.readingMinutes} min</span>
        </div>
        <h1 className="mt-4 font-pixel text-4xl font-black leading-tight text-kimi-text sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-kimi-muted">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="border border-kimi-border bg-kimi-panel px-2 py-1 font-pixel text-xs text-kimi-muted hover:border-kimi-green hover:text-kimi-green"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      <div className="prose prose-invert prose-neutral mt-8 max-w-none prose-headings:text-kimi-text prose-a:text-kimi-green prose-blockquote:border-l-kimi-green prose-blockquote:bg-kimi-panel/70 prose-blockquote:px-4 prose-blockquote:py-2 prose-code:text-kimi-amber prose-pre:border prose-pre:border-kimi-border prose-pre:bg-kimi-black prose-th:text-kimi-green">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      <nav className="mt-12 grid gap-4 border-t border-kimi-border pt-8 sm:grid-cols-2" aria-label="文章导航">
        {previous ? (
          <Link href={`/posts/${previous.slug}`} className="border border-kimi-border p-4 hover:border-kimi-green">
            <span className="font-pixel text-xs text-kimi-muted">上一篇</span>
            <p className="mt-2 font-pixel font-semibold">{previous.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/posts/${next.slug}`} className="border border-kimi-border p-4 text-right hover:border-kimi-green">
            <span className="font-pixel text-xs text-kimi-muted">下一篇</span>
            <p className="mt-2 font-pixel font-semibold">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
