import Link from "next/link";
import { ArrowRight, Cpu, FolderKanban, ScanLine, Sparkles, Tags, Terminal } from "lucide-react";
import { ScreenFrame } from "@/components/layout/ScreenFrame";
import { getAllPosts, getCategories, getFeaturedPosts, getTags } from "@/lib/posts";
import { HomeScrollLayout } from "@/components/home/HomeScrollLayout";
import { TypewriterText } from "@/components/TypewriterText";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  return (
    <ScreenFrame eyebrow="BLOG TERMINAL" hideHeader={true}>
      <HomeScrollLayout>
        {/* ========================================================================= */}
        {/* SECTION 1: HERO & METRICS                                                 */}
        {/* ========================================================================= */}
        <section className="home-section-panel flex flex-col justify-start" aria-labelledby="hero-title">
          <header className="max-w-3xl mb-4">
            <p className="glitch-label inline-flex border border-kimi-border bg-kimi-panel px-3 py-1.5 font-pixel text-xs uppercase tracking-[0.26em] text-kimi-green">
              CRT DEVICE FRAME / BETA 0.2
            </p>
            <h1 id="hero-title" className="mt-3 font-pixel text-4xl font-black leading-tight text-kimi-text sm:text-5xl">
              <TypewriterText text="effective-garbanzo" />
            </h1>
            <p className="mt-4 text-base leading-7 text-kimi-muted">
              一台复古博客终端。首页所有内容都运行在这块 CRT 屏幕里：文章、分类、标签、精选入口和视觉叙事都由显示器承载。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 border border-kimi-text bg-kimi-text px-4 py-2.5 font-pixel text-xs font-semibold text-kimi-black transition hover:bg-kimi-green"
              >
                浏览文章 <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-kimi-border bg-kimi-panel px-4 py-2.5 font-pixel text-xs font-semibold text-kimi-text transition hover:border-kimi-green hover:text-kimi-green"
              >
                进入控制台
              </Link>
            </div>
          </header>

          <div className="crt-home-metrics mt-4" aria-label="博客指标">
            <Link href="/posts" className="metrics-panel group">
              <Cpu className="text-kimi-green" aria-hidden="true" />
              <span className="font-pixel text-2xl font-black">{posts.length}</span>
              <span className="font-pixel text-xs text-kimi-muted group-hover:text-kimi-green">文章信号</span>
            </Link>
            <Link href="/categories" className="metrics-panel group">
              <FolderKanban className="text-kimi-green" aria-hidden="true" />
              <span className="font-pixel text-2xl font-black">{categories.length}</span>
              <span className="font-pixel text-xs text-kimi-muted group-hover:text-kimi-green">分类频道</span>
            </Link>
            <Link href="/tags" className="metrics-panel group">
              <Tags className="text-kimi-green" aria-hidden="true" />
              <span className="font-pixel text-2xl font-black">{tags.length}</span>
              <span className="font-pixel text-xs text-kimi-muted group-hover:text-kimi-green">标签索引</span>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: FEATURED POSTS                                                 */}
        {/* ========================================================================= */}
        <section className="home-section-panel flex flex-col justify-start border-t border-kimi-border/30" aria-labelledby="featured-title">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Featured Posts</p>
              <h2 id="featured-title" className="mt-1.5 font-pixel text-2xl font-black">
                精选文章
              </h2>
            </div>
            <Link href="/posts" className="font-pixel text-xs text-kimi-muted hover:text-kimi-green">
              全部文章
            </Link>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="crt-post-channel group">
                <span className="font-pixel text-[10px] text-kimi-green">CHANNEL 0{index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-kimi-text group-hover:text-kimi-green truncate">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-kimi-muted line-clamp-3">{post.description}</p>
                <span className="mt-3 inline-flex font-pixel text-[10px] text-kimi-muted">{post.category}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: VISUAL PROTOCOL                                               */}
        {/* ========================================================================= */}
        <section className="home-section-panel flex flex-col justify-start border-t border-kimi-border/30" aria-labelledby="style-title">
          <div className="mb-4">
            <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Visual Protocol</p>
            <h2 id="style-title" className="mt-1.5 font-pixel text-2xl font-black">
              CRT 画中画协议
            </h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="terminal-panel">
              <Terminal className="text-kimi-green" aria-hidden="true" />
              <h3 className="font-pixel text-lg font-black mt-1">SCREEN-IN-SCREEN</h3>
              <p className="text-xs leading-6 text-kimi-muted mt-1">首页内容不在显示器旁边，而是在 CRT 屏幕里运行。</p>
            </div>
            <div className="terminal-panel">
              <ScanLine className="text-kimi-green" aria-hidden="true" />
              <h3 className="font-pixel text-lg font-black mt-1">CRT EFFECTS</h3>
              <p className="text-xs leading-6 text-kimi-muted mt-1">扫描线、玻璃反光、磷光辉光和 RGB 分离构成屏幕质感。</p>
            </div>
            <div className="terminal-panel">
              <Sparkles className="text-kimi-green" aria-hidden="true" />
              <h3 className="font-pixel text-lg font-black mt-1">RETRO FUTURE</h3>
              <p className="text-xs leading-6 text-kimi-muted mt-1">复古设备承载现代博客内容，形成怀旧未来主义叙事。</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CATEGORY CHANNELS                                              */}
        {/* ========================================================================= */}
        <section className="home-section-panel flex flex-col justify-start border-t border-kimi-border/30" aria-labelledby="channels-title">
          <div className="mb-4">
            <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Category Channels</p>
            <h2 id="channels-title" className="mt-1.5 font-pixel text-2xl font-black">
              分类频道
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name)}`}
                className="border border-kimi-border bg-kimi-black px-3 py-2 font-pixel text-xs text-kimi-muted hover:border-kimi-green hover:text-kimi-green"
              >
                {category.name} [{category.count}]
              </Link>
            ))}
          </div>
        </section>
      </HomeScrollLayout>
    </ScreenFrame>
  );
}
