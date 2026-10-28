import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

// EDS Select: Input's density, with a fixed 48px end padding for the chevron.
// `sm` is always the compact (32px) size.
function NativeSelect({ className, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      className={cn("group/native-select relative w-fit", className)}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-10 w-full min-w-0 cursor-pointer pointer-coarse:min-h-11 appearance-none rounded-lg border border-eds-input bg-eds-canvas py-0 pr-12 pl-3 text-body-14 text-eds-primary transition-colors duration-300 ease-[ease] outline-none select-none lg:h-8 lg:pl-2 lg:text-body-12 data-[size=sm]:h-8 data-[size=sm]:pl-2 data-[size=sm]:text-body-12",
          "hover:border-eds-input-hover focus-visible:border-eds-input-active focus-visible:inset-ring-1 focus-visible:inset-ring-eds-input-active",
          "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover aria-invalid:focus-visible:border-eds-input-active",
          "disabled:pointer-events-none disabled:cursor-default disabled:border-eds-input-disabled disabled:bg-eds-neutral-disabled disabled:text-eds-disabled",
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-eds-secondary select-none group-has-[select:disabled]/native-select:text-eds-disabled group-data-[size=sm]/native-select:right-2 group-data-[size=sm]/native-select:size-4 lg:right-2 lg:size-4"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
