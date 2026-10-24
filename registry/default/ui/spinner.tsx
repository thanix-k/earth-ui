import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// EDS Loading: a circle whose stroke grows and shrinks while it rotates
// (1.7s). The dash is animated with SMIL so no extra keyframes are needed.
// Like EDS it stays accent-coloured inside a disabled (loading) button;
// change it with a text colour class.
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      viewBox="0 0 50 50"
      fill="none"
      className={cn(
        "size-4 shrink-0 animate-[spin_1.7s_linear_infinite] stroke-current stroke-2 text-eds-accent",
        className,
      )}
      {...props}
    >
      <circle cx="25" cy="25" r="20" strokeLinecap="round">
        <animate
          attributeName="stroke-dasharray"
          values="1 150;90 150;90 150"
          dur="1.7s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-35;-124"
          dur="1.7s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export { Spinner };
