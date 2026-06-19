"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 70,
  className = "",
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
    setIsDone(false);

    if (!text) return;

    const interval = setInterval(() => {
      const charIndex = indexRef.current;
      if (charIndex >= text.length) {
        clearInterval(interval);
        setIsDone(true);
        return;
      }

      setDisplayedText((prev) => prev + text.charAt(charIndex));
      indexRef.current += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isDone && (
        <span className="animate-pulse ml-1 inline-block text-kimi-green font-normal">█</span>
      )}
    </span>
  );
}
