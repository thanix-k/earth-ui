"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/registry/default/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-[orientation=horizontal]:h-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-4 data-[orientation=vertical]:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-lg bg-eds-neutral-tertiary select-none data-disabled:bg-eds-neutral-disabled data-[orientation=horizontal]:h-[3px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[3px]"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-eds-inverse select-none data-disabled:bg-eds-neutral-tertiary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => `thumb-${index}`).map((thumbId) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={thumbId}
            className="relative block size-3 shrink-0 touch-target cursor-pointer rounded-full bg-eds-inverse transition-[background-color,box-shadow] duration-300 ease-[ease] select-none after:absolute after:-inset-2 hover:bg-eds-inverse-hover hover:shadow-eds-50 active:bg-eds-inverse-pressed active:shadow-eds-50 has-focus-visible:bg-eds-inverse-pressed has-focus-visible:shadow-eds-50 has-focus-visible:focus-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:bg-eds-neutral-tertiary data-disabled:shadow-none"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
