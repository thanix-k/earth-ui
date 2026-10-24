import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/component-preview";
import { Installation, ShadcnCommand } from "@/components/installation";

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  ComponentPreview,
  Installation,
  ShadcnCommand,
};
