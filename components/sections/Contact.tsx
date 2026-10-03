"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { profile } from "@/lib/data";

type Errors = { name?: string; email?: string; message?: string };

const field =
  "w-full rounded-lg border border-line-strong bg-bg px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-muted/50 focus:border-accent";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  const links = [
    { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: profile.phone, icon: <Phone size={16} /> },
    { href: profile.socials.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={16} />, external: true },
    { href: profile.socials.github, label: "GitHub", icon: <GithubIcon size={16} />, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr]">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs text-accent">10</span>
              <span className="h-px w-10 bg-line-strong" />
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Let&apos;s build something that <em>holds up.</em>
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-muted">
              Hiring for a full-stack role, or have a project in mind? Send a
              message — I read every one.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 rounded-2xl border border-line-strong bg-surface p-4">
              <Mail size={18} className="text-accent" />
              <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate font-medium hover:text-accent">
                {profile.email}
              </a>
              <CopyButton text={profile.email} label="Copy email" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-sm text-ink-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {l.icon} {l.label}
                </a>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
              <MapPin size={15} className="text-accent" /> {profile.location} — open to remote work.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <SpotlightCard className="rounded-2xl border border-line-strong bg-surface p-7 sm:p-9">
              {sent ? (
                <div className="py-6">
                  <p className="font-display text-2xl font-bold">Your email app should be open.</p>
                  <p className="mt-3 text-ink-muted">
                    If nothing opened, write to me directly at{" "}
                    <a href={`mailto:${profile.email}`} className="text-accent underline">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setValues({ name: "", email: "", message: "" });
                    }}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  <h3 className="font-display text-xl font-bold">Send a message</h3>
                  {(
                    [
                      ["name", "Your name", "text"],
                      ["email", "Email address", "email"],
                    ] as const
                  ).map(([key, label, type]) => (
                    <div key={key}>
                      <label htmlFor={key} className="mb-1.5 block text-sm text-ink-muted">
                        {label}
                      </label>
                      <input
                        id={key}
                        type={type}
                        value={values[key]}
                        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                        className={field}
                      />
                      {errors[key] && <p className="mt-1.5 text-xs text-red-400">{errors[key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm text-ink-muted">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      className={`${field} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={sending} className="btn btn-primary self-start">
                    {sending ? "Sending…" : (
                      <>
                        Send message <ArrowRight size={16} className="nudge" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
