/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: "",
        secondary: "",
        backgroundColor: "#f8fafc",
        buttonPrimary: "#2563eb",
        buttonDanger: "#ef4444",
        footer: "#e5e7eb",
        header: "#ffffff",
        borderColor: "#9ca3af",
        textPrimary: "#000000",
        textSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
