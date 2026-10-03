"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import ProjectPreview from "@/components/ProjectPreview";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { projects, type Project } from "@/lib/data";

const categories = ["All", "Web App", "Automation", "Tool"] as const;
type Category = (typeof categories)[number];

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const visible: Project[] =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title={
            <>
              Selected <em>work</em>
            </>
          }
          intro="Things I've built end to end — each one started as a real problem, not a tutorial."
        />

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {categories.map((cat) => {
            const on = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={on}
                className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                  on
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line-strong text-ink-muted hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div key={active} className="grid gap-5 md:grid-cols-2">
          {visible.map((p, i) => {
            const wide = i === 0 && visible.length > 1;
            return (
              <Reveal key={p.slug} delay={i * 90} className={wide ? "md:col-span-2" : ""}>
                <SpotlightCard
                  className={`group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong ${
                    wide ? "md:grid md:grid-cols-[1.05fr_1fr]" : ""
                  }`}
                >
                  <div
                    className={`overflow-hidden border-b border-line ${
                      wide ? "md:border-b-0 md:border-r" : ""
                    } h-52 ${wide ? "md:h-auto md:min-h-72" : ""}`}
                  >
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- static local asset, no remote domains to configure
                        <img
                          src={p.image}
                          alt={`${p.title} preview`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ProjectPreview variant={p.preview} />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col p-7">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-md border border-line-strong px-2.5 py-1 text-xs text-ink-muted">
                        {p.category}
                      </span>
                      <span className="font-mono text-xs text-ink-muted">
                        {String(projects.indexOf(p) + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mb-5 text-ink-muted">{p.description}</p>
                    <ul className="mb-6 space-y-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm text-ink-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-ink-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.title} on GitHub`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong text-ink-muted transition-colors hover:border-accent hover:text-accent"
                          >
                            <GithubIcon size={15} />
                          </a>
                        )}
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.title} live demo`}
                            className="flex h-8 items-center gap-1 rounded-md border border-line-strong px-2.5 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
                          >
                            Live <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          {visible.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-line-strong py-16 text-center text-ink-muted">
              Nothing in this category yet — more coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
