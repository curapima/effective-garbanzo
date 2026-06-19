type ScreenFrameProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "narrow" | "wide";
};

export function ScreenFrame({
  eyebrow,
  title,
  description,
  children,
  maxWidth = "wide",
}: ScreenFrameProps) {
  const widthClass = maxWidth === "narrow" ? "max-w-3xl" : "max-w-6xl";

  return (
    <section className={`screen-page mx-auto ${widthClass} px-4 py-10 sm:px-6`}>
      <div className="screen-page-shell">
        <div className="screen-page-topbar" aria-hidden="true">
          <span className="font-pixel">CRT / {eyebrow}</span>
          <span className="screen-page-led" />
        </div>
        <div className="screen-page-display crt-scanline">
          <div className="screen-page-glass" aria-hidden="true" />
          <div className="screen-page-content">
            <header className="border-b border-kimi-border pb-8">
              <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">{eyebrow}</p>
              <h1 className="mt-3 font-pixel text-4xl font-black text-kimi-text">{title}</h1>
              {description ? <p className="mt-4 max-w-2xl leading-8 text-kimi-muted">{description}</p> : null}
            </header>
            <div className="mt-8">{children}</div>
          </div>
        </div>
        <div className="screen-page-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
