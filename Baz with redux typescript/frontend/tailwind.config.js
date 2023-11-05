/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      colors: {
        baz: {
          black: '#0A0A0A',
          white: '#F9F8F8',
          danger: '#F95738',
          success: '#566E3D',
          premium: '#B9A44C',
        },
      },
      fontFamily: {
        baz1: ['Poppins', ...defaultTheme.fontFamily.sans],
        baz2: ['Zilla Slab', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        adminHero: ['32px', '48px'],
        adminSelect: ['20px', '30px'],
      },
    },
  },
  plugins: [],
};
