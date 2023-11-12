/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust this if you're using TypeScript
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ]
}

