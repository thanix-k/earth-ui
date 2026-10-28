import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// EDS inputs are 40px with 14px text on touch screens and 32px with 12px text
// from the lg breakpoint. Focus thickens the border to 2px (inset ring, so
// nothing shifts) instead of drawing a ring outside.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg pointer-coarse:min-h-11 border border-eds-input bg-eds-canvas px-3 text-body-14 text-eds-primary transition-colors duration-300 ease-[ease] outline-none lg:h-8 lg:px-2 lg:text-body-12",
        "file:inline-flex file:h-full file:border-0 file:bg-transparent file:font-medium file:text-eds-primary placeholder:text-eds-secondary",
        "hover:border-eds-input-hover focus-visible:border-eds-input-active focus-visible:inset-ring-1 focus-visible:inset-ring-eds-input-active",
        "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover aria-invalid:focus-visible:border-eds-input-active",
        "disabled:cursor-default disabled:border-eds-input-disabled disabled:bg-eds-neutral-disabled disabled:text-eds-disabled-secondary disabled:placeholder:text-eds-disabled",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
