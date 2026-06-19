"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScreenFrameShell3D } from "@/components/layout/ScreenFrameShell3D";
import { TypewriterText } from "@/components/TypewriterText";

type ScreenFrameProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "narrow" | "wide";
  hideHeader?: boolean;
  isArticle?: boolean;
};

export function ScreenFrame({
  eyebrow = "",
  title = "",
  description,
  children,
  maxWidth,
  hideHeader = false,
  isArticle = false,
}: ScreenFrameProps) {
  const pathname = usePathname();
  const [isStarting, setIsStarting] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  // CRT Screen Power-on sequence (runs only once per session)
  useEffect(() => {
    const hasTurnedOn = sessionStorage.getItem("crt-turned-on");
    if (!hasTurnedOn) {
      setIsStarting(true);
      sessionStorage.setItem("crt-turned-on", "true");
      const timer = setTimeout(() => {
        setIsStarting(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Monitor Route/Navigation changes (Light 3 - Amber)
  useEffect(() => {
    setIsRouting(true);
    const timer = setTimeout(() => {
      setIsRouting(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Monitor Page Clicks/Input (Light 2 - Flickering Green)
  useEffect(() => {
    const handleClick = () => {
      setIsClicking(true);
      const timer = setTimeout(() => {
        setIsClicking(false);
      }, 400);
      return () => clearTimeout(timer);
    };

    window.addEventListener("mousedown", handleClick, { passive: true });
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Monitor Page Scrolling (Light 1 - Solid Green Glow)
  useEffect(() => {
    const scrollContainer = document.querySelector(".screen-page-content");
    if (!scrollContainer) return;

    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`screen-page screen-page-3d ${isArticle ? "screen-page-article" : ""}`}>
      <ScreenFrameShell3D
        isArticle={isArticle}
        isClicking={isClicking}
        isRouting={isRouting}
        isScrolling={isScrolling}
      />
      <div className={`screen-page-shell ${isArticle ? "article-frame-shell" : ""}`}>
        <div className="screen-page-topbar" aria-hidden="true">
          <span className="font-pixel">CRT / {eyebrow || "TERMINAL"}</span>
          <span className="screen-page-led" />
        </div>
        <div className={`screen-page-display ${isArticle ? "" : "crt-scanline"} ${isStarting ? "crt-power-on" : ""}`}>
          {!isArticle && <div className="screen-page-glass" aria-hidden="true" />}
          <SiteHeader />
          <div className="screen-page-content">
            {!hideHeader && title ? (
              <header className="border-b border-kimi-border pb-8">
                {eyebrow ? (
                  <p className="font-pixel text-xs uppercase tracking-[0.24em] text-kimi-green">{eyebrow}</p>
                ) : null}
                <h1 className="mt-3 font-pixel text-4xl font-black text-kimi-text">
                  <TypewriterText text={title} />
                </h1>
                {description ? <p className="mt-4 max-w-2xl leading-8 text-kimi-muted">{description}</p> : null}
              </header>
            ) : null}
            <div className={`${hideHeader ? "" : "mt-8"} ${maxWidth === "narrow" ? "mx-auto max-w-3xl" : ""}`}>
              {children}
            </div>
          </div>
          <SiteFooter />
        </div>
        <div className="screen-page-controls" aria-hidden="true">
          <span className={isScrolling ? "led-scroll-active" : ""} />
          <span className={isClicking ? "led-click-active" : ""} />
          <span className={isRouting ? "led-route-active" : ""} />
        </div>
      </div>
    </section>
  );
}
