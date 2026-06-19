import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
import { TypewriterText } from "@/components/TypewriterText";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { PostSidebar } from "@/components/post/PostSidebar";

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

function getNodeText(node: React.ReactNode): string {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node) && node.props) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      return getNodeText(props.children);
    }
  }
  return "";
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(markdownText: string) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdownText)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlug(text);
    headings.push({ level, text, id });
  }
  return headings;
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
  const headings = extractHeadings(post.content);

  const sidebarPosts = allPosts.map((item) => ({
    slug: item.slug,
    title: item.title,
    date: item.date,
  }));

  return (
    <ScreenFrame eyebrow="Archive Feed" hideHeader={true} isArticle={true}>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 items-start mx-auto max-w-[1040px] py-4">
        {/* Interactive Responsive Sidebar (Left) */}
        <PostSidebar headings={headings} posts={sidebarPosts} currentSlug={post.slug} />

        {/* Article content (Right) */}
        <article className="flex-1 min-w-0 w-full">
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
            <h1 className="mt-4 text-4xl font-black leading-tight text-kimi-text sm:text-5xl">
              <TypewriterText text={post.title} />
            </h1>
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
          <div className="prose prose-neutral text-kimi-text mt-8 max-w-none prose-headings:text-kimi-text prose-a:text-kimi-green prose-blockquote:border-l-kimi-green prose-blockquote:bg-kimi-raised/60 prose-blockquote:px-4 prose-blockquote:py-2 prose-th:text-kimi-green">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                h2: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = generateSlug(text);
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                h3: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = generateSlug(text);
                  return <h3 id={id} {...props}>{children}</h3>;
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                h4: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = generateSlug(text);
                  return <h4 id={id} {...props}>{children}</h4>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          <nav className="mt-12 grid gap-4 border-t border-kimi-border pt-8 sm:grid-cols-2" aria-label="文章导航">
            {previous ? (
              <Link href={`/posts/${previous.slug}`} className="border border-kimi-border p-4 hover:border-kimi-green">
                <span className="font-pixel text-xs text-kimi-muted">上一篇</span>
                <p className="mt-2 font-pixel font-semibold text-kimi-text">{previous.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/posts/${next.slug}`} className="border border-kimi-border p-4 text-right hover:border-kimi-green">
                <span className="font-pixel text-xs text-kimi-muted">下一篇</span>
                <p className="mt-2 font-pixel font-semibold text-kimi-text">{next.title}</p>
              </Link>
            ) : null}
          </nav>
        </article>
      </div>
    </ScreenFrame>
  );
}
