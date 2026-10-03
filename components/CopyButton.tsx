"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
