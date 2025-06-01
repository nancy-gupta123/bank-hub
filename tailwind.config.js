/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        darkgray: '#1A1A1D',
        iconcolor:'#3B1C32',
        cardbody:'#1A1A1D',
        
        // Add your custom color here
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

