/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      // fontFamily:{
      //   sans: ['Roboto','sans-serif'],
      // },
      colors: {
        'aksen': '#029EFF',
      }
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui"),
  function({addUtilities}){
   const newUnilities = {
    ".no-scrollbar::-webkit-scrollbar":{
      display:"none"
    },
    ".no-scrollbar":{
      "-ms-overflow-style":"none",
      "scrollbar-width":"none"
    }
   }
   addUtilities(newUnilities)
  }
],
}