/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",             // seu código
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require("tw-animate-css/plugin"),
  ],
  optimizeDeps: {
    include: [
      "flowbite-react",
      "flowbite",
      "react-icons/hi"
    ],
  },
};
