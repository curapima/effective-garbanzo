import Link from "next/link";
import { ArrowRight, Cpu, FolderKanban, ScanLine, Sparkles, Tags, Terminal } from "lucide-react";
import { getAllPosts, getCategories, getFeaturedPosts, getTags } from "@/lib/posts";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  return (
    <section className="home-crt-stage">
      <div className="crt-noise" aria-hidden="true" />
      <div className="crt-home-device" aria-label="CRT 显示器中的 effective-garbanzo 首页">
        <div className="crt-home-topbar" aria-hidden="true">
          <span className="font-pixel">EFFECTIVE-GARBANZO TERMINAL</span>
          <span className="crt-home-led" />
        </div>
        <div className="crt-home-screen crt-scanline">
          <div className="crt-home-glass" aria-hidden="true" />
          <div className="crt-home-content">
            <nav className="crt-home-nav" aria-label="首页终端导航">
              <Link href="/posts">POSTS</Link>
              <Link href="/categories">CATEGORIES</Link>
              <Link href="/tags">TAGS</Link>
              <Link href="/about">ABOUT</Link>
            </nav>

            <header className="crt-home-hero">
              <p className="glitch-label inline-flex border border-kimi-border bg-kimi-panel px-3 py-2 font-pixel text-xs uppercase tracking-[0.26em] text-kimi-green">
                CRT DEVICE FRAME / BETA 0.2
              </p>
              <h1 className="mt-4 max-w-4xl font-pixel text-4xl font-black leading-tight text-kimi-text sm:text-6xl">
                effective-garbanzo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-kimi-muted">
                一台复古博客终端。首页所有内容都运行在这块 CRT 屏幕里：文章、分类、标签、精选入口和视觉叙事都由显示器承载。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 border border-kimi-text bg-kimi-text px-5 py-3 font-pixel text-sm font-semibold text-kimi-black transition hover:bg-kimi-green"
                >
                  浏览文章 <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-kimi-border bg-kimi-panel px-5 py-3 font-pixel text-sm font-semibold text-kimi-text transition hover:border-kimi-green hover:text-kimi-green"
                >
                  进入控制台
                </Link>
              </div>
            </header>

            <div className="crt-home-metrics" aria-label="博客指标">
              <Link href="/posts" className="terminal-panel group">
                <Cpu className="text-kimi-green" aria-hidden="true" />
                <span className="font-pixel text-3xl font-black">{posts.length}</span>
                <span className="font-pixel text-sm text-kimi-muted group-hover:text-kimi-green">文章信号</span>
              </Link>
              <Link href="/categories" className="terminal-panel group">
                <FolderKanban className="text-kimi-green" aria-hidden="true" />
                <span className="font-pixel text-3xl font-black">{categories.length}</span>
                <span className="font-pixel text-sm text-kimi-muted group-hover:text-kimi-green">分类频道</span>
              </Link>
              <Link href="/tags" className="terminal-panel group">
                <Tags className="text-kimi-green" aria-hidden="true" />
                <span className="font-pixel text-3xl font-black">{tags.length}</span>
                <span className="font-pixel text-sm text-kimi-muted group-hover:text-kimi-green">标签索引</span>
              </Link>
            </div>

            <section className="crt-home-section" aria-labelledby="featured-title">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Featured Posts</p>
                  <h2 id="featured-title" className="mt-2 font-pixel text-3xl font-black">
                    精选文章
                  </h2>
                </div>
                <Link href="/posts" className="font-pixel text-sm text-kimi-muted hover:text-kimi-green">
                  全部文章
                </Link>
              </div>
              <div className="grid gap-3 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="crt-post-channel group">
                    <span className="font-pixel text-xs text-kimi-green">CHANNEL 0{index + 1}</span>
                    <h3 className="mt-3 font-pixel text-xl font-semibold text-kimi-text group-hover:text-kimi-green">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-kimi-muted">{post.description}</p>
                    <span className="mt-4 inline-flex font-pixel text-xs text-kimi-muted">{post.category}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="crt-home-section" aria-labelledby="style-title">
              <div>
                <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Visual Protocol</p>
                <h2 id="style-title" className="mt-2 font-pixel text-3xl font-black">
                  CRT 画中画协议
                </h2>
              </div>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                <div className="terminal-panel">
                  <Terminal className="text-kimi-green" aria-hidden="true" />
                  <h3 className="font-pixel text-xl font-black">SCREEN-IN-SCREEN</h3>
                  <p className="leading-7 text-kimi-muted">首页内容不在显示器旁边，而是在 CRT 屏幕里运行。</p>
                </div>
                <div className="terminal-panel">
                  <ScanLine className="text-kimi-green" aria-hidden="true" />
                  <h3 className="font-pixel text-xl font-black">CRT EFFECTS</h3>
                  <p className="leading-7 text-kimi-muted">扫描线、玻璃反光、磷光辉光和 RGB 分离构成屏幕质感。</p>
                </div>
                <div className="terminal-panel">
                  <Sparkles className="text-kimi-green" aria-hidden="true" />
                  <h3 className="font-pixel text-xl font-black">RETRO FUTURE</h3>
                  <p className="leading-7 text-kimi-muted">复古设备承载现代博客内容，形成怀旧未来主义叙事。</p>
                </div>
              </div>
            </section>

            <section className="crt-home-section" aria-labelledby="channels-title">
              <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">Category Channels</p>
              <h2 id="channels-title" className="mt-2 font-pixel text-3xl font-black">
                分类频道
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/categories/${encodeURIComponent(category.name)}`}
                    className="border border-kimi-border bg-kimi-black px-3 py-2 font-pixel text-sm text-kimi-muted hover:border-kimi-green hover:text-kimi-green"
                  >
                    {category.name} [{category.count}]
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="crt-home-controls" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
