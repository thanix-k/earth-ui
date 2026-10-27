import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

function Label({ className, htmlFor, children, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="label"
      className={cn(
        "flex items-center gap-3 text-body-14 text-eds-primary select-none lg:gap-2 lg:text-body-12",
        "peer-disabled:cursor-default peer-disabled:text-eds-disabled peer-data-disabled:cursor-default peer-data-disabled:text-eds-disabled has-disabled:cursor-default has-disabled:text-eds-disabled has-data-disabled:cursor-default has-data-disabled:text-eds-disabled group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-eds-disabled",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
