# Puneeth Raj — AI Developer Portfolio

A futuristic AI developer portfolio built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS**. Features a neon cyberpunk aesthetic with glassmorphism, animated particle backgrounds, scroll-triggered animations, and a fully responsive layout.

---

## Description

This is a personal developer portfolio for Puneeth Raj — a Computer Science student specializing in Artificial Intelligence and Machine Learning. The site showcases projects, skills, work experience, and certifications with a high-end futuristic visual design.

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 15 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS 3.4                        |
| Animations   | Framer Motion 11                        |
| Icons        | Lucide React                            |
| Particles    | tsParticles                             |
| 3D           | Three.js / React Three Fiber            |
| Fonts        | Space Grotesk · Inter · JetBrains Mono  |

---

## Features

- Cinematic loading screen with animated progress bar
- Floating code snippet panels with parallax scroll in Hero
- Scroll-triggered section reveal animations
- Spring-animated navigation with active indicator pill
- Glassmorphism cards with neon glow hover effects
- Animated particle network background
- Custom cursor (pointer devices)
- Fully responsive — mobile, tablet, desktop
- Vercel deployment ready (zero config)

---

## Installation

```bash
git clone https://github.com/pun33th45/portfolio.git
cd portfolio
npm install
```

---

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build

```bash
npm run build
```

Vercel runs this automatically on every push — no manual build step needed.

---

## Deployment

### Vercel (Recommended)

Vercel automatically detects Next.js and deploys with zero configuration.

**Step 1 — Push to GitHub:**

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/pun33th45/portfolio.git
git push -u origin main
```

**Step 2 — Deploy on Vercel:**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import your `portfolio` repository
4. Vercel auto-detects Next.js — no settings to change
5. Click **Deploy**

Your site will be live at: `https://pun33th45-portfolio.vercel.app` (or a custom domain)

Every future `git push` to `main` triggers an automatic redeploy.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Design system, animations, utilities
│   ├── layout.tsx
│   └── page.tsx            # Page composition
└── components/
    ├── LoadingScreen.tsx
    ├── Navigation.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── AIFocus.tsx
    ├── Projects.tsx
    ├── Skills.tsx
    ├── Experience.tsx
    ├── Contact.tsx
    ├── Quote.tsx
    ├── SectionDivider.tsx
    ├── ScrollProgress.tsx
    ├── PremiumCursor.tsx
    └── ParticleNetwork.tsx
```

---

## License

MIT — feel free to fork and adapt for your own portfolio.

---

Built by **Puneeth Raj** — AI & ML Engineer
