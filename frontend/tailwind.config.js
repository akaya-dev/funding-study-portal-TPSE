/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        uil: {
          bg: '#F3F5F6',
          mint: '#E6F4F1',
          teal: '#0D6E5B',
          tealHover: '#095445',
        }
      }
    },
  },
  plugins: [],
};
