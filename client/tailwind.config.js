export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#E8631A",
          dark:   "#1A1208",
          cream:  "#FDF6EC",
          gold:   "#C9A84C",
        },
      },
    },
  },
  plugins: [],
};