import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#fff7e8",
        sandal: "#e8cf9f",
        antique: "#c59f5a",
        royal: "#3b2118",
        mehendi: "#1f5c4a",
        amberglow: "#f2b760",
        pomegranate: "#7f2635",
        ink: "#211613",
      },
      fontFamily: {
        display: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        royal: "0 28px 90px rgba(59, 33, 24, 0.22)",
        gold: "0 0 48px rgba(242, 183, 96, 0.42)",
      },
      backgroundImage: {
        jali: "radial-gradient(circle at 1px 1px, rgba(197,159,90,.28) 1px, transparent 0)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-110%)" },
          "100%": { transform: "translateX(110%)" },
        },
        floatDust: {
          "0%, 100%": { transform: "translate3d(0,0,0)", opacity: ".32" },
          "50%": { transform: "translate3d(10px,-18px,0)", opacity: ".68" },
        },
      },
      animation: {
        shimmer: "shimmer 4s ease-in-out infinite",
        floatDust: "floatDust 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
