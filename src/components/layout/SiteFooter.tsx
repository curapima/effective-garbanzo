"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="border-t border-kimi-border bg-kimi-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 font-pixel text-sm text-kimi-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>effective-garbanzo / CRT terminal theme / Built for long-form reading.</p>
        <div className="flex gap-4">
          <Link href="/rss.xml" className="hover:text-kimi-green">
            RSS
          </Link>
          <Link href="/sitemap.xml" className="hover:text-kimi-green">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
