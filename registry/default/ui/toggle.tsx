"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/default/lib/utils";

// `default` is the EDS Chip (pressed: neutral-secondary fill). `outline` is the
// EDS DaySelect day (bordered, pressed: inverse fill). Icon-only toggles
// (a lone icon plus `aria-label`) are circles.
const toggleVariants = cva(
  "group/toggle relative inline-flex touch-target shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full border border-transparent whitespace-nowrap text-eds-primary transition-colors duration-300 ease-[ease] outline-none select-none focus-visible:focus-ring data-disabled:pointer-events-none data-disabled:bg-transparent data-disabled:text-eds-disabled [&[aria-label]:has(>svg:only-child)]:px-0 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-eds-neutral-hover active:bg-eds-neutral-pressed data-pressed:bg-eds-neutral-secondary data-pressed:hover:bg-eds-neutral-secondary-hover data-pressed:active:bg-eds-neutral-secondary-pressed data-disabled:data-pressed:bg-eds-neutral-disabled",
        outline:
          "border-eds-secondary bg-eds-neutral hover:bg-eds-neutral-hover active:bg-eds-neutral-pressed data-pressed:border-transparent data-pressed:bg-eds-inverse data-pressed:text-eds-inverse data-pressed:hover:bg-eds-inverse-hover data-pressed:active:bg-eds-inverse-pressed data-disabled:border-eds-secondary data-disabled:bg-eds-neutral data-disabled:data-pressed:border-eds-secondary data-disabled:data-pressed:bg-eds-neutral-disabled data-disabled:data-pressed:text-eds-disabled",
      },
      size: {
        default:
          "h-10 min-w-10 px-4 text-body-14 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 lg:h-8 lg:min-w-8 lg:px-3 lg:text-body-12 lg:has-data-[icon=inline-end]:pr-2 lg:has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-5 lg:[&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 min-w-8 px-3 text-body-12 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 lg:h-6 lg:min-w-6 lg:px-2 lg:has-data-[icon=inline-end]:pr-1.5 lg:has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 min-w-10 px-4 text-body-14 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
