import { ArrowUpRight, Award } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { certificates } from "@/lib/data";

export default function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="border-t border-line bg-surface px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          title={
            <>
              Certificates &amp; <em>credentials</em>
            </>
          }
          intro="Formal learning that backs up the hands-on work."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => {
            const body = (
              <SpotlightCard className="group h-full rounded-2xl border border-line bg-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="mb-8 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Award size={21} />
                  </span>
                  {c.url && (
                    <ArrowUpRight
                      size={18}
                      className="text-ink-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  )}
                </div>
                <h3 className="font-display text-lg font-bold leading-snug tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{c.issuer}</p>
                <p className="mt-4 font-mono text-xs text-ink-muted">{c.date}</p>
              </SpotlightCard>
            );
            return (
              <Reveal key={i} delay={i * 90}>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
