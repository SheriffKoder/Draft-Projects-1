import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    screens: {
      'sm': '360px',
      // => @media (min-width: 640px) { ... }

      'md': '470px',
      // => @media (min-width: 768px) { ... }

      'md2': '850px',
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      brightness: {
        '10': "0.1"
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-orange': '#FF5722',
        'text-accent-bright': '#a82b4b',
        'text-accent-dark': '#912540',
        'theme-text-brightest': '#ea003b',
        'theme-text-brighter': '#d60035ea',
        'theme-text-bright': '#d6003580',
        'theme-text-dark': '#cc2750d3'
      },
    },
  },
  plugins: [],
};
export default config;
