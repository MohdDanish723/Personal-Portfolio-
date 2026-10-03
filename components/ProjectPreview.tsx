// Stylised, premium-looking UI mock-ups drawn entirely in SVG — used when a
// project has no real screenshot yet. They read theme tokens, so they follow
// light/dark automatically. Add a real screenshot via `image` in lib/data.ts
// to replace one of these outright.
import type { ReactNode } from "react";

type Variant = "table" | "board" | "doc";

const chipRow = (x: number, y: number, w: number[], color: string) => (
  <g key={`${x}-${y}`}>
    {w.reduce<{ els: ReactNode[]; cx: number }>(
      (acc, ww, i) => {
        acc.els.push(
          <rect
            key={i}
            x={acc.cx}
            y={y}
            width={ww}
            height={6}
            rx={3}
            fill={i === w.length - 1 ? color : "var(--line-strong)"}
          />
        );
        acc.cx += ww + 10;
        return acc;
      },
      { els: [], cx: x }
    ).els}
  </g>
);

export default function ProjectPreview({ variant }: { variant: Variant }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      role="img"
      aria-label={`${variant} interface preview`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="bar-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#bg-${variant})`} />
      <g stroke="var(--line)" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
      </g>

      {/* window chrome */}
      <rect x="34" y="22" width="332" height="182" rx="12" fill="var(--surface)" stroke="var(--line-strong)" />
      <rect x="34" y="22" width="332" height="26" rx="12" fill="var(--surface-2)" />
      <rect x="34" y="36" width="332" height="12" fill="var(--surface-2)" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
        <circle key={c} cx={52 + i * 11} cy="35" r="3.2" fill={c} opacity="0.85" />
      ))}
      <rect x="150" y="30" width="150" height="10" rx="5" fill="var(--line)" />

      {variant === "table" && (
        <g>
          <rect x="50" y="66" width="90" height="9" rx="4" fill="var(--ink)" opacity="0.8" />
          <rect x="292" y="62" width="58" height="17" rx="8" fill="url(#bar-grad)" />
          <text x="321" y="74" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--accent-ink)">
            + New
          </text>

          <rect x="50" y="90" width="300" height="18" rx="5" fill="var(--surface-2)" />
          {["ITEM", "QTY", "GST", "TOTAL"].map((_, i) => (
            <rect key={i} x={58 + i * 74} y="96" width={i === 3 ? 40 : 28} height="5" rx="2.5" fill="var(--ink-muted)" opacity="0.6" />
          ))}

          {[0, 1, 2, 3].map((i) => (
            <g key={i} opacity={i === 3 ? 0.5 : 1}>
              <rect x="50" y={116 + i * 21} width="300" height="17" rx="4" fill={i % 2 ? "transparent" : "var(--surface-2)"} opacity="0.5" />
              {chipRow(58, 121 + i * 21, [46, 20, 24, 30], i === 1 ? "var(--accent)" : "var(--line-strong)")}
            </g>
          ))}
        </g>
      )}

      {variant === "board" && (
        <g>
          <rect x="50" y="66" width="70" height="9" rx="4" fill="var(--ink)" opacity="0.8" />
          {["To do", "In progress", "Done"].map((_, col) => (
            <g key={col}>
              <rect
                x={50 + col * 102}
                y="86"
                width="92"
                height="106"
                rx="8"
                fill="var(--surface-2)"
                stroke="var(--line)"
              />
              <circle cx={62 + col * 102} cy="98" r="3" fill={col === 1 ? "var(--accent)" : "var(--line-strong)"} />
              <rect x={70 + col * 102} y="95" width="34" height="6" rx="3" fill="var(--ink)" opacity="0.6" />

              {[0, 1, 2].slice(0, col === 1 ? 2 : 3).map((c) => (
                <g key={c}>
                  <rect
                    x={58 + col * 102}
                    y={112 + c * 32}
                    width="76"
                    height="26"
                    rx="6"
                    fill="var(--surface)"
                    stroke={col === 1 && c === 0 ? "var(--accent)" : "var(--line-strong)"}
                    strokeWidth={col === 1 && c === 0 ? 1.4 : 1}
                  />
                  <rect x={64 + col * 102} y={118 + c * 32} width={col === 1 && c === 0 ? 44 : 54} height="4.5" rx="2.25" fill="var(--line-strong)" />
                  <circle cx={124 + col * 102} cy={131 + c * 32} r="4.5" fill="var(--accent-2)" opacity="0.7" />
                </g>
              ))}
            </g>
          ))}
        </g>
      )}

      {variant === "doc" && (
        <g>
          <rect x="50" y="66" width="80" height="9" rx="4" fill="var(--ink)" opacity="0.8" />
          <rect x="278" y="62" width="72" height="17" rx="8" fill="url(#bar-grad)" />
          <text x="314" y="74" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--accent-ink)">
            Generate
          </text>

          {[0, 1].map((doc) => (
            <g key={doc}>
              <rect
                x={50 + doc * 152}
                y="90"
                width="140"
                height="102"
                rx="6"
                fill="var(--surface)"
                stroke={doc === 0 ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={doc === 0 ? 1.4 : 1}
              />
              <rect x={62 + doc * 152} y="102" width="52" height="8" rx="4" fill={doc === 0 ? "var(--accent)" : "var(--ink)"} opacity={doc === 0 ? 1 : 0.6} />
              <circle cx={168 + doc * 152} cy="106" r="9" fill="var(--surface-2)" stroke="var(--line-strong)" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect
                  key={i}
                  x={62 + doc * 152}
                  y={122 + i * 9}
                  width={i % 3 === 2 ? 60 : 116}
                  height="4.5"
                  rx="2.25"
                  fill="var(--line-strong)"
                />
              ))}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
