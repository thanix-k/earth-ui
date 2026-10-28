"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/registry/default/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-1 data-horizontal:flex-col", className)}
      {...props}
    />
  );
}

// `default` is EDS's pills tabs (chips), `line` is EDS's default underlined tabs.
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center group-data-horizontal/tabs:py-1.5 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:items-stretch group-data-vertical/tabs:gap-2",
  {
    variants: {
      variant: {
        default: "gap-2",
        line: "gap-4 group-data-vertical/tabs:pe-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex shrink-0 touch-target cursor-pointer pointer-coarse:group-data-vertical/tabs:min-h-11 items-center justify-center gap-1 border border-transparent text-body-14 whitespace-nowrap text-eds-primary transition-colors duration-300 ease-[ease] outline-none group-data-vertical/tabs:justify-start focus-visible:focus-ring data-disabled:pointer-events-none data-disabled:text-eds-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=default]/tabs-list:h-10 group-data-[variant=default]/tabs-list:rounded-full group-data-[variant=default]/tabs-list:px-4 group-data-[variant=default]/tabs-list:has-data-[icon=inline-end]:pe-3 group-data-[variant=default]/tabs-list:has-data-[icon=inline-start]:ps-3",
        "group-data-[variant=default]/tabs-list:not-data-active:hover:bg-eds-neutral-hover group-data-[variant=default]/tabs-list:not-data-active:active:bg-eds-neutral-pressed group-data-[variant=default]/tabs-list:data-active:bg-eds-neutral-secondary group-data-[variant=default]/tabs-list:data-active:hover:bg-eds-neutral-secondary-hover group-data-[variant=default]/tabs-list:data-active:active:bg-eds-neutral-secondary-pressed",
        "group-data-[variant=line]/tabs-list:rounded-md group-data-[variant=line]/tabs-list:border-0 group-data-[variant=line]/tabs-list:px-0.5 group-data-[variant=line]/tabs-list:font-medium group-data-[variant=line]/tabs-list:text-eds-secondary group-data-[variant=line]/tabs-list:not-data-active:hover:text-eds-secondary-hover group-data-[variant=line]/tabs-list:not-data-active:active:text-eds-tertiary group-data-[variant=line]/tabs-list:data-active:text-eds-primary group-data-[variant=line]/tabs-list:data-disabled:text-eds-disabled",
        "after:pointer-events-none after:absolute after:rounded-sm after:bg-eds-inverse after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.5 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-end-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

/** What Tab can land on inside a panel. */
const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, iframe, [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

function holdsTabbable(panel: HTMLElement): boolean {
  return [...panel.querySelectorAll<HTMLElement>(TABBABLE)].some(
    (element) =>
      !element.closest("[hidden], [inert]") &&
      (element.checkVisibility?.({ visibilityProperty: true }) ?? true),
  );
}

// The WAI-ARIA tabs pattern. Base UI makes every open panel a Tab stop; this one is a stop only while it holds
// nothing Tab can land on, so Tab from the tab list goes to the first control inside when there is one. A panel
// that is a stop keeps to its content's height and draws the focus ring on keyboard focus alone.
function TabsContent({ className, ref, ...props }: TabsPrimitive.Panel.Props) {
  const [isTabStop, setIsTabStop] = useState(false);
  const observer = useRef<MutationObserver | null>(null);
  const setPanel = useCallback(
    (panel: HTMLDivElement | null) => {
      observer.current?.disconnect();
      if (typeof ref === "function") ref(panel);
      else if (ref) ref.current = panel;
      if (!panel) return;
      const check = () => setIsTabStop(!holdsTabbable(panel));
      check();
      observer.current = new MutationObserver(check);
      observer.current.observe(panel, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["tabindex", "disabled", "href", "hidden", "inert"],
      });
    },
    [ref],
  );

  return (
    <TabsPrimitive.Panel
      ref={setPanel}
      data-slot="tabs-content"
      data-tab-stop={isTabStop ? "" : undefined}
      tabIndex={isTabStop ? 0 : -1}
      className={cn(
        "flex-1 rounded-lg text-body-14 text-eds-primary outline-none focus-visible:focus-ring data-tab-stop:flex-none data-tab-stop:has-[>[data-slot=empty]]:my-auto",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
