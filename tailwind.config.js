const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      backgroundImage: {
        "home-cover": "url('assets/home_cover.jpg')",
        "home-cover-portrait": "url('assets/home_cover_portrait.jpg')",
      },
      opacity: {
        6: "0.06",
      },
      spacing: {
        "form-field":
          "calc(" +
          "1.125em + " + // input line-height
          "0.84375em + " + // infix border
          "1em + " + // infix padding
          "0.75em" + // wrapper padding
          ")",
      },
    },
    fontWeight: {
      light: 300,
      semibold: 600,
    },
    minWidth: {
      14: "3.5rem",
    },
    minHeight: {
      0: 0,
      "cover-page": "calc(100vh - 56px)",
      "cover-page-lg": "calc(100vh - 64px)",
      60: "15rem",
    },
  },
  important: true,
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        h4: { fontSize: theme("fontSize.base") },
        h5: { fontSize: theme("fontSize.sm") },
        h6: { fontSize: theme("fontSize.xs") },
      });
    }),
  ],
};
