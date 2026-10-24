import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// Same density and focus treatment as Input. The minimum height matches an
// EDS textarea's default three rows.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-22.5 w-full resize-none rounded-lg border border-eds-input bg-eds-canvas p-3 text-body-14 text-eds-primary transition-colors duration-300 ease-[ease] outline-none placeholder:text-eds-secondary lg:min-h-19 lg:p-2 lg:text-body-12",
        "hover:border-eds-input-hover focus-visible:border-eds-input-active focus-visible:inset-ring-1 focus-visible:inset-ring-eds-input-active",
        "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover aria-invalid:focus-visible:border-eds-input-active",
        "disabled:cursor-default disabled:border-eds-input-disabled disabled:bg-eds-neutral-disabled disabled:text-eds-disabled-secondary disabled:placeholder:text-eds-disabled",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
