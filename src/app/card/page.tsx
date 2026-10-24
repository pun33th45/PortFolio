import type { Metadata, Viewport } from "next";
import { ArrowUpRight, Github, Globe, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import ProfilePhoto from "@/components/card/ProfilePhoto";
import styles from "./card.module.css";

const TITLE = "Puneeth Raj | Digital Business Card";
const DESCRIPTION =
  "Connect with Puneeth Raj — software engineering, AI/ML, projects, and professional links.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://puneeth-dev.vercel.app/card" },
  openGraph: {
    type: "profile",
    url: "https://puneeth-dev.vercel.app/card",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Puneeth Raj Portfolio",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
};

type CardLink = {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
  external: boolean;
};

const LINKS: CardLink[] = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/puneeth-raj-45682b434",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    description: "Explore my projects",
    href: "https://github.com/pun33th45",
    external: true,
  },
  {
    icon: Globe,
    label: "Portfolio",
    description: "See what I build",
    href: "https://puneeth-dev.vercel.app/",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    description: "Get in touch",
    href: "mailto:puneethraaaj@gmail.com",
    external: false,
  },
];

export default function CardPage() {
  return (
    <main
      className={`${styles.root} min-h-[100svh] bg-[#0B0B0D] px-4 py-10 text-white sm:px-6 sm:py-16`}
      style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      <div className="mx-auto flex w-full max-w-[460px] flex-col">
        <header className="flex flex-col items-center text-center">
          <ProfilePhoto />

          <h1 className="mt-5 text-[1.75rem] font-semibold leading-tight tracking-tight">
            Puneeth Raj
          </h1>
          <p className="mt-1 text-[0.95rem] font-medium text-white/90">Aspiring Software Engineer</p>

          <p className="mt-2 inline-flex items-center gap-1 text-[0.8rem] text-[#A5A5AE]">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            Hyderabad, India
          </p>

          <p className="mt-5 max-w-[36ch] text-[0.95rem] leading-relaxed text-[#A5A5AE]">
            I build software, explore AI/ML, and turn ideas into useful products. Always learning,
            experimenting, and building.
          </p>

          <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#A5A5AE]">
            Software · AI/ML · Building
          </p>
        </header>

        <nav aria-label="Contact and social links" className="mt-9">
          <ul className="flex flex-col gap-3">
            {LINKS.map(({ icon: Icon, label, description, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${label} — ${description}${external ? " (opens in a new tab)" : ""}`}
                  className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-[#2A2A30] bg-[#19191D] px-4 py-3.5 outline-none transition duration-200 ease-out hover:border-[#3A3A42] hover:bg-[#1E1E23] focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] active:scale-[0.99] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2A2A30] bg-[#0B0B0D] text-white">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[0.98rem] font-medium leading-snug">{label}</span>
                    <span className="text-[0.83rem] leading-snug text-[#A5A5AE]">{description}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-[18px] w-[18px] shrink-0 text-[#A5A5AE] transition duration-200 group-hover:text-white motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="mt-10 text-center text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#A5A5AE]/80">
          Tap to connect · Built by Puneeth
        </footer>
      </div>
    </main>
  );
}
