/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  variants: { textColor: ['group-hover'], extend: {} },
  theme: {
    screens: {
      smallMobile: '300px',
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      colors: {},
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        Bricolage: ['Bricolage Grotesque', ...defaultTheme.fontFamily.serif],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        satoshi: ['Satoshi', defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
