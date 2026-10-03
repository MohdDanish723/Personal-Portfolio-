import { GraduationCap, MapPin, Terminal } from "lucide-react";
import LiveClock from "@/components/LiveClock";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { profile } from "@/lib/data";

const card = "rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong";

export default function About() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          title={
            <>
              A developer who cares how it <em>behaves</em>
            </>
          }
          intro="Less about clever stacks, more about whether the thing holds up for the person running a business on it."
        />

        <div className="grid gap-4 lg:grid-cols-6">
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <SpotlightCard className={`${card} h-full p-8`}>
              <h3 className="mb-5 font-display text-xl font-semibold">The short version</h3>
              <div className="space-y-4 text-ink-muted">
                {profile.bio.map((p, i) => (
                  <p key={i} className="max-w-[62ch] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <SpotlightCard className={`${card} h-full`}>
              <div className="mb-3 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin size={15} className="text-accent" /> Based in
              </div>
              <p className="font-display text-lg font-semibold">{profile.location}</p>
              <p className="mt-3 text-sm text-ink-muted">
                Local time <LiveClock />
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-2">
            <SpotlightCard className={`${card} h-full`}>
              <div className="mb-3 flex items-center gap-2 text-sm text-ink-muted">
                <Terminal size={15} className="text-accent" /> Right now
              </div>
              <p className="font-display text-lg font-semibold">Software Developer</p>
              <p className="mt-1 text-sm text-ink-muted">
                Perfect Product Pvt Ltd — Windows desktop software in C#/.NET.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <SpotlightCard className={`${card} h-full`}>
              <div className="mb-3 flex items-center gap-2 text-sm text-ink-muted">
                <GraduationCap size={15} className="text-accent" /> Studying
              </div>
              <p className="font-display text-lg font-semibold">BCA — 2026</p>
              <p className="mt-1 text-sm text-ink-muted">North East Christian University</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-3">
            <SpotlightCard className={`${card} h-full`}>
              <div className="mb-3 text-sm text-ink-muted">Open to &amp; speaks</div>
              <div className="flex flex-wrap gap-2">
                {[...profile.openTo, ...profile.languages].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line-strong px-2.5 py-1 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
