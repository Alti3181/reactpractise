// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // required
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
