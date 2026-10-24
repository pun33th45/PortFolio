import type { Metadata, Viewport } from "next";
import {
  ArrowUpRight,
  AtSign,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import ProfilePhoto from "@/components/card/ProfilePhoto";
import styles from "./card.module.css";

const TITLE = "Puneeth Raj | Digital Business Card";
const DESCRIPTION =
  "Connect with Puneeth Raj — software engineering, AI/ML, projects, and professional links.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://puneeth-dev.vercel.app/card" },
  formatDetection: { telephone: false },
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
  themeColor: "#08090A",
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
    href: "https://www.linkedin.com/in/puneeth-raj-45682b434?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
    icon: AtSign,
    label: "Email",
    description: "Get in touch",
    href: "mailto:puneethraaaj@gmail.com",
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    description: "+91 93989 71543",
    href: "tel:+919398971543",
    external: false,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// NFC-style wave mark — decorative only.
function NfcMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="24" r="3" fill="currentColor" stroke="none" />
      <path d="M19 16a11 11 0 0 1 0 16" />
      <path d="M25 10a19 19 0 0 1 0 28" />
      <path d="M31 4a27 27 0 0 1 0 40" />
    </svg>
  );
}

export default function CardPage() {
  return (
    <main className={styles.root}>
      <div aria-hidden="true" className={styles.grain} />

      <div className={styles.column}>
        <header className={styles.profile}>
          <div className={`${styles.photo} ${styles.reveal}`} style={delay(0)}>
            <div className={styles.photoInner}>
              <ProfilePhoto sizes="112px" />
            </div>
          </div>

          <p className={`${styles.eyebrow} ${styles.reveal}`} style={delay(60)}>
            <span className={styles.dot} aria-hidden="true" />
            Software Engineering / AI + ML
          </p>

          <h1 className={`${styles.name} ${styles.reveal}`} style={delay(120)}>
            Puneeth Raj<span className={styles.accent}>.</span>
          </h1>
          <p className={`${styles.title} ${styles.reveal}`} style={delay(160)}>
            Aspiring Software Engineer
          </p>

          <span aria-hidden="true" className={styles.rule} />

          <p className={`${styles.bio} ${styles.reveal}`} style={delay(220)}>
            I turn ideas into software and curiosity into code. Exploring AI/ML, shipping side
            projects, and learning something new with every build.
          </p>

          <p className={`${styles.location} ${styles.reveal}`} style={delay(260)}>
            <MapPin aria-hidden="true" className={styles.pin} />
            Hyderabad, India
          </p>
        </header>

        <nav aria-labelledby="links-heading" className={styles.links}>
          <h2 id="links-heading" className={styles.sectionHead}>
            <span>Find me on the internet</span>
            <span aria-hidden="true" className={styles.hair} />
          </h2>

          <ul className={styles.list}>
            {LINKS.map(({ icon: Icon, label, description, href, external }, i) => (
              <li key={label} className={styles.reveal} style={delay(300 + i * 60)}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${label} — ${description}${external ? " (opens in a new tab)" : ""}`}
                  className={styles.card}
                >
                  <span className={styles.icon}>
                    <Icon aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{label}</span>
                    <span className={styles.cardDesc}>{description}</span>
                  </span>
                  <span className={styles.cardSide}>
                    <span className={styles.num}>{pad(i + 1)}</span>
                    <ArrowUpRight aria-hidden="true" className={styles.arrow} strokeWidth={1.6} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className={styles.footer}>
          <NfcMark className={styles.nfc} />
          <span>Tap to connect · Built by Puneeth</span>
        </footer>
      </div>
    </main>
  );
}
