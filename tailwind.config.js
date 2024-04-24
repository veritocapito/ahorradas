/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        teal: "#2dd4bf",
        "light-teal": "#99f6e4",
        "dark-teal": "#14b8a6",
        "light-grey": "#f1f5f9",
        black: "#3f3f46",
        green: "#22c55e",
        red: "#e11d48",
        blue: "#2563eb",
        bgwhite: "#f6f6f6",
      },
      width: {
        tamtarj: "40rem",
      },
    },
    plugins: [],
  },
};
