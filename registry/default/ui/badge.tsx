import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/default/lib/utils";

// EDS Badge (standard size, square): 32px with 12px text on touch screens,
// 24px with 10px text from lg, regular weight as EDS renders it. Interactive
// badges (links, buttons) grow slightly on hover like EDS instead of
// changing colour.
const badgeVariants = cva(
  "group/badge inline-flex h-8 w-fit min-w-8 pointer-coarse:[a&]:min-h-11 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm px-3 text-body-12 whitespace-nowrap outline-none has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 lg:h-6 lg:min-w-6 lg:px-2.5 lg:text-body-10 lg:has-data-[icon=inline-end]:pr-1.5 lg:has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-4 [&:is(a,button)]:cursor-pointer [&:is(a,button)]:transition-transform [&:is(a,button)]:hover:scale-[103%] [&:is(a,button)]:focus-visible:focus-ring [&:is(a,button)]:active:scale-[101%]",
  {
    variants: {
      variant: {
        default: "bg-eds-inverse text-eds-inverse",
        secondary: "bg-eds-neutral-secondary text-eds-secondary",
        destructive: "bg-eds-critical-secondary text-eds-critical-secondary",
        positive: "bg-eds-positive-secondary text-eds-positive-secondary",
        caution: "bg-eds-caution-secondary text-eds-caution-secondary",
        outline: "text-eds-primary inset-ring inset-ring-eds-secondary",
        ghost: "text-eds-secondary hover:bg-eds-neutral-hover",
        link: "text-eds-link underline-offset-4 hover:text-eds-link-hover hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
