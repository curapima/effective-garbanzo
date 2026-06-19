import Link from "next/link";

export function LinkPanel({
  href,
  title,
  meta,
}: {
  href: string;
  title: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 border border-kimi-border bg-kimi-panel p-4 transition hover:border-kimi-green hover:text-kimi-green"
    >
      <span className="font-semibold">{title}</span>
      <span className="text-sm text-kimi-muted">{meta}</span>
    </Link>
  );
}
