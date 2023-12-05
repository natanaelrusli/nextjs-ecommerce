import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00b5ff",
          secondary: "#db7900",
          accent: "#003cff",
          neutral: "#070707",
          "base-100": "#fff5f3",
          info: "#0077f6",
          success: "#00cd98",
          warning: "#ffae00",
          error: "#ff6486",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};
export default config;
