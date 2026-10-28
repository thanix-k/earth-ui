import type { CalendarOptions } from "@fullcalendar/react";
import type { ResourceInput } from "@fullcalendar/react-scheduler";
import { cn } from "@/registry/default/lib/utils";
import {
  type EventCalendarViewProps,
  EventCalendarViews,
} from "@/registry/default/ui/event-calendar-views";

export type { ResourceInput };

const continuationArrowClass = "mx-1 border-y-[5px] border-y-transparent opacity-50";

export type SchedulerViewsProps = EventCalendarViewProps &
  Required<Pick<CalendarOptions, "resourceExpanderContent">> & {
    /**
     * Your FullCalendar Premium licence key. Passed to FullCalendar as
     * `schedulerLicenseKey`; an explicit `schedulerLicenseKey` also works.
     * Read it from your own environment, never commit it.
     */
    licenseKey?: string;
  }; // ensure callers define icons

export function SchedulerViews({
  views: userViews,
  licenseKey,
  ...restOptions
}: SchedulerViewsProps) {
  return (
    <EventCalendarViews
      {...(licenseKey ? { schedulerLicenseKey: licenseKey } : {})}
      /* Resource Day Header
      ------------------------------------------------------------------------------------------- */

      resourceDayHeaderAlign="center"
      resourceDayHeaderClass={(info) =>
        cn("border-eds-calendar border", info.isMajor && "border-eds-secondary")
      }
      resourceDayHeaderInnerClass={"mx-1 my-0.5 flex flex-col text-body-14 lg:text-body-12"}
      /* Resource Data Grid
      ------------------------------------------------------------------------------------------- */

      resourceColumnHeaderClass="border border-eds-calendar justify-center"
      resourceColumnHeaderInnerClass="m-2 text-body-14 lg:text-body-12"
      resourceColumnResizerClass="absolute inset-y-0 w-[5px] end-[-3px]"
      resourceGroupHeaderClass="border border-eds-calendar bg-eds-canvas-secondary"
      resourceGroupHeaderInnerClass="m-2 text-body-14 lg:text-body-12"
      resourceCellClass="border border-eds-calendar"
      resourceCellInnerClass="m-2 text-body-14 lg:text-body-12"
      resourceIndentClass="ms-2 -me-1 justify-center"
      resourceExpanderClass="group focus-visible:focus-ring"
      resourceHeaderRowClass="border border-eds-calendar"
      resourceRowClass="border border-eds-calendar"
      resourceColumnDividerClass="border-x border-eds-calendar ps-0.5 bg-eds-canvas-secondary"
      /* Timeline Lane
      ------------------------------------------------------------------------------------------- */

      resourceGroupLaneClass="border border-eds-calendar bg-eds-canvas-secondary"
      resourceLaneClass="border border-eds-calendar"
      resourceLaneBottomClass={(info) => cn(info.options.eventOverlap && "h-3")}
      timelineBottomClass="h-3"
      /* View-Specific Options
      ------------------------------------------------------------------------------------------- */

      views={{
        ...userViews,
        timeline: {
          /* Timeline > Row Event
          --------------------------------------------------------------------------------------- */

          rowEventClass: (info) => cn(info.isEnd && "me-px", "items-center"),
          rowEventBeforeClass: (info) =>
            cn(!info.isStart && `${continuationArrowClass} border-e-eds-accent border-e-[5px]`),
          rowEventAfterClass: (info) =>
            cn(!info.isEnd && `${continuationArrowClass} border-s-eds-accent border-s-[5px]`),
          rowEventInnerClass: (info) => (info.options.eventOverlap ? "py-0.5" : "py-1.5"),
          rowEventTimeClass: "px-0.5",
          rowEventTitleClass: "px-0.5",

          /* Timeline > More-Link
          --------------------------------------------------------------------------------------- */

          rowMoreLinkClass:
            "me-px mb-px border border-transparent print:border-eds-general-constant-black bg-eds-neutral-secondary hover:bg-eds-neutral-secondary-hover print:bg-eds-general-constant-white",
          rowMoreLinkInnerClass: "p-0.5 text-body-14 lg:text-body-12",

          /* Timeline > Slot Header
          --------------------------------------------------------------------------------------- */

          slotHeaderAlign: (info) => (info.isTime ? "start" : "center"),
          slotHeaderClass: (info) => cn("justify-center", !info.level && "overflow-hidden"),
          slotHeaderInnerClass: (info) =>
            cn("text-body-14 lg:text-body-12 mx-2 my-1", info.hasNavLink && "hover:underline"),
          slotHeaderDividerClass: "border-b border-eds-calendar",

          /* Timeline > Now-Indicator
          --------------------------------------------------------------------------------------- */

          nowIndicatorHeaderClass:
            "top-0 -mx-[5px] border-x-[5px] border-x-transparent border-t-[6px] border-t-eds-input-critical",
          nowIndicatorLineClass: "border-s border-eds-input-critical",

          ...userViews?.timeline,
        },
      }}
      {...restOptions}
    />
  );
}
