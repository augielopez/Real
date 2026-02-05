/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts}", "./public/**/*.json"],
  plugins: [PrimeUI],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient": "var(--gradient-background)",
        "main-gradient-to-top": "var(--gradient-background-to-top)",
        "main-gradient-to-left": "var(--gradient-background-to-left)",
      },
      borderRadius: {
        "4xl": "2rem",
        "2.5xl": "1.25rem",
      },
      boxShadow: {
        card: "var(--card-shadow)",
        "black-card": "var(--black-card-shadow)",
        "blue-card": "var(--blue-card-shadow)",
        stroke: "var(--stroke-shadow)",
      },
      opacity: {
        1: "0.01",
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        16: "0.16",
        24: "0.24",
        32: "0.32",
        56: "0.56",
        64: "0.64",
        72: "0.72",
        88: "0.88",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      fontSize: {
        "8xl": "6rem",
      },
      gap: {
        18: "4.5rem",
      },
      width: {
        18: "4.5rem",
      },
      height: {
        18: "4.5rem",
      },
      margin: {
        18: "4.5rem",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "cloud-idle": "cloud-idle 60s infinite alternate",
        slidefadein: "slidefadein 500ms ease",
        slidefadeinright: "slidefadeinright 500ms ease",
        slidefadeinleft: "slidefadeinleft 500ms ease",
        zoomfadein: "zoomfadein 500ms ease-in-out",
      },
      animationDuration: {
        600: "600ms",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "cloud-idle": {
          "25%": { transform: "translate3d(80px, 0, 0)" },
          "50%": { transform: "translate3d(75px, -20px, 0)" },
          "75%": { transform: "translate3d(55px, 25px, 0) " },
          "100%": { transform: "translate3d(35px, -15px, 0) " },
        },
        slidefadein: {
          from: {
            opacity: "0",
            transform: "translateY(-6rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slidefadeinright: {
          from: {
            opacity: "0",
            transform: "translateX(8rem)",
          },
          to: {
            opacity: "1",
            transform: "translatex(0)",
          },
        },
        slidefadeinleft: {
          from: {
            opacity: "0",
            transform: "translateX(-8rem)",
          },
          to: {
            opacity: "1",
            transform: "translatex(0)",
          },
        },
        zoomfadein: {
          "0%": {
            transform: "scale(0.75)",
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
    },
  },
};
