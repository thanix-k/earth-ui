import { highlight } from "fumadocs-core/highlight";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/registry/default/lib/utils";

// Highlighting is pure, so cache it: it also keeps Shiki's internal clock reads
// out of prerendering under cacheComponents.
async function highlightCode(code: string, lang: string) {
  "use cache";
  return highlight(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
}: {
  code: string;
  lang?: string;
  className?: string;
}) {
  const source = code.trimEnd();
  return (
    <div className={cn("code-block group relative", className)}>
      {await highlightCode(source, lang)}
      <CopyButton value={source} className="absolute end-2 top-2" />
    </div>
  );
}
