import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  );
}

// Every fill is an EDS token, so dark mode and hover come from the tokens:
// no colour mixing and no `dark:` variants. Pressable bubbles (button, a) take
// the token's `-hover` step.
const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-eds-accent *:data-[slot=bubble-content]:text-eds-onPrimary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-accent-hover",
        secondary:
          "*:data-[slot=bubble-content]:bg-eds-neutral-secondary *:data-[slot=bubble-content]:text-eds-primary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-neutral-secondary-hover",
        muted:
          "*:data-[slot=bubble-content]:bg-eds-canvas-secondary *:data-[slot=bubble-content]:text-eds-primary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-neutral-hover",
        tinted:
          "*:data-[slot=bubble-content]:bg-eds-accent-secondary *:data-[slot=bubble-content]:text-eds-primary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-accent-secondary-hover",
        outline:
          "*:data-[slot=bubble-content]:border-eds-secondary *:data-[slot=bubble-content]:bg-eds-canvas *:data-[slot=bubble-content]:text-eds-primary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-neutral-hover",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 *:data-[slot=bubble-content]:text-eds-primary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-neutral-hover",
        destructive:
          "*:data-[slot=bubble-content]:bg-eds-critical-secondary *:data-[slot=bubble-content]:text-eds-critical-secondary [&>[data-slot=bubble-content]:is(button,a):hover]:bg-eds-critical-secondary-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

// A pressable bubble draws Earth's one focus ring (`focus-visible:focus-ring`),
// not a border plus halo.
function BubbleContent({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-body-14 wrap-break-word group-data-[align=end]/bubble:self-end lg:text-body-12 [button]:cursor-pointer [button]:text-left [button,a]:transition-colors [button,a]:duration-300 [button,a]:ease-[ease] [button,a]:outline-none [button,a]:focus-visible:focus-ring",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  });
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-eds-neutral-secondary px-1.5 py-0.5 text-body-14 text-eds-primary ring-3 ring-(--eds-background-canvas) has-[button]:p-0 lg:text-body-12",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  },
);

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  );
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions };
