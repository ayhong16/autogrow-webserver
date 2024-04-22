/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#258239",
        lightGreen: "#dae9dd",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
