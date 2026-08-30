/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#21201d',
        muted: '#88857f',
        line: '#dfdbd1',
        paper: '#fbfaf7',
        accent: '#df684a',
        brandCream: '#f4f0e8',
        coral: '#df684a',
        blue: '#5b8cbf',
        gold: '#c9a84c',
        mint: '#7cb97a',
        plum: '#8e6fa5',
        orange: '#d4915e',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
