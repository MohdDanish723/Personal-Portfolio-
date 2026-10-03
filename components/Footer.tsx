import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="text-sm text-ink-muted">
          <p className="font-display text-base font-semibold text-ink">{profile.name}</p>
          <p className="mt-1">
            © {new Date().getFullYear()} — designed and built by hand with Next.js,
            TypeScript &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={16} /> },
            { href: profile.socials.github, label: "GitHub", icon: <GithubIcon size={16} /> },
            { href: profile.socials.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={16} /> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              {s.icon}
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-sm text-ink-muted transition-colors hover:border-accent hover:text-accent"
          >
            Top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
