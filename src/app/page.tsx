import Link from "next/link";
import { ArrowRight, Cpu, FolderKanban, Tags } from "lucide-react";
import { PostGrid } from "@/components/post/PostGrid";
import { CrtScene } from "@/components/three/CrtScene";
import { getAllPosts, getCategories, getFeaturedPosts, getTags } from "@/lib/posts";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 inline-flex border border-kimi-border bg-kimi-panel px-3 py-2 text-xs uppercase tracking-[0.26em] text-kimi-green">
            KIMI CRT BLOG OS / READY
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-kimi-text sm:text-6xl">
            TKY Blog
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-kimi-muted">
            一个以阅读为核心的黑白灰像素博客，用老式显示屏、终端面板和文章档案承载技术记录、项目复盘与长期思考。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 border border-kimi-text bg-kimi-text px-5 py-3 text-sm font-semibold text-kimi-black transition hover:bg-kimi-green"
            >
              浏览文章 <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-kimi-border bg-kimi-panel px-5 py-3 text-sm font-semibold text-kimi-text transition hover:border-kimi-green hover:text-kimi-green"
            >
              进入控制台
            </Link>
          </div>
        </div>
        <div className="crt-scanline border border-kimi-border bg-kimi-panel p-2 shadow-glow">
          <div className="aspect-[4/3] border border-kimi-border bg-black">
            <CrtScene postsCount={posts.length} categoriesCount={categories.length} tagsCount={tags.length} />
          </div>
        </div>
      </section>

      <section className="border-y border-kimi-border bg-kimi-panel/70">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Cpu className="text-kimi-green" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black">{posts.length}</p>
              <p className="text-sm text-kimi-muted">文章信号</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FolderKanban className="text-kimi-green" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black">{categories.length}</p>
              <p className="text-sm text-kimi-muted">分类频道</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tags className="text-kimi-green" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black">{tags.length}</p>
              <p className="text-sm text-kimi-muted">标签索引</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-kimi-green">Featured Posts</p>
            <h2 className="mt-2 text-3xl font-black">精选文章</h2>
          </div>
          <Link href="/posts" className="text-sm text-kimi-muted hover:text-kimi-green">
            全部文章
          </Link>
        </div>
        <PostGrid posts={featuredPosts} />
      </section>
    </div>
  );
}
