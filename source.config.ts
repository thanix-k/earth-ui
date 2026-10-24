import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      links: z.object({ doc: z.string().url(), api: z.string().url() }).partial().optional(),
    }),
  },
});

// Colours come only as --shiki-light / --shiki-dark variables; app/globals.css
// picks one per theme, so code blocks follow dark mode without !important.
const themes = { light: "github-light", dark: "github-dark" } as const;

export default defineConfig({
  mdxOptions: { rehypeCodeOptions: { themes, defaultColor: false } },
});
