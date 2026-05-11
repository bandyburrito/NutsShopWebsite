/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        cream: "#f4ecde",
        parchment: "#ebe0c9",
        clay: "#c4825a",
        terracotta: "#a85a3a",
        roast: "#5a3a26",
        bark: "#2d1f15",
        sage: "#7a8265",
        olive: "#5c6448",
      },
    },
  },
  plugins: [],
};
