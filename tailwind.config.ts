import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        kimi: {
          black: "#050505",
          panel: "#101010",
          raised: "#181818",
          border: "#3a3a3a",
          text: "#f5f5f0",
          muted: "#a3a3a3",
          dim: "#696969",
          green: "#89ffb2",
          amber: "#f0e4bf",
        },
      },
      fontFamily: {
        pixel: ['"Fusion Pixel"', '"Press Start 2P"', "monospace"],
      },
      boxShadow: {
        pixel: "6px 6px 0 #000",
        glow: "0 0 36px rgba(137, 255, 178, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
