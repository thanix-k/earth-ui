import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { site } from "@/lib/site";

export const links = [
  { text: "Components", url: "/docs/components/button" },
  { text: "Epic", url: "/epic" },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: site.name },
    githubUrl: site.repo,
    links,
  };
}
