import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-kimi-border bg-kimi-panel/90">
      <div className="flex flex-col gap-3 px-4 py-5 font-pixel text-sm text-kimi-muted sm:flex-row sm:items-center sm:justify-between">
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
