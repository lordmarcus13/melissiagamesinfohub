import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        foreground: "#D2D2D2",
        bdo: {
          gold: "#C69C6D",
          goldDark: "#E5C298",
          crimson: "#DC143C",
          blue: "#00E5FF",
          dark: "#080808",
          surface: "rgba(22, 22, 22, 0.85)",
          gray: "#1e1e1e",
          border: "#2A2A2A",
          muted: "#777777",
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
      animation: {
        'glow-pulse': 'glow 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
