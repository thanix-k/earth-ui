"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/registry/default/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 touch-target shrink-0 cursor-pointer items-center justify-center rounded-sm border border-eds-input bg-eds-canvas text-eds-inverse transition-colors duration-300 ease-[ease] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-eds-input-hover focus-visible:focus-ring lg:size-4",
        "data-checked:border-eds-input-active data-checked:bg-eds-inverse data-checked:hover:border-eds-input-active-hover data-indeterminate:border-eds-input-active data-indeterminate:bg-eds-inverse data-indeterminate:hover:border-eds-input-active-hover",
        "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover",
        "data-disabled:pointer-events-none data-disabled:border-eds-input-disabled data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-disabled",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-4 [&>svg]:stroke-3 lg:[&>svg]:size-3.5"
      >
        <CheckIcon className="in-data-indeterminate:hidden" />
        <MinusIcon className="hidden in-data-indeterminate:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
