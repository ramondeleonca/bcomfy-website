/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heavitas: "Heavitas",
        nexa: "Nexa",
        rounded: "Simply Rounded",
        nunito: "Nunito Sans Variable",
        montserrat: "Montserrat"
      }
    },
  },
  plugins: [],
}