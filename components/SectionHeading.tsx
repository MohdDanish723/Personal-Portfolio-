import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  intro,
}: {
  index: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
        </div>
        <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <p className="max-w-[48ch] text-ink-muted lg:justify-self-end">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
