"use client";

import type { CSSProperties } from "react";
import { ArrowRight, Download } from "lucide-react";
import CodeWindow from "@/components/CodeWindow";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { useContactModal } from "@/components/ContactModal";
import { profile, stats } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const heroCode = `const developer = {
  name: "${profile.name}",
  role: "${profile.role}",
  based: "${profile.shortLocation}",
  stack: ["C#", ".NET", "TypeScript", "React", "Node.js"],
  automates: "n8n",
  openTo: ["Full-time", "Remote"],
  ships: true,
};

developer.hire(); // your move`;

export default function Hero() {
  const { open: openContact } = useContactModal();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="hero-in mb-8 flex items-center gap-3" style={d(0)}>
              <span className="font-display text-lg font-semibold">{profile.name}</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="text-ink-muted">{profile.role}</span>
            </div>

            <h1 className="font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem]">
              <span className="line-mask">
                <span style={d(120)}>Software that</span>
              </span>
              <span className="line-mask">
                <span style={d(260)}>
                  <em>holds up.</em>
                </span>
              </span>
            </h1>

            <p className="hero-in mt-7 max-w-[50ch] text-lg leading-relaxed text-ink-muted" style={d(520)}>
              {profile.tagline}
            </p>

            <div className="hero-in mt-9 flex flex-wrap gap-3" style={d(660)}>
              <a href="#work" className="btn btn-primary">
                View my work <ArrowRight size={16} className="nudge" />
              </a>
              <button type="button" onClick={openContact} className="btn btn-ghost">
                Contact me
              </button>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} download className="btn btn-ghost">
                  <Download size={15} /> Resume
                </a>
              )}
            </div>
          </div>

          <div className="hero-in relative" style={d(400)}>
            <CodeWindow code={heroCode} filename="developer.ts" typing />

            <div className="animate-float absolute -bottom-7 -left-3 hidden w-64 rounded-xl border border-line-strong bg-surface p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] sm:block lg:-left-10">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="pulse-ring h-2 w-2 rounded-full bg-accent" />
                Open to full-time &amp; remote roles
              </div>
              <p className="mt-1.5 text-xs text-ink-muted">
                Currently building Windows software in C#/.NET.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-y-8 border-y border-line py-9 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className={i > 0 ? "md:border-l md:border-line md:pl-7" : ""}>
                <div className="font-display text-4xl font-bold sm:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 max-w-[20ch] text-sm text-ink-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
