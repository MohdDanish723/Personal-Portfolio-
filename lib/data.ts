// ─────────────────────────────────────────────────────────────
// Edit everything about yourself here — the whole site reads
// from this one file. Lines marked "EDIT ME" are placeholders:
// replace them with your real details before you deploy.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Mohd Danish",
  role: "Full-Stack Developer",
  location: "Aligarh, Uttar Pradesh, India",
  shortLocation: "Aligarh, India",
  tagline:
    "I build reliable software — from GST-compliant billing systems to Windows desktop tools and automated workflows.",
  bio: [
    "I'm a full-stack developer who likes software that actually holds up in production: correct numbers on an invoice, forms that don't break, workflows that keep working after I stop watching them.",
    "Day to day I build Windows desktop software in C#/.NET. Outside that, I work across the modern web stack — React, Next.js, Node.js — and I automate the boring parts of any project with n8n.",
    "I'm finishing my BCA, and I like tightly-scoped builds where I can own a problem end to end, from the spec to something a real user can click through.",
  ],
  languages: ["Hindi", "English"],
  openTo: ["Full-time roles", "Remote"],
  email: "Danishbo723@gmail.com",
  phone: "+91 63959 47505",
  socials: {
    github: "https://github.com/MohdDanish723",
    linkedin: "https://www.linkedin.com/in/mohd-danish-b552ab325/",
  },
  resumeUrl: "/resume.pdf",
};

export type Service = { title: string; description: string; tags: string[] };

export const services: Service[] = [
  {
    title: "Full-stack web applications",
    description:
      "End-to-end web apps — React and Next.js on the front, Node.js and PostgreSQL behind them — shaped around how the business really uses them.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Windows desktop software",
    description:
      "Dependable C#/.NET desktop applications built for day-to-day business operations.",
    tags: ["C#", ".NET"],
  },
  {
    title: "APIs & backend systems",
    description:
      "Clean REST APIs with sensible data models, validation, and the unglamorous details — like GST-correct maths — done properly.",
    tags: ["REST APIs", "Express.js", "TypeScript"],
  },
  {
    title: "Workflow & AI automation",
    description:
      "n8n workflows and AI-assisted automations that take repetitive manual steps off a team's plate.",
    tags: ["n8n", "AI automation", "Python"],
  },
  {
    title: "Third-party & API integrations",
    description:
      "Wiring an app up to payment gateways, GST/e-invoice portals, or any external service it needs to talk to — done once, done properly.",
    tags: ["REST APIs", "Webhooks", "n8n"],
  },
  {
    title: "Deployment & ongoing support",
    description:
      "Getting an app live on Vercel or a VPS, then sticking around to fix bugs and ship small improvements as real usage turns things up.",
    tags: ["Vercel", "CI/CD", "Maintenance"],
  },
];

export const experience = [
  {
    date: "Nov 2025 — Present",
    role: "Software Developer",
    org: "Perfect Product Pvt Ltd",
    description:
      "Building Windows desktop software in C#/.NET used in day-to-day business operations.",
  },
  {
    date: "Jun 2025 — Nov 2025",
    role: "Software Developer Intern",
    org: "Sofyrus Technologies",
    description:
      "Six-month internship working on REST APIs and AI-driven workflow automation using n8n.",
  },
];

export const education = [
  {
    date: "2026",
    title: "Bachelor of Computer Applications (BCA)",
    org: "North East Christian University",
  },
  {
    date: "2023",
    title: "Class XII (Mathematics)",
    org: "Uttar Pradesh Board, Aligarh",
  },
];

export type SkillGroup = { title: string; note: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & frameworks",
    note: "What I build interfaces and apps with",
    skills: ["C#", ".NET", "TypeScript", "JavaScript", "React.js", "Next.js","Html", "Css"],
  },
  {
    title: "Backend & data",
    note: "What the apps run on",
    skills: ["Node.js", "Express.js", "PostgreSQL", "REST APIs","SQL"],
  },
  {
    title: "Automation & tooling",
    note: "How I remove repetitive work",
    skills: ["n8n", "AI workflow automation", "Python (ReportLab)"],
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  url?: string;
};

// Add a `url` to make a card clickable — it opens the certificate file.
// Delete the array contents to hide the section.
export const certificates: Certificate[] = [
  {
    title: "Full Stack Web Development Program",
    issuer: "Rolla Academy, Aligarh (with Sofyrus Technologies)",
    date: "Mar 2025",
    url: "/certificates/full-stack-program.pdf",
  },
  {
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "Aug 2026",
    url: "/certificates/ai-tools-workshop.pdf",
  },
  {
    title: "Build Your First Web App with React.js & APIs",
    issuer: "SkillEcted",
    date: "Jan 2025",
    url: "/certificates/react-js-webinar.png",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "Web App" | "Automation" | "Tool";
  preview: "table" | "board" | "doc";
  description: string;
  stack: string[];
  highlights: string[];
  github?: string; // optional — button appears when set
  live?: string; // optional — button appears when set
  // EDIT ME (optional) — drop a real screenshot in /public/projects/ and
  // point this at it (e.g. "/projects/billing.png"). When set, it's used
  // instead of the drawn preview below.
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "inventory-billing-system",
    title: "Inventory Billing System",
    category: "Web App",
    preview: "table",
    description:
      "A full-stack inventory and billing system for Indian businesses, where GST compliance is built into the core rather than bolted on — so the numbers on an invoice are numbers a business can actually file with.",
    stack: ["React", "Node.js", "Express.js", "PostgreSQL"],
    highlights: [
      "Inventory tracking across products and stock levels",
      "GST-compliant invoice generation",
      "Designed for small and mid-size Indian businesses",
    ],
  },
  {
    slug: "leadyfy-os-prototype",
    title: "Leadyfy OS — Prototype",
    category: "Web App",
    preview: "board",
    description:
      "A working prototype of a management SaaS for digital agencies, built end to end from a requirements spec in a single day — from reading the brief to a clickable demo.",
    stack: ["React", "Next.js", "TypeScript"],
    highlights: [
      "Cold requirements document to working demo in 24 hours",
      "Covers leads, content and client management",
    ],
  },
  {
    slug: "automated-resume-builder",
    title: "Automated Resume Builder",
    category: "Automation",
    preview: "doc",
    description:
      "Instead of formatting every resume by hand, I built a small pipeline that generates polished, consistent resumes programmatically in both PDF and Word formats.",
    stack: ["Python", "ReportLab", "Node.js", "docx"],
    highlights: [
      "PDF output via ReportLab, DOCX output via Node.js",
      "Consistent, ATS-friendly formatting every time",
    ],
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Months in a professional dev role" },
  { value: projects.length, suffix: "", label: "Projects built" },
  {
    value: skillGroups.reduce((n, g) => n + g.skills.length, 0),
    suffix: "",
    label: "Technologies I work with",
  },
  { value: 6, suffix: " mo", label: "API & automation internship" },
];

export const process = [
  {
    title: "Understand the problem",
    text: "Get clear on who uses it, what a wrong answer costs, and what 'done' actually means before writing code.",
  },
  {
    title: "Model the data first",
    text: "Money, stock and state get designed properly up front — the UI is easy once the foundations are right.",
  },
  {
    title: "Build in small, checked steps",
    text: "Ship thin working slices, verify each one, and keep the app runnable at every point.",
  },
  {
    title: "Ship and stay accountable",
    text: "Deploy, watch how it behaves for real users, and fix what real use turns up.",
  },
];

export const faqs = [
  {
    q: "What kind of role are you looking for?",
    a: "Full-stack developer roles. I'm strongest with C#/.NET and the React / Node.js stack, and I enjoy owning features end to end.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "I'm based in Aligarh, Uttar Pradesh. I'm open to remote roles, and to hybrid or on-site work in the Delhi-NCR region such as Noida.",
  },
  {
    q: "What have you actually built?",
    a: "A GST-compliant inventory and billing system, a 24-hour SaaS prototype for agency management, and a resume-generation pipeline — plus Windows desktop software professionally in C#/.NET.",
  },
  {
    q: "What's the best way to reach you?",
    a: "Use the contact form below or email me directly — I'll reply as soon as I can.",
  },
];
