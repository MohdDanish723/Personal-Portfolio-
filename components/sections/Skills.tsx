import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title={
            <>
              The toolbox I <em>reach for</em>
            </>
          }
          intro="A focused stack I know well, rather than a long list of things I've touched once."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 100}>
              <div className="h-full rounded-2xl border border-line bg-surface p-7">
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <p className="mb-6 mt-1 text-sm text-ink-muted">{g.note}</p>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="cursor-default rounded-md border border-line-strong bg-bg px-3 py-1.5 font-mono text-[13px] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
