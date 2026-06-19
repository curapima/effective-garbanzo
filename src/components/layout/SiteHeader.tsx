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
    <header className="border-b border-kimi-border bg-kimi-panel/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-pixel text-sm font-bold uppercase tracking-[0.22em] text-kimi-text">
          <span className="grid h-9 w-9 place-items-center border border-kimi-border bg-kimi-panel text-kimi-green">
            <Monitor size={18} aria-hidden="true" />
          </span>
          effective-garbanzo
        </Link>
        <nav aria-label="主导航" className="flex flex-wrap justify-end gap-2 font-pixel text-sm text-kimi-muted">
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
