import { globSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const src = resolve(import.meta.dirname, "src")
const entries = globSync("{components/ui,hooks,lib}/**/*.{ts,tsx}", { cwd: src })

export default defineConfig({
  plugins: [react(), dts({ entryRoot: src, include: ["src/components/ui", "src/hooks", "src/lib"] })],
  resolve: { alias: { "@": src } },
  build: {
    lib: { entry: entries.map((e) => resolve(src, e)), formats: ["es"] },
    rollupOptions: {
      // Every bare import (react, @base-ui/react, ...) stays a dependency.
      external: (id) => !id.startsWith(".") && !id.startsWith("@/") && !id.startsWith("/") && !id.startsWith("\0"),
      output: {
        preserveModules: true,
        preserveModulesRoot: src,
        entryFileNames: "[name].js",
      },
    },
  },
})
