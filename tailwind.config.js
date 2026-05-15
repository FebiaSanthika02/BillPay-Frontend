/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
        display: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-lg": ["3.75rem", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" }],
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px -20px rgba(0,0,0,0.35)",
        "glass-light": "0 0 0 1px rgba(15,23,42,0.06), 0 4px 24px -4px rgba(15,23,42,0.08)",
        glow: "0 0 0 1px rgba(37,99,235,0.2), 0 0 40px -8px rgba(37,99,235,0.25)",
        "glow-blue": "0 0 0 1px rgba(37,99,235,0.2), 0 0 40px -8px rgba(37,99,235,0.25)",
        neo: "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)",
        "neo-light":
          "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "chart-line": "chartLine 2.2s ease-out forwards",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        chartLine: {
          "0%": { strokeDashoffset: "640" },
          "100%": { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
