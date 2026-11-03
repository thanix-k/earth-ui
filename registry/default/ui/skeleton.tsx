import type * as React from "react";
import { cn } from "@/registry/default/lib/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-eds-neutral-disabled", className)}
      {...props}
    />
  );
}

export { Skeleton };
