/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/background.jpg')",
      }
    },
  },
  plugins: [
	daisyui,
function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For Webkit browsers */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none',             /* Webkit browsers */
          },
        },
      });
    },
],
}

