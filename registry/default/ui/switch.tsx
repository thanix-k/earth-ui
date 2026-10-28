"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/registry/default/lib/utils";

// EDS Toggle: 36×20 track on touch screens, 28×16 from lg. `sm` is always the
// compact size.
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex touch-target shrink-0 cursor-pointer items-center rounded-full border border-transparent px-px transition-colors duration-300 ease-[ease] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:focus-ring",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7 lg:data-[size=default]:h-4 lg:data-[size=default]:w-7",
        "bg-eds-neutral-tertiary text-eds-onPrimary data-checked:bg-eds-inverse",
        "aria-invalid:border-eds-input-critical",
        "data-disabled:cursor-default data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-onPrimary-disabled",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-current transition-transform duration-300 ease-[ease] group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-checked:translate-x-full data-unchecked:translate-x-0 lg:group-data-[size=default]/switch:size-3"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
