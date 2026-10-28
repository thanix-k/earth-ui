"use client";

import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/registry/default/lib/utils";

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full aria-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

// The 1px line is a border (EDS colours borders with border tokens) and a
// wider ::after keeps the hit area usable.
function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "group/resizable-handle relative flex w-px touch-target items-center justify-center border-s border-eds-secondary transition-colors duration-300 ease-[ease] outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:focus-ring data-[separator=active]:border-eds-input-hover data-[separator=hover]:border-eds-input-hover",
        "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:border-s-0 aria-[orientation=horizontal]:border-t aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-2 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-6 w-1 shrink-0 rounded-full bg-eds-neutral-tertiary transition-colors duration-300 ease-[ease] group-data-[separator=active]/resizable-handle:bg-eds-neutral-tertiary-hover group-data-[separator=hover]/resizable-handle:bg-eds-neutral-tertiary-hover" />
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
