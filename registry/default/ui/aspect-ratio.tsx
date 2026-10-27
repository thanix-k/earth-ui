import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  const style: React.CSSProperties & Record<`--${string}`, string> = {
    "--ratio": String(ratio),
  };
  return (
    <div
      data-slot="aspect-ratio"
      style={style}
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}

export { AspectRatio };
