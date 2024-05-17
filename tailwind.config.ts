import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter Variable', sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
