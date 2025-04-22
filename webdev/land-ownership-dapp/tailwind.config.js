/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
      },
      boxShadow: {
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '16px 16px 0px 0px rgba(0,0,0,1)',
      },
      blur: {
        130: '130px',
        150: '150px',
        180: '180px',
      },
      width: {
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
      },
      height: {
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
      },
    },
  },
  plugins: [],
};
