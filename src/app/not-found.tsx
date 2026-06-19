import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 text-center sm:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-kimi-green">404 / Signal Lost</p>
        <h1 className="mt-4 text-5xl font-black">频道不存在</h1>
        <p className="mt-5 text-kimi-muted">这条博客信号暂时无法解析，可以返回首页重新选择频道。</p>
        <Link
          href="/"
          className="mt-8 inline-flex border border-kimi-text bg-kimi-text px-5 py-3 text-sm font-semibold text-kimi-black hover:bg-kimi-green"
        >
          返回首页
        </Link>
      </div>
    </section>
  );
}
