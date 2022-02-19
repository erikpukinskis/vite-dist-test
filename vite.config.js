import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    sourcemap: "inline",
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ViteDistTest",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          "react": "react",
        },
      },
    },
  },
})
