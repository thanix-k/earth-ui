import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// EDS Alert: a tinted panel with no border. Text is 14px on touch screens and
// 12px from lg; the icon is 20px then 16px, nudged to sit on the first line.
const alertVariants = cva(
  "group/alert relative grid w-full rounded-lg px-3 py-2 text-left text-body-14 has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 lg:text-body-12 *:[svg]:row-span-2 *:[svg]:translate-y-px *:[svg:not([class*='size-'])]:size-5 lg:*:[svg]:translate-y-0.5 lg:*:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-eds-canvas-tertiary text-eds-primary *:[svg]:text-eds-icon-primary",
        destructive:
          "bg-eds-critical-secondary text-eds-critical-secondary *:[svg]:text-eds-icon-critical",
        positive:
          "bg-eds-positive-secondary text-eds-positive-secondary *:[svg]:text-eds-icon-positive",
        caution:
          "bg-eds-caution-secondary text-eds-caution-secondary *:[svg]:text-eds-icon-caution",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-action" className={cn("absolute top-2 right-3", className)} {...props} />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
