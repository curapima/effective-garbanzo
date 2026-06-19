"use client";

// REBUILD TRIGGER: Force hot-reload compile for sidebar component styles
import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

export interface PostItem {
  slug: string;
  title: string;
  date: string;
}

export interface PostSidebarProps {
  headings: HeadingItem[];
  posts: PostItem[];
  currentSlug: string;
}

export function PostSidebar({ headings, posts, currentSlug }: PostSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Scroll Spy Implementation
  useEffect(() => {
    const container = document.querySelector(".screen-page-content");
    if (!container || headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      const containerRect = container.getBoundingClientRect();
      const offset = 100; // Offset in pixels from top of scroll container
      let currentActiveId = "";

      for (let i = 0; i < headingElements.length; i++) {
        const rect = headingElements[i].getBoundingClientRect();
        // If the top of the heading is above the container top margin + offset
        if (rect.top - containerRect.top <= offset) {
          currentActiveId = headingElements[i].id;
        } else {
          break;
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      } else if (headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially with a small delay for content rendering
    const timeoutId = setTimeout(handleScroll, 150);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [headings]);

  // Smooth Scroll handler
  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsDrawerOpen(false);

    const element = document.getElementById(id);
    const container = document.querySelector(".screen-page-content");
    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Calculate top scroll offset relative to container viewport
      const targetScrollTop = container.scrollTop + (elementRect.top - containerRect.top) - 24;
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });

      // Update URL hash without causing a page jump
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Keyboard shortcut for closing drawer with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  // Prevent scroll propagation on body when drawer is open
  useEffect(() => {
    const container = document.querySelector(".screen-page-content");
    if (container) {
      if (isDrawerOpen) {
        container.classList.add("overflow-hidden");
      } else {
        container.classList.remove("overflow-hidden");
      }
    }
  }, [isDrawerOpen]);

  const renderTOCList = () => {
    if (headings.length === 0) {
      return <p className="text-kimi-dim text-xs italic">本文无标题内容</p>;
    }

    return (
      <ul className="space-y-2 text-xs">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li
              key={h.id}
              style={{ paddingLeft: `${Math.max(0, (h.level - 2) * 12)}px` }}
              className="transition-all"
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => handleHeadingClick(e, h.id)}
                className={`group flex items-start py-0.5 transition-colors block leading-relaxed ${
                  isActive
                    ? "text-kimi-green font-semibold"
                    : "text-kimi-muted hover:text-kimi-green"
                }`}
              >
                {isActive && <span className="mr-1 text-kimi-green select-none font-bold animate-pulse">&gt;</span>}
                <span className="truncate">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderArticleList = () => {
    return (
      <ul className="space-y-3 text-xs">
        {posts.map((item) => {
          const isCurrent = item.slug === currentSlug;
          return (
            <li key={item.slug}>
              <Link
                href={`/posts/${item.slug}`}
                onClick={() => setIsDrawerOpen(false)}
                className={`group block border border-transparent p-1.5 transition-colors ${
                  isCurrent
                    ? "border-kimi-border/40 bg-kimi-raised/40 text-kimi-green font-semibold"
                    : "text-kimi-muted hover:text-kimi-green"
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCurrent && <span className="text-kimi-green font-bold">&gt;</span>}
                  <span className="truncate block font-medium">{item.title}</span>
                </div>
                <div className="text-[10px] text-kimi-dim font-pixel mt-1 pl-3 group-hover:text-kimi-green/70">
                  {item.date}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP STICKY SIDEBAR (Hidden on mobile/tablet, shown on lg screens)    */}
      {/* ========================================================================= */}
      <aside className="hidden lg:block w-[240px] shrink-0 sticky top-6 space-y-6">
        {/* TOC Panel */}
        <div className="border border-kimi-border bg-kimi-panel p-4 shadow-pixel">
          <h3 className="font-pixel text-[11px] font-bold text-kimi-green uppercase tracking-wider mb-3 pb-1.5 border-b border-kimi-border/40">
            [ 标题跳转 ]
          </h3>
          {renderTOCList()}
        </div>

        {/* Channels/Switcher Panel */}
        <div className="border border-kimi-border bg-kimi-panel p-4 shadow-pixel">
          <h3 className="font-pixel text-[11px] font-bold text-kimi-green uppercase tracking-wider mb-3 pb-1.5 border-b border-kimi-border/40">
            [ 文章切换 ]
          </h3>
          {renderArticleList()}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE TRIGGER FLOATING BUTTON                                             */}
      {/* ========================================================================= */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="打开导航目录"
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center gap-2 border border-kimi-border bg-kimi-panel shadow-pixel px-3 py-2.5 font-pixel text-xs font-bold text-kimi-text hover:border-kimi-green hover:text-kimi-green active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <span className="text-kimi-green font-bold">&gt;</span>
          <span>导航</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE COLLAPSIBLE DRAWER (Sliding in from the Left)                      */}
      {/* ========================================================================= */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Panel Container */}
          <div
            className={`relative flex flex-col w-72 max-w-[85vw] h-full border-r border-kimi-border bg-kimi-panel shadow-2xl p-5 overflow-y-auto transform transition-transform duration-300 ease-in-out z-10 ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-kimi-border mb-6">
              <span className="font-pixel text-xs font-bold text-kimi-green">[ 导航面板 ]</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="font-pixel text-xs text-kimi-muted hover:text-kimi-green cursor-pointer border border-transparent px-1 hover:border-kimi-border bg-transparent"
              >
                [ 关闭 ]
              </button>
            </div>

            {/* Scrollable Content inside Drawer */}
            <div className="flex-1 space-y-6 pr-1">
              {/* Mobile TOC Section */}
              <div>
                <h4 className="font-pixel text-[11px] font-bold text-kimi-green uppercase tracking-wider mb-3">
                  ■ 标题跳转
                </h4>
                <div className="pl-1 border-l border-kimi-border/30">{renderTOCList()}</div>
              </div>

              {/* Mobile Switcher Section */}
              <div>
                <h4 className="font-pixel text-[11px] font-bold text-kimi-green uppercase tracking-wider mb-3">
                  ■ 文章切换
                </h4>
                <div className="pl-1 border-l border-kimi-border/30">{renderArticleList()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
