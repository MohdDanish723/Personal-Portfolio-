"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Mail, Phone, Send, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/lib/data";

type Ctx = { open: () => void };
const ContactModalContext = createContext<Ctx | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used inside ContactModalProvider");
  return ctx;
}

const field =
  "w-full rounded-lg border border-line-strong bg-bg px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent";

export default function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
  }, []);

  // Escape-to-close, and lock page scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }
  }

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Contact Mohd Danish"
            className="animate-fade-in relative w-full max-w-md rounded-2xl border border-line-strong bg-surface p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <X size={18} />
            </button>

            <h2 className="font-display text-2xl font-bold tracking-tight">Let&apos;s talk</h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              Pick whatever&apos;s easiest — I reply quickly.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <Mail size={15} /> Email
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <Phone size={15} /> Call
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon size={15} /> GitHub
              </a>
            </div>

            <div className="my-5 flex items-center gap-3 text-xs text-ink-muted">
              <span className="h-px flex-1 bg-line" /> or send a message <span className="h-px flex-1 bg-line" />
            </div>

            {status === "sent" ? (
              <div className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-4 text-sm">
                Thanks — that&apos;s on its way. I&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-2.5">
                <input
                  required
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  className={field}
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  className={field}
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Quick message"
                  value={values.message}
                  onChange={(e) => setValues({ ...values, message: e.target.value })}
                  className={`${field} resize-none`}
                />
                <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full justify-center">
                  {status === "sending" ? "Sending…" : (
                    <>
                      Send message <Send size={14} className="nudge" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
