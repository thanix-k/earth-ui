import { site } from "@/lib/site";
import { source } from "@/lib/source";

export function GET() {
  const pages = source.getPages();
  const line = (p: (typeof pages)[number]) =>
    `- [${p.data.title}](${site.url}${p.url}): ${p.data.description ?? ""}`;
  const components = pages.filter((p) => p.slugs[0] === "components");
  const guides = pages.filter((p) => p.slugs[0] !== "components");
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description} Install with the shadcn CLI: \`npx shadcn@latest init ${site.url}/r/base.json\`, then \`npx shadcn@latest add ${site.namespace}/<component>\`.`,
    "",
    "## Guides",
    ...guides.map(line),
    "",
    "## Components",
    ...components.map(line),
    "",
    `Registry index: ${site.url}/r/registry.json`,
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
