"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Exposes a --p (0 → 1) CSS variable that grows as the block scrolls
// through the viewport. Used to "draw" the timeline lines.
export default function ScrollFill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.65 - r.top) / r.height;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
