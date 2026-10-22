import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f2ff",
          200: "#bfe9ff",
          300: "#8fdcff",
          400: "#5ac8ff",
          500: "#20a9ff",
          600: "#0b8fe8",
          700: "#0d72bf",
          800: "#125d99",
          900: "#144e7f",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
