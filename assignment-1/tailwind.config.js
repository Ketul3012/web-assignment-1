/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
    },
    extend: {
      colors: {
        backgroundColor: "#f8fafc",
        buttonPrimary: "#415e9c",
        buttonDanger: "#b02a2a",
        footer: "#e5e7eb",
        header: "#ffffff",
        borderColor: "#9ca3af",
        textPrimary: "#415e9c",
        textSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
