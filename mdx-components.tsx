import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type * as React from "react";
import { ComponentPreview } from "@/components/component-preview";
import { CopyButton } from "@/components/copy-button";
import { Installation, ShadcnCommand } from "@/components/installation";
import { cn } from "@/registry/default/lib/utils";

/** Text content of a highlighted code block, for its copy button. */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn("mt-12 mb-4 scroll-mt-24 text-heading-24 text-eds-primary", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-8 mb-3 scroll-mt-24 text-heading-18 text-eds-primary", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("my-4 text-body-16 text-eds-secondary [&_strong]:text-eds-primary", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-4 ms-6 list-disc text-body-16 text-eds-secondary", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 ms-6 list-decimal text-body-16 text-eds-secondary", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn("mt-2", className)} {...props} />,
  a: ({ className, href = "", ...props }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-eds-primary underline underline-offset-4 hover:text-eds-primary-hover",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-sm bg-eds-neutral-secondary px-1 py-0.5 font-mono text-[0.875em] text-eds-primary",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }) => (
    <div className="code-block group relative my-6">
      <pre className={className} {...props}>
        {children}
      </pre>
      <CopyButton value={textOf(children)} className="absolute end-2 top-2" />
    </div>
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full text-body-14", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-eds-secondary px-3 py-2 text-start font-medium text-eds-primary",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-eds-tertiary px-3 py-2 text-eds-secondary", className)}
      {...props}
    />
  ),
  ComponentPreview,
  Installation,
  ShadcnCommand,
};
