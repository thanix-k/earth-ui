"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/registry/default/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

// EDS's divider variant: a `border-tertiary` line with 12px below the item.
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-eds-tertiary not-last:border-b not-last:pb-3", className)}
      {...props}
    />
  );
}

// The 20px chevron gets a 2px margin so the trigger is 42px tall like EDS,
// whose dropdown icon sits in a 24px box.
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 cursor-pointer items-center justify-between gap-2 rounded-md border border-transparent px-4 py-2 text-left text-body-14 font-medium text-eds-primary outline-none focus-visible:focus-ring data-disabled:cursor-default data-disabled:text-eds-disabled lg:text-body-12 **:data-[slot=accordion-trigger-icon]:m-0.5 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-eds-icon-primary data-disabled:**:data-[slot=accordion-trigger-icon]:text-eds-disabled",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-body-14 text-eds-primary transition-[height] data-ending-style:h-0 data-starting-style:h-0 lg:text-body-12"
      {...props}
    >
      <div
        className={cn(
          "px-4 py-2 [&_a]:text-eds-link [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-eds-link-hover [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
