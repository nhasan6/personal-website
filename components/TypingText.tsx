"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  className?: string;
  typingSpeedMs?: number;
  pauseAfterCommaMs?: number;
};

// Types `text` out one character at a time, pausing a little longer after
// commas for a more natural rhythm, then leaves a blinking cursor behind.
export function TypingText({
  text,
  className,
  typingSpeedMs = 65,
  pauseAfterCommaMs = 220,
}: TypingTextProps) {
  const chars = Array.from(text);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= chars.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const id = setTimeout(() => setCount(chars.length), 0);
      return () => clearTimeout(id);
    }

    const delay = chars[count - 1] === "," ? pauseAfterCommaMs : typingSpeedMs;
    const id = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(id);
  }, [count, chars, typingSpeedMs, pauseAfterCommaMs]);

  const isDone = count >= chars.length;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {chars.slice(0, count).join("")}
        <span
          className={`ml-1 inline-block h-[0.85em] w-[3px] -translate-y-[0.05em] bg-current align-middle ${
            isDone ? "animate-pulse" : ""
          }`}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
