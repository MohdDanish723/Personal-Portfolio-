import { Check } from "lucide-react";
import CodeWindow from "@/components/CodeWindow";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const gstCode = `type Supply = "intra-state" | "inter-state";

export function gstBreakup(taxable: number, ratePct: number, supply: Supply) {
  // Work in paise so floating point never leaks into an invoice.
  const paise = Math.round(taxable * 100);
  const tax = Math.round((paise * ratePct) / 100);
  const total = (paise + tax) / 100;

  if (supply === "inter-state") {
    return { igst: tax / 100, total };
  }

  const cgst = Math.floor(tax / 2);
  const sgst = tax - cgst; // an odd paisa never disappears
  return { cgst: cgst / 100, sgst: sgst / 100, total };
}`;

const points = [
  "Money is handled as whole paise — no 0.1 + 0.2 surprises on an invoice.",
  "Intra-state sales split into CGST + SGST; inter-state sales use IGST.",
  "Odd paise are accounted for, so the parts always add up to the whole.",
];

export default function CodeSample() {
  return (
    <section id="code" className="border-t border-line bg-surface px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          title={
            <>
              Correctness is a <em>feature</em>
            </>
          }
          intro="A small, illustrative example of the care billing code needs — the kind of detail I like to get right."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <ul className="space-y-5">
              {points.map((p) => (
                <li key={p} className="flex gap-3.5 text-ink-muted">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <CodeWindow code={gstCode} filename="gst.ts" copyable />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
