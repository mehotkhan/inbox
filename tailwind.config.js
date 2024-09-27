module.exports = {
  darkMode: "class", // Use class-based dark mode for better control
  mode: "jit", // Just-In-Time mode for faster builds
  attributify: false,
  extract: {
    include: [
      "./components/**/*.{vue,js}",
      "./composables/**/*.{js,ts}",
      "./content/**/*.md",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./utils/**/*.{js,ts}",
      "./app.vue",
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'FarhangDot',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontWeight: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // Use responsive padding
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },
      colors: {
        primary: '#1D4ED8', // Example primary color
        secondary: '#3B82F6', // Example secondary color
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  safelist: [],
  shortcuts: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"), // Add animation plugin for transitions
    require("tailwindcss-children"), // Plugin to style child elements easily
  ],
};
