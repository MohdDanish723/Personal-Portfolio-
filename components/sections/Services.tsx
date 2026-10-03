import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          title={
            <>
              What I can <em>build</em> for you
            </>
          }
          intro="Four things I do well — from a polished web app to a desktop tool to the automation that quietly ties them together."
        />

        <div className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="group grid gap-4 py-9 transition-all duration-300 md:grid-cols-[4rem_1.1fr_1.5fr_auto] md:items-center md:gap-8 md:hover:pl-3">
                <span className="font-mono text-sm text-ink-muted">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent">
                  {s.title}
                </h3>
                <div>
                  <p className="max-w-[54ch] text-ink-muted">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-xs text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={22}
                  className="hidden text-ink-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
