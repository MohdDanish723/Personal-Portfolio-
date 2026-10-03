import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="08"
          title={
            <>
              How I <em>work</em>
            </>
          }
          intro="A simple loop that keeps projects honest and shippable."
        />

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="border-t border-line-strong pt-6">
                <div className="outline-text font-display text-6xl font-extrabold leading-none">
                  0{i + 1}
                </div>
                <h3 className="mb-2 mt-5 font-display text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
