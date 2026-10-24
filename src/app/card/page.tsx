import type { Metadata, Viewport } from "next";
import { ArrowUpRight, AtSign, Github, Globe, Linkedin, type LucideIcon } from "lucide-react";
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
  themeColor: "#08090A",
  colorScheme: "dark",
};

type CardLink = {
  icon: LucideIcon;
  label: string;
  kind: string;
  description: string;
  handle: string;
  href: string;
  external: boolean;
};

const LINKS: CardLink[] = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    kind: "Professional",
    description: "Connect professionally",
    handle: "in/puneeth-raj-45682b434",
    href: "https://www.linkedin.com/in/puneeth-raj-45682b434?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    kind: "Code",
    description: "Explore my projects",
    handle: "github.com/pun33th45",
    href: "https://github.com/pun33th45",
    external: true,
  },
  {
    icon: Globe,
    label: "Portfolio",
    kind: "Work",
    description: "See what I build",
    handle: "puneeth-dev.vercel.app",
    href: "https://puneeth-dev.vercel.app/",
    external: true,
  },
  {
    icon: AtSign,
    label: "Email",
    kind: "Direct",
    description: "Get in touch",
    handle: "puneethraaaj@gmail.com",
    href: "mailto:puneethraaaj@gmail.com",
    external: false,
  },
];

const FOCUS = [
  { title: "Software", body: "Building useful applications and engineering projects." },
  { title: "AI / ML", body: "Exploring intelligent systems and practical AI applications." },
  { title: "Experimentation", body: "Learning through building, testing, and iteration." },
];

const TICKER = ["Software Engineering", "AI/ML", "Building Useful Things"];

const pad = (n: number) => String(n).padStart(2, "0");

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

function Rings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      {[60, 100, 140, 180].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} strokeWidth="1" />
      ))}
    </svg>
  );
}

export default function CardPage() {
  return (
    <main className={styles.root}>
      <div aria-hidden="true" className={styles.grain} />

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <span className={styles.monogram}>PR</span>
            <span>Digital Card</span>
          </span>
          <span className={styles.topbarRight}>
            <NfcMark className={styles.nfcSmall} />
            <span>Tap to connect</span>
          </span>
        </header>

        <section className={styles.hero} aria-labelledby="card-name">
          <div className={styles.intro}>
            <p className={`${styles.eyebrow} ${styles.reveal}`} style={{ "--d": "0ms" } as React.CSSProperties}>
              <span className={styles.dot} aria-hidden="true" />
              Software Engineering / AI + ML
            </p>

            <div className={`${styles.id} ${styles.reveal}`} style={{ "--d": "80ms" } as React.CSSProperties}>
              <h1 id="card-name" className={styles.name}>
                Puneeth <span className={styles.nameBreak}>Raj</span>
              </h1>
              <p className={styles.location}>Hyderabad, India</p>
            </div>

            <div className={styles.headlineBlock}>
              <p className={styles.headline}>
                <span className={styles.reveal} style={{ "--d": "160ms" } as React.CSSProperties}>
                  I build
                </span>
                <span className={styles.reveal} style={{ "--d": "240ms" } as React.CSSProperties}>
                  What&apos;s next<span className={styles.accent}>.</span>
                </span>
              </p>
              <span aria-hidden="true" className={styles.rule} />
            </div>

            <p className={`${styles.copy} ${styles.reveal}`} style={{ "--d": "360ms" } as React.CSSProperties}>
              I build software, explore AI/ML, and turn ideas into useful products. Always learning,
              experimenting, and building.
            </p>
          </div>

          <figure className={styles.portrait}>
            <Rings className={styles.rings} />
            <div className={styles.frame}>
              <ProfilePhoto sizes="(min-width: 960px) 440px, 42vw" />
              <span aria-hidden="true" className={`${styles.tick} ${styles.tickTl}`} />
              <span aria-hidden="true" className={`${styles.tick} ${styles.tickBr}`} />
            </div>
            <figcaption className={styles.caption}>
              <span>Fig. 01</span>
              <span>Puneeth Raj</span>
            </figcaption>
          </figure>
        </section>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.trackGroup}>
              {[...TICKER, ...TICKER].map((item, i) => (
                <span key={i} className={styles.tickerItem}>
                  {item}
                  <span className={styles.tickerDot}>•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.shell}>
        <section className={styles.section} aria-labelledby="links-heading">
          <h2 id="links-heading" className={styles.sectionHead}>
            <span className={styles.idx}>(01)</span>
            <span>Find me on the internet</span>
            <span aria-hidden="true" className={styles.hair} />
          </h2>

          <ul className={styles.links}>
            {LINKS.map(({ icon: Icon, label, kind, description, handle, href, external }, i) => (
              <li key={label}>
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
                    <span className={styles.cardHandle}>{handle}</span>
                  </span>
                  <span className={styles.cardSide}>
                    <span className={styles.cardKind}>
                      <span className={styles.idx}>{pad(i + 1)}</span>
                      <span className={styles.kindLabel}> / {kind}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className={styles.arrow} strokeWidth={1.6} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="focus-heading">
          <h2 id="focus-heading" className={styles.sectionHead}>
            <span className={styles.idx}>(02)</span>
            <span>Current focus</span>
            <span aria-hidden="true" className={styles.hair} />
          </h2>

          <ol className={styles.focus}>
            {FOCUS.map(({ title, body }, i) => (
              <li key={title} className={styles.focusItem}>
                <span className={styles.focusNum}>{pad(i + 1)}</span>
                <span className={styles.focusText}>
                  <span className={styles.focusTitle}>{title}</span>
                  <span className={styles.focusBody}>{body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <footer className={styles.footer}>
          <span>Built by Puneeth</span>
          <NfcMark className={styles.nfcSmall} />
        </footer>
      </div>
    </main>
  );
}
