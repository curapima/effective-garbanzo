import Link from "next/link";
import { Monitor } from "lucide-react";

const navItems = [
  { href: "/posts", label: "文章" },
  { href: "/categories", label: "分类" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-kimi-border bg-kimi-black/88 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em]">
          <span className="grid h-9 w-9 place-items-center border border-kimi-border bg-kimi-panel text-kimi-green">
            <Monitor size={18} aria-hidden="true" />
          </span>
          TKY Blog
        </Link>
        <nav aria-label="主导航" className="flex flex-wrap justify-end gap-2 text-sm text-kimi-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-transparent px-3 py-2 transition hover:border-kimi-border hover:bg-kimi-panel hover:text-kimi-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-kimi-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
