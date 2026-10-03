"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useContactModal } from "./ContactModal";
import { profile } from "@/lib/data";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "certificates", label: "Certificates" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { open: openContact } = useContactModal();

  // Scroll-spy: highlight the link for the section currently in view.
  useEffect(() => {
    const els = [...links.map((l) => l.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-accent-ink">
            {profile.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="font-display text-base font-semibold">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
                  isActive
                    ? "text-ink after:scale-x-100"
                    : "text-ink-muted after:scale-x-0"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !py-2.5 sm:inline-flex" onClick={(e) => { e.preventDefault(); openContact(); }}>
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              style={{ "--d": `${i * 45}ms` } as CSSProperties}
              className="hero-in flex items-center justify-between border-b border-line py-3.5 font-display text-xl"
            >
              {l.label}
              <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
            style={{ "--d": `${links.length * 45}ms` } as CSSProperties}
            className="hero-in flex w-full items-center justify-between py-3.5 text-left font-display text-xl text-accent"
          >
            Contact
            <span className="font-mono text-xs text-ink-muted">0{links.length + 1}</span>
          </button>
        </nav>
      )}
    </header>
  );
}
