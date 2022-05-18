module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'midnight-blue': '#005288',
      'metallic-silver': '#A7A9AC',
      'slate-300': 'rgb(203 213 225)'
    },
    screens: {
      'sm': {'min': '320px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1024px'},
    },
    extend: {},
  },
  plugins: [],
}