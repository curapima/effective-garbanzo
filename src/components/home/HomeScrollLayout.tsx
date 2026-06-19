"use client";

import React, { useState, useEffect, useRef } from "react";

interface HomeScrollLayoutProps {
  children: React.ReactNode;
}

export function HomeScrollLayout({ children }: HomeScrollLayoutProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  
  const isScrolling = useRef<boolean>(false);
  const touchStartY = useRef<number>(0);
  const totalSections = 4;

  // Measure the viewport height of the scroll container (.screen-page-content)
  useEffect(() => {
    const container = document.querySelector(".screen-page-content") as HTMLElement;
    if (!container) return;

    const updateHeight = () => {
      const style = window.getComputedStyle(container);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      // Actual available height inside padding
      setContainerHeight(container.clientHeight - paddingTop - paddingBottom);
    };

    updateHeight();
    
    // Listen for resize changes
    const observer = new ResizeObserver(updateHeight);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);



  // Smooth scroll helper
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;
    
    const container = document.querySelector(".screen-page-content") as HTMLElement;
    if (!container) return;

    const panels = container.querySelectorAll(".home-section-panel");
    if (panels[index]) {
      const containerRect = container.getBoundingClientRect();
      const panelRect = panels[index].getBoundingClientRect();
      
      const targetScrollTop = container.scrollTop + (panelRect.top - containerRect.top);
      
      isScrolling.current = true;
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
      setActiveIndex(index);

      // Lock scrolling for 800ms for transition animation
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    }
  };

  // Keyboard, wheel, and touch event listeners
  useEffect(() => {
    const container = document.querySelector(".screen-page-content") as HTMLElement;
    if (!container) return;

    // Mouse Wheel Scroll Listener
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling behavior
      e.preventDefault();

      if (isScrolling.current) return;

      // Filter out small accidental scrolls (threshold of 10)
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        if (activeIndex < totalSections - 1) {
          scrollToSection(activeIndex + 1);
        }
      } else {
        if (activeIndex > 0) {
          scrollToSection(activeIndex - 1);
        }
      }
    };

    // Mobile Touch Scroll Listeners
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      // Threshold of 40px for swipe gesture
      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          if (activeIndex < totalSections - 1) {
            e.preventDefault();
            scrollToSection(activeIndex + 1);
          }
        } else {
          if (activeIndex > 0) {
            e.preventDefault();
            scrollToSection(activeIndex - 1);
          }
        }
      }
    };

    // Bind event listeners (passive: false is required to allow e.preventDefault())
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeIndex < totalSections - 1) {
          e.preventDefault();
          scrollToSection(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToSection(activeIndex - 1);
        }
      } else if (e.key === " " && !e.shiftKey) { // Space
        if (activeIndex < totalSections - 1) {
          e.preventDefault();
          scrollToSection(activeIndex + 1);
        }
      } else if (e.key === " " && e.shiftKey) { // Shift+Space
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToSection(activeIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Lock free scroll on parent container
  useEffect(() => {
    const container = document.querySelector(".screen-page-content") as HTMLElement;
    if (container) {
      container.classList.add("overflow-hidden");
    }
    return () => {
      if (container) {
        container.classList.remove("overflow-hidden");
      }
    };
  }, []);

  return (
    <div
      className="relative w-full flex flex-col"
      style={{
        "--section-height": containerHeight ? `${containerHeight}px` : "100%",
      } as React.CSSProperties}
    >
      {/* 4 Section content panel wrapper */}
      <div className="flex-1 w-full flex flex-col">
        {children}
      </div>

      {/* Floating Retro Terminal Indicators (Right aligned) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {[0, 1, 2, 3].map((index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              aria-label={`切换至第 ${index + 1} 区域`}
              className={`font-pixel text-[10px] border px-1.5 py-0.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-kimi-green bg-kimi-green text-white shadow-[0_0_8px_rgba(0,102,34,0.4)] scale-110"
                  : "border-kimi-border bg-kimi-panel text-kimi-muted hover:border-kimi-green hover:text-kimi-green"
              }`}
            >
              0{index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
