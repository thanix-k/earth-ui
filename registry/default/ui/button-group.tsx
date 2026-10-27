import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Separator } from "@/registry/default/ui/separator";

// Only the inner corners are squared off, so each child keeps its own outer
// radius: pill buttons stay pills, inputs keep their 8px corners.
const buttonGroupVariants = cva(
  "flex w-fit min-w-auto items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:has(~[data-slot])]:rounded-e-none [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]:not([data-slot=button-group-separator])]:border-s-0",
        vertical:
          "flex-col [&>[data-slot]:has(~[data-slot])]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]:not([data-slot=button-group-separator])]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"fieldset"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <fieldset
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border border-eds-input bg-eds-neutral-secondary px-3 text-body-14 text-eds-secondary lg:px-2 lg:text-body-12 [&_svg]:pointer-events-none [&_svg]:text-eds-icon-secondary [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch border-eds-secondary data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:border-t data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=vertical]:border-s",
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
