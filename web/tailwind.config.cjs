const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        fosternation: {
          "primary": "#FFF18D",
          "secondary": "#3b4555",
          "accent": "#DAE1E9",
          "neutral": "#3d4451",
          "base-100": "#DAE1E9",
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