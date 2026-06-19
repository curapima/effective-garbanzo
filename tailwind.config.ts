import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// REBUILD TRIGGER: Force Tailwind theme reload configuration
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kimi: {
          black: "var(--color-bg-base)",
          panel: "var(--color-bg-panel)",
          raised: "var(--color-bg-raised)",
          border: "var(--color-border)",
          text: "var(--color-text-main)",
          muted: "var(--color-text-muted)",
          dim: "var(--color-text-dim)",
          green: "var(--color-primary)",
          amber: "var(--color-code-text)",
        },
      },
      fontFamily: {
        pixel: ['"Fusion Pixel 12px Mono"', "monospace"],
      },
      boxShadow: {
        pixel: "6px 6px 0 var(--color-text-main)",
        glow: "0 0 36px var(--color-primary-glow)",
      },
    },
  },
  plugins: [typography],
};

export default config;
