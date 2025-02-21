export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Deep Professional Blue (stronger contrast for navbar & buttons)
        secondary: "#1E3A8A", // Rich Dark Blue (for accents & backgrounds)
        accent: "#FACC15", // Bright Yellow Accent (highlights & CTA buttons)
        background: "#F1F5F9", // Soft Cool Gray (better readability & contrast)
        dark: "#111827", // Deep Dark Gray (for footer & mobile menu)
      },
    },
  },
  plugins: [],
};
