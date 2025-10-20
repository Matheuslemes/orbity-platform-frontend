// postcss.config.mjs
import tailwind from "@tailwindcss/postcss"
import autoprefixer from "autoprefixer"

export default {
  plugins: {
    "@tailwindcss/postcss": {}, // Tailwind v4
    autoprefixer: {},
  },
}