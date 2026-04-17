/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous", "sans-serif"],
        jersey: ["Jersey", "sans-serif"],
      },
      colors: {
        spotify: {
          green: "#1DB954",
          black: "#121212",
          dark: "#181818",
          gray: "#282828",
          light: "#b3b3b3",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        heartbeat: "heartbeat 1.5s infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "5%": { transform: "scale(1.2)" },
          "10%": { transform: "scale(1.1)" },
          "15%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
