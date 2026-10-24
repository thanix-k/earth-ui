"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/registry/default/lib/utils";

// EDS dividers are a 1px `border-tertiary` line, so the separator draws a
// border rather than a background fill.
function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 border-eds-tertiary data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t data-[orientation=vertical]:self-stretch data-[orientation=vertical]:border-s",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
