import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          blue:   "#2563EB",
          cyan:   "#06B6D4",
          purple: "#8B5CF6",
          green:  "#10B981",
        },
        bg: {
          base: "#07070A",
          card: "rgba(255,255,255,0.035)",
          border: "rgba(255,255,255,0.08)",
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
