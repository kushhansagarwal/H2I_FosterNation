const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        fosternation: {
          "primary": "#7AC5FF",
          "secondary": "#FFFDFA",
          "accent": "#DAE1E9",
          "neutral": "#3d4451",
          "base-100": "#FFFDFA",
        },
      },
      "dark",
      "cupcake",
    ],
  },

  theme: {
    extend: {}
  },

  plugins: [daisyui]
};

module.exports = config;