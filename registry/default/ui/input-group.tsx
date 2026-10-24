"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";

// The group draws the field chrome (EDS FocusContainer): border, background,
// hover and the 2px focused border. The control inside is borderless.
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add form semantics to a single control
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-10 w-full min-w-0 items-center rounded-lg border border-eds-input bg-eds-canvas transition-colors duration-300 ease-[ease] outline-none hover:not-has-[[data-slot=input-group-control]:is(:disabled,:focus-visible)]:border-eds-input-hover lg:h-8",
        "has-[[data-slot][aria-invalid=true]]:not-has-[[data-slot=input-group-control]:focus-visible]:border-eds-input-critical has-[[data-slot][aria-invalid=true]]:not-has-[[data-slot=input-group-control]:focus-visible]:hover:border-eds-input-critical-hover",
        "has-[[data-slot=input-group-control]:focus-visible]:border-eds-input-active has-[[data-slot=input-group-control]:focus-visible]:inset-ring-1 has-[[data-slot=input-group-control]:focus-visible]:inset-ring-eds-input-active",
        "in-data-[slot=combobox-content]:has-[[data-slot=input-group-control]:focus-visible]:border-eds-input in-data-[slot=combobox-content]:has-[[data-slot=input-group-control]:focus-visible]:inset-ring-0",
        "has-[[data-slot=input-group-control]:disabled]:border-eds-input-disabled has-[[data-slot=input-group-control]:disabled]:bg-eds-neutral-disabled",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2 lg:has-[>[data-align=inline-start]]:[&>input]:pl-1.5 has-[>[data-align=inline-end]]:[&>input]:pr-2 lg:has-[>[data-align=inline-end]]:[&>input]:pr-1.5",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 text-body-14 text-eds-secondary select-none group-has-[[data-slot=input-group-control]:disabled]/input-group:text-eds-disabled lg:text-body-12 [&>svg:not([class*='size-'])]:size-5 lg:[&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:pl-1.5 lg:pl-2 lg:has-[>button]:pl-1",
        "inline-end": "order-last pr-3 has-[>button]:pr-1.5 lg:pr-2 lg:has-[>button]:pr-1",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 lg:px-2 lg:pt-2 [.border-b]:pb-3 lg:[.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 lg:px-2 lg:pb-2 [.border-t]:pt-3 lg:[.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: clicking the addon only forwards focus to the input, which is keyboard reachable itself
    // biome-ignore lint/a11y/useSemanticElements: addons are decorative groups inside the field
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-1 shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 px-2 text-body-12 [&>svg:not([class*='size-'])]:size-4",
      sm: "",
      "icon-xs": "size-6 p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-body-14 text-eds-secondary lg:text-body-12 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 lg:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:inset-ring-0 disabled:bg-transparent lg:h-full",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent shadow-none focus-visible:inset-ring-0 disabled:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
