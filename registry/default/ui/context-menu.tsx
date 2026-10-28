"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// EDS menu items (MenuItem): 14px text with 12px padding on touch screens,
// 12px text and 8px padding from lg. Keyboard/pointer highlight is
// neutral-secondary, press is neutral-pressed.
const menuItemClasses =
  "relative flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 pointer-coarse:min-h-11 text-body-14 text-eds-primary outline-hidden transition-colors duration-300 ease-[ease] select-none not-data-disabled:data-highlighted:bg-eds-neutral-secondary not-data-disabled:hover:data-highlighted:bg-eds-neutral-hover not-data-disabled:active:data-highlighted:bg-eds-neutral-pressed data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:text-eds-disabled lg:gap-2 lg:px-2 lg:py-1.5 lg:text-body-12 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 lg:[&_svg:not([class*='size-'])]:size-4";

const menuPopupClasses =
  "z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-eds-secondary bg-eds-menu p-1 text-eds-primary shadow-eds-20 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95";

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(menuPopupClasses, "min-w-36", className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

// EDS list group label: 10px uppercase secondary text.
function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2 text-body-10 text-eds-secondary uppercase data-inset:pl-11 lg:px-2 lg:data-inset:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        menuItemClasses,
        "group/context-menu-item data-inset:pl-11 lg:data-inset:pl-8",
        "data-[variant=destructive]:not-data-disabled:text-eds-critical data-[variant=destructive]:not-data-disabled:data-highlighted:bg-eds-critical-secondary data-[variant=destructive]:not-data-disabled:hover:data-highlighted:bg-eds-critical-secondary-hover data-[variant=destructive]:not-data-disabled:active:data-highlighted:bg-eds-critical-secondary-pressed",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        menuItemClasses,
        "data-inset:pl-11 data-popup-open:bg-eds-neutral-secondary lg:data-inset:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto text-eds-secondary rtl:rotate-180" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({ ...props }: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      side="right"
      alignOffset={-5}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        menuItemClasses,
        "pr-11 data-inset:pl-11 lg:pr-8 lg:data-inset:pl-8",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-3 flex items-center justify-center lg:right-2"
        data-slot="context-menu-checkbox-item-indicator"
      >
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({ ...props }: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        menuItemClasses,
        "pr-11 data-inset:pl-11 lg:pr-8 lg:data-inset:pl-8",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-3 flex items-center justify-center lg:right-2"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 border-t border-eds-tertiary", className)}
      {...props}
    />
  );
}

// Matches Kbd: EDS menus show shortcuts as a small neutral chip.
function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto rounded-sm bg-eds-neutral-secondary px-1 text-body-12 text-eds-secondary group-data-highlighted/context-menu-item:bg-eds-canvas",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
