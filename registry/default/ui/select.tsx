"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

// EDS SelectMenu trigger: a text field (Input's border, density and focus
// border) whose border stays 2px while the menu is open.
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit cursor-pointer items-center justify-between gap-2 rounded-lg pointer-coarse:min-h-11 border border-eds-input bg-eds-canvas px-3 text-body-14 whitespace-nowrap text-eds-primary transition-colors duration-300 ease-[ease] outline-none select-none data-[size=default]:h-10 data-[size=sm]:h-8 data-[size=sm]:px-2 data-[size=sm]:text-body-12 lg:px-2 lg:text-body-12 lg:data-[size=default]:h-8",
        "hover:border-eds-input-hover active:bg-eds-neutral-secondary-pressed data-placeholder:text-eds-secondary",
        "focus-visible:border-eds-input-active focus-visible:inset-ring-1 focus-visible:inset-ring-eds-input-active data-popup-open:border-eds-input-active data-popup-open:inset-ring-1 data-popup-open:inset-ring-eds-input-active",
        "aria-invalid:border-eds-input-critical aria-invalid:hover:border-eds-input-critical-hover aria-invalid:focus-visible:border-eds-input-active aria-invalid:data-popup-open:border-eds-input-active",
        "data-disabled:pointer-events-none data-disabled:border-eds-input-disabled data-disabled:bg-eds-neutral-disabled data-disabled:text-eds-disabled-secondary data-disabled:data-placeholder:text-eds-disabled",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 lg:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none text-eds-secondary transition-transform duration-300 ease-[ease] in-data-disabled:text-eds-tertiary in-data-popup-open:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

// Positioned like EDS: below the trigger, start-aligned, 4px away, at most
// 356px tall. Pass `alignItemWithTrigger` to overlay the selected item instead.
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-[min(356px,var(--available-height))] max-w-100 min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-eds-secondary bg-eds-menu p-1 text-eds-primary shadow-eds-20 outline-none duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("my-2 px-2 text-body-10 text-eds-secondary uppercase", className)}
      {...props}
    />
  );
}

// EDS menu items put the selection check at the start; unselected items keep
// the space so labels line up.
function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 rounded-sm py-2 pointer-coarse:min-h-11 pr-3 pl-9 text-body-14 text-eds-primary transition-colors duration-300 ease-[ease] outline-hidden select-none lg:gap-2 lg:py-1.5 lg:pr-2 lg:pl-6 lg:text-body-12",
        "data-highlighted:bg-eds-neutral-hover active:bg-eds-neutral-pressed data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:text-eds-disabled",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 lg:[&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute left-2 flex size-5 items-center justify-center lg:left-1 lg:size-4" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 border-t border-eds-tertiary", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-eds-menu py-1 text-eds-secondary [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-eds-menu py-1 text-eds-secondary [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
