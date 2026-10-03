"use client";

import { useEffect, useState, type ReactNode } from "react";
import CopyButton from "./CopyButton";

// Tiny purpose-built highlighter — no library needed.
const TOKEN =
  /(\/\/.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(const|let|type|export|function|return|if|else|true|false|null|new|import|from)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Za-z0-9]*)\b|\b([a-zA-Z_]\w*)(?=\()|\b([a-zA-Z_]\w*)(?=\??:)/g;

function Highlighted({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const cls = m[1]
      ? "tok-c"
      : m[2]
        ? "tok-s"
        : m[3]
          ? "tok-k"
          : m[4]
            ? "tok-n"
            : m[5]
              ? "tok-t"
              : m[6] || m[7]
                ? "tok-f"
                : "tok-p";
    out.push(
      <span key={key++} className={cls}>
        {m[0]}
      </span>
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export default function CodeWindow({
  code,
  filename,
  typing = false,
  copyable = false,
  className = "",
}: {
  code: string;
  filename: string;
  typing?: boolean;
  copyable?: boolean;
  className?: string;
}) {
  const [shown, setShown] = useState(typing ? 0 : code.length);

  useEffect(() => {
    if (!typing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      if (reduced) {
        setShown(code.length);
        return;
      }
      i += 1;
      setShown(i);
      if (i < code.length) {
        timer = setTimeout(tick, code[i - 1] === "\n" ? 150 : 16 + (i % 4) * 5);
      }
    };
    timer = setTimeout(tick, 900);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [typing, code]);

  const lines = code.slice(0, shown).split("\n");
  const totalLines = code.split("\n").length;
  const done = shown >= code.length;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-xs text-ink-muted">{filename}</span>
        </div>
        {copyable && <CopyButton text={code} label="Copy code" />}
      </div>

      <pre
        className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]"
        style={{ minHeight: `${totalLines * 1.7 + 2.5}em` }}
        aria-label={`Code sample: ${filename}`}
      >
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              <span
                className="mr-5 w-5 shrink-0 select-none text-right text-ink-muted/50"
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <span className="whitespace-pre">
                <Highlighted text={line} />
                {typing && idx === lines.length - 1 && (
                  <span className={done ? "caret" : "caret !animate-none"} />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
