"use client";

import type { MouseEvent, ReactNode } from "react";

// A card with a soft light that follows the cursor. Updates CSS variables
// directly on the element, so it never triggers a React re-render.
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div className={`spot ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}
