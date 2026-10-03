import Reveal from "@/components/Reveal";
import ScrollFill from "@/components/ScrollFill";
import SectionHeading from "@/components/SectionHeading";
import { education, experience } from "@/lib/data";

type Item = { date: string; title: string; org: string; text?: string };

function Timeline({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <div>
      <h3 className="mb-8 font-display text-xl font-semibold">{heading}</h3>
      <div className="relative pl-8">
        <div className="timeline-line" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
                <span className="font-mono text-xs text-ink-muted">{it.date}</span>
                <h4 className="mt-1.5 font-display text-xl font-bold tracking-tight">{it.title}</h4>
                <p className="mt-0.5 text-sm text-accent-2">{it.org}</p>
                {it.text && (
                  <p className="mt-3 max-w-[52ch] text-ink-muted">{it.text}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          title={
            <>
              The <em>journey</em> so far
            </>
          }
          intro="Where I've worked, what I've studied, and how it stacks up."
        />

        <ScrollFill className="grid gap-16 md:grid-cols-2">
          <Timeline
            heading="Experience"
            items={experience.map((e) => ({
              date: e.date,
              title: e.role,
              org: e.org,
              text: e.description,
            }))}
          />
          <Timeline
            heading="Education"
            items={education.map((e) => ({
              date: e.date,
              title: e.title,
              org: e.org,
            }))}
          />
        </ScrollFill>
      </div>
    </section>
  );
}
