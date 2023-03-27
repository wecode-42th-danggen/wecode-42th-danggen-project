/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
        176: '44rem',
        224: '56rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
