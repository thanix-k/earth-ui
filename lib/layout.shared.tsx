import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { site } from "@/lib/site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: site.name },
    githubUrl: site.repo,
    links: [{ text: "Components", url: "/docs/components/button", active: "nested-url" }],
  };
}
