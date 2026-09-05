import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        surface: "#111011",
        "surface-2": "#161415",
        border: "#272123",
        "border-hover": "#504045",
        text: "#f5f2f0",
        muted: "#9a9698",
        accent: "#e8b7c8",
        "accent-soft": "#f3c4d5",
        "accent-ink": "#241019",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
