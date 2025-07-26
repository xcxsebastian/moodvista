/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mood1: '#FCA5A5', // soft red
        mood2: '#FDBA74', // orange
        mood3: '#FDE68A', // yellow
        mood4: '#A7F3D0', // mint
        mood5: '#93C5FD', // blue
              'blue-50': '#eff6ff',
      'green-50': '#ecfdf5',
      'orange-50': '#fff7ed',
      }
    }
  },
  plugins: [],
}
