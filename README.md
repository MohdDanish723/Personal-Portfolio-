<<<<<<< HEAD
# Mohd Danish — Portfolio

A one-page personal portfolio built with Next.js (App Router), TypeScript and
Tailwind CSS v4. Everything on it works out of the box, including a real
backend that emails you when someone submits the contact form.

## What's on the page

Hero (typing code terminal, count-up stats) → About (bento) → Services →
Skills → Code sample (copy button) → Projects (filters, image-ready) →
Journey (scroll-drawn timeline) → Certificates → How I work → Recruiter FAQ →
Contact (form + copy-email).

"Let's talk", "Contact me" and the floating "Say hello" button all open a
quick-contact popup (email / call / LinkedIn / GitHub + a mini message form)
instead of jumping down the page. The full contact section still lives at the
bottom of the page (reachable from the footer) for anyone who scrolls that far.

## Get contact-form emails in your inbox (2 minutes)

The contact form (and the popup's mini form) posts to `/api/contact`, which
sends you a real email using [Resend](https://resend.com) — no server to run.

1. Sign up free at resend.com (use **Danishbo723@gmail.com**)
2. Dashboard → **API Keys** → create one, copy it
3. Create a file named `.env.local` in the project root:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
4. On Vercel, add the same `RESEND_API_KEY` under **Project Settings → Environment Variables**

Without a key, the form still works — it just falls back to opening the
visitor's own email app instead of emailing you directly.

## Edit your info — one file

Everything lives in `lib/data.ts`. A few optional things worth knowing:

- **certificates** — replace the placeholder titles/issuers/dates; add `url` to make a card clickable; empty the array to hide the section
- **resumeUrl** — put your PDF at `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`; a Download button appears in the hero
- **projects** — add `github` / `live` links, or an `image` (e.g. `/projects/billing.png` in `public/projects/`) to show a real screenshot instead of the drawn preview

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
git init && git add . && git commit -m "Portfolio"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then on vercel.com: **New Project → import the repo → add `RESEND_API_KEY` → Deploy**
(Next.js is auto-detected).

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · next-themes · lucide-react · Resend
Fonts: Syne, DM Sans, JetBrains Mono, Instrument Serif (Google Fonts)
=======
# Personal-Portfolio-
>>>>>>> 13e58b915cbeb1bfc8936f71437113c7b088b5f9
