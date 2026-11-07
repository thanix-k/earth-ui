// Generates one docs page per Component from packages/ui/registry.json.
// Output is gitignored: the registry is the only source.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const registry = JSON.parse(readFileSync(join(import.meta.dirname, "../../../packages/ui/registry.json"), "utf8"))
const out = join(import.meta.dirname, "../content/docs/components")
const titleCase = (name) => name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
const pascal = (name) => titleCase(name).replaceAll(" ", "")

const components = registry.items.filter((i) => i.type === "registry:ui")
const names = components.map((c) => c.name)
// An Example belongs to the longest Component name it starts with (button-group-example -> button-group).
const owner = (example) =>
  names.filter((n) => example.startsWith(`${n}-`)).sort((a, b) => b.length - a.length)[0]
const examples = registry.items.filter((i) => i.type === "registry:example")

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

for (const c of components) {
  const own = examples.filter((e) => owner(e.name) === c.name)
  const title = own.find((e) => e.name === `${c.name}-example`)?.title ?? titleCase(c.name)
  const docs = c.meta?.links?.docs
  writeFileSync(
    join(out, `${c.name}.mdx`),
    [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(c.description ?? "")}`,
      "---",
      ...own.map((e) => `import ${pascal(e.name)} from "@/components/${e.name}"`),
      "",
      `<Install name="${c.name}" />`,
      ...own.flatMap((e) => ["", `<ComponentPreview name="${e.name}">`, `  <${pascal(e.name)} />`, "</ComponentPreview>"]),
      ...(docs ? ["", `API reference: [shadcn docs](${docs}).`] : []),
      "",
    ].join("\n")
  )
}

writeFileSync(join(out, "meta.json"), JSON.stringify({ title: "Components", pages: names.sort() }, null, 2) + "\n")
console.log(`Generated ${components.length} component pages`)
