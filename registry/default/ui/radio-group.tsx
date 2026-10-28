"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/registry/default/lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2 pointer-coarse:gap-6", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex touch-target aspect-square size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-eds-input bg-eds-canvas text-eds-inverse transition-colors duration-300 ease-[ease] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-eds-input-hover focus-visible:focus-ring lg:size-4",
        "data-checked:border-eds-input-active data-checked:bg-eds-inverse data-checked:hover:border-eds-input-active-hover",
        "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover",
        "data-disabled:cursor-default data-disabled:border-eds-input-disabled data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-disabled data-disabled:hover:border-eds-input-disabled",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-2 rounded-full bg-current lg:size-1.5"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
