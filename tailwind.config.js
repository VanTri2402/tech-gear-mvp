/* eslint-disable @typescript-eslint/no-require-imports */
// file: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  // ...
};
