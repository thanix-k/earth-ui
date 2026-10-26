import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/default/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-button border border-transparent font-medium whitespace-nowrap transition-colors duration-300 ease-[ease] select-none focus-visible:focus-ring data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-eds-accent text-eds-onPrimary hover:bg-eds-accent-hover active:bg-eds-accent-pressed aria-expanded:bg-eds-accent-pressed aria-pressed:bg-eds-accent-pressed data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-onPrimary-disabled",
        secondary:
          "border-eds-accent text-eds-accent hover:border-transparent hover:bg-eds-accent-hover hover:text-eds-onPrimary active:border-transparent active:bg-eds-accent-pressed active:text-eds-onPrimary aria-expanded:border-transparent aria-expanded:bg-eds-accent-pressed aria-expanded:text-eds-onPrimary data-disabled:border-eds-secondary data-disabled:bg-transparent data-disabled:text-eds-disabled",
        outline:
          "border-eds-secondary bg-eds-neutral text-eds-primary hover:border-transparent hover:bg-eds-neutral-hover active:border-transparent active:bg-eds-neutral-pressed aria-expanded:border-transparent aria-expanded:bg-eds-neutral-pressed aria-pressed:border-transparent aria-pressed:bg-eds-neutral-pressed data-disabled:border-eds-secondary data-disabled:bg-eds-neutral data-disabled:text-eds-disabled",
        ghost:
          "text-eds-secondary hover:bg-eds-neutral-hover active:bg-eds-neutral-pressed aria-expanded:bg-eds-neutral-pressed aria-pressed:bg-eds-neutral-pressed data-disabled:bg-transparent data-disabled:text-eds-disabled",
        destructive:
          "bg-eds-critical text-eds-critical-onPrimary hover:bg-eds-critical-hover active:bg-eds-critical-pressed aria-expanded:bg-eds-critical-pressed aria-pressed:bg-eds-critical-pressed data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-onPrimary-disabled",
        link: "text-eds-link underline-offset-4 hover:text-eds-link-hover hover:underline active:text-eds-link-pressed data-disabled:text-eds-disabled data-disabled:no-underline",
      },
      size: {
        default:
          "h-8 gap-1 px-4 text-body-12 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-5 gap-1 px-2 text-body-10 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-6 gap-1 px-3 text-body-12 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-5 text-body-14 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8",
        "icon-xs": "size-5 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-6",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
