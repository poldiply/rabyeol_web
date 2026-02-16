export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandRed: "#E30613",
        darkGray: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  // 요걸 추가하면 다크모드에서도 화이트톤이 유지돼!
  daisyui: {
    themes: ["light"], 
  },
};