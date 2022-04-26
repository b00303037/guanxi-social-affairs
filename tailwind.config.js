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
    minHeight: {
      "cover-page": "calc(100vh - 56px)",
      "cover-page-lg": "calc(100vh - 64px)",
      60: "15rem",
    },
  },
  important: true,
  plugins: [require("@tailwindcss/line-clamp")],
};
