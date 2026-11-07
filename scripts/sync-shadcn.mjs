// Upstream sync: regenerate every Component, hook, lib file and Example from
// shadcn under the Preset, then rebuild registry.json. Never edit the output by hand.
import { execFileSync } from "node:child_process"
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const PRESET = ["--preset", "bIkeymG", "--template", "vite", "--rtl", "--pointer", "--base", "base"]
const STYLE = "base-vega"
const NAMESPACE = "@earthui"
const HOMEPAGE = "https://earthui.vercel.app"

const root = join(import.meta.dirname, "..")
const ui = join(root, "packages/ui")
const tmp = mkdtempSync(join(tmpdir(), "earthui-sync-"))
const gen = join(tmp, "gen")
const shadcn = (...args) =>
  execFileSync(join(root, "node_modules/.bin/shadcn"), args, { stdio: "inherit", cwd: tmp })
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"))
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + "\n")

try {
  shadcn("init", ...PRESET, "--name", "gen", "--no-monorepo", "--yes")

  // Generate as an RSC project so files keep upstream's "use client" markers.
  // The shadcn CLI strips them for non-RSC Consumers; the npm build preserves them.
  const config = readJson(join(gen, "components.json"))
  writeJson(join(gen, "components.json"), { ...config, rsc: true })

  shadcn("add", "--all", "--overwrite", "--yes", "--cwd", gen)

  const index = await (await fetch(`https://ui.shadcn.com/r/styles/${STYLE}/registry.json`)).json()
  const examples = index.items.filter((i) => i.type === "registry:example").map((i) => i.name)
  shadcn("add", ...examples, "--overwrite", "--yes", "--cwd", gen)
  dropBrokenExamples(examples)

  for (const dir of ["components", "hooks", "lib"]) {
    rmSync(join(ui, "src", dir), { recursive: true, force: true })
    cpSync(join(gen, "src", dir), join(ui, "src", dir), { recursive: true })
  }
  cpSync(join(gen, "src/index.css"), join(ui, "src/index.css"))
  writeJson(join(ui, "components.json"), { ...readJson(join(gen, "components.json")), registries: {} })

  // Runtime deps come from the generated project; build tooling and peers stay ours.
  const pkg = readJson(join(ui, "package.json"))
  const skip = new Set(["react", "react-dom", "tailwindcss", "@tailwindcss/vite"])
  pkg.dependencies = Object.fromEntries(
    Object.entries(readJson(join(gen, "package.json")).dependencies)
      .filter(([name]) => !skip.has(name))
      .sort(([a], [b]) => a.localeCompare(b))
  )
  writeJson(join(ui, "package.json"), pkg)

  writeJson(join(ui, "registry.json"), buildRegistry(index))
  execFileSync("pnpm", ["install"], { stdio: "inherit", cwd: root })
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

// Some upstream Examples import files shadcn does not publish (e.g. "@/lib/ai").
// We never patch upstream, so those Examples are left out until upstream fixes them.
function dropBrokenExamples(names) {
  const resolves = (spec) =>
    ["", ".ts", ".tsx", "/index.ts", "/index.tsx"].some((ext) => existsSync(join(gen, "src", spec + ext)))
  for (const name of names) {
    const file = join(gen, "src/components", `${name}.tsx`)
    if (!existsSync(file)) continue
    const missing = [...readFileSync(file, "utf8").matchAll(/from "@\/([^"]+)"/g)].map((m) => m[1]).filter((s) => !resolves(s))
    if (missing.length) {
      rmSync(file)
      console.warn(`Dropped ${name}: imports unpublished ${missing.join(", ")}`)
    }
  }
}

function buildRegistry(index) {
  const kinds = ["registry:ui", "registry:hook", "registry:lib", "registry:component", "registry:example"]
  const toLocal = (path) =>
    path
      .replace(`registry/${STYLE}/ui/`, "src/components/ui/")
      .replace(`registry/${STYLE}/examples/`, "src/components/")
      .replace(`registry/${STYLE}/components/`, "src/components/")
      .replace(`registry/${STYLE}/hooks/`, "src/hooks/")
      .replace(`registry/${STYLE}/lib/`, "src/lib/")
  const exists = (path) => {
    try { readFileSync(join(ui, path)); return true } catch { return false }
  }

  const items = index.items
    .filter((i) => kinds.includes(i.type) && i.files?.length)
    .map((item) => ({
      ...item,
      files: item.files.map((f) => ({ ...f, path: toLocal(f.path) })),
      ...(item.registryDependencies && {
        registryDependencies: item.registryDependencies.map((d) => `${NAMESPACE}/${d}`),
      }),
    }))
    .filter((item) => item.files.every((f) => exists(f.path)))

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "earthui",
    homepage: HOMEPAGE,
    items: [themeItem(index), ...items],
  }
}

// The Theme as a registry:style item, read from the Preset's generated CSS.
function themeItem(index) {
  const css = readFileSync(join(ui, "src/index.css"), "utf8")
  const vars = (selector) => {
    const block = css.split(`${selector} {`)[1]?.split("}")[0] ?? ""
    return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
  }
  const upstream = index.items.find((i) => i.name === "style")
  return {
    ...upstream,
    name: "theme",
    title: "Earth UI Theme",
    description: "Earth UI Preset tokens, font and base styles.",
    dependencies: [...upstream.dependencies, "@fontsource-variable/inter"],
    registryDependencies: [`${NAMESPACE}/utils`],
    cssVars: { theme: vars("@theme inline"), light: vars(":root"), dark: vars(".dark") },
    css: {
      ...upstream.css,
      '@import "@fontsource-variable/inter"': {},
      "@layer base": {
        ...upstream.css["@layer base"],
        'button:not(:disabled), [role="button"]:not(:disabled)': { cursor: "pointer" },
        html: { "@apply font-sans": {} },
      },
    },
  }
}
