import FullCalendar, { type CalendarOptions } from "@fullcalendar/react";
import "@fullcalendar/react/skeleton.css";
import { cn } from "@/registry/default/lib/utils";

const blockPointerResizerClass = "absolute hidden group-hover:block";
const rowPointerResizerClass = `${blockPointerResizerClass} inset-y-0 w-2`;
const columnPointerResizerClass = `${blockPointerResizerClass} inset-x-0 h-2`;

const blockTouchResizerClass =
  "absolute size-2 border border-(--fc-event-color) bg-eds-canvas rounded-full";
const rowTouchResizerClass = `${blockTouchResizerClass} top-1/2 -mt-1`;
const columnTouchResizerClass = `${blockTouchResizerClass} left-1/2 -ml-1`;

export const getDayClass = (info: { isMajor: boolean; isDisabled: boolean }) =>
  cn(
    "border-eds-calendar border",
    info.isMajor && "border-eds-secondary",
    info.isDisabled && "bg-eds-calendar-disabled",
  );

/*
 * The cascade (D-calendar-overlap-cards-1). FullCalendar 7 positions each column event in a wrapper it styles
 * inline and gives no class hook (its v6 upgrade notes: `.fc-timegrid-event-harness` has "No Replacement"), so
 * the lane reaches it as the child holding a `cascade-card`. Every stair ends at the lane's end, without the
 * 20 px FullCalendar leaves after a stacked card, and the one under the pointer or keyboard focus rises over the
 * stairs after it; z-index alone, so nothing moves, mid-drag included. 999 stays under a touch-selected card
 * (FullCalendar adds 1000). `!` outranks the inline style.
 */
const cascadeLaneClass = cn(
  "[&>:has(>.cascade-card)]:end-0! [&>:has(>.cascade-card)]:me-0!",
  "[&>:has(>.cascade-card):focus-within]:z-999! [&>:has(>.cascade-card):hover]:z-999!",
);

const getSlotClass = (info: { isMinor: boolean }) =>
  cn("border-eds-calendar border", info.isMinor && "border-dotted");

const dayRowCommonClasses: CalendarOptions = {
  /* Day Row > List-Item Event
  ----------------------------------------------------------------------------------------------- */

  listItemEventClass: (info) =>
    cn(
      "mb-px rounded-sm p-px",
      info.isNarrow ? "mx-px" : "mx-0.5",
      info.isSelected
        ? ["bg-eds-canvas-secondary", info.isDragging && "shadow-eds-10"]
        : "hover:bg-eds-neutral-hover",
    ),
  listItemEventBeforeClass: (info) => cn("border-4", info.isNarrow ? "mx-px" : "mx-1"),
  listItemEventInnerClass: "flex flex-row items-center gap-0.5 py-px text-body-14 lg:text-body-12",
  listItemEventTimeClass: "px-px whitespace-nowrap overflow-hidden shrink-1",
  listItemEventTitleClass: "px-px font-semibold whitespace-nowrap overflow-hidden shrink-100",

  /* Day Row > Row Event
  ----------------------------------------------------------------------------------------------- */

  rowEventClass: (info) =>
    cn(
      info.isStart && ["rounded-s-sm", info.isNarrow ? "ms-px" : "ms-0.5"],
      info.isEnd && ["rounded-e-sm", info.isNarrow ? "me-px" : "me-0.5"],
    ),
  rowEventInnerClass: "py-px gap-0.5",
  rowEventTimeClass: "px-px",
  rowEventTitleClass: "px-px",

  /* Day Row > More-Link
  ----------------------------------------------------------------------------------------------- */

  rowMoreLinkClass: (info) =>
    cn(
      "hover:bg-eds-neutral-hover mb-px rounded-sm border",
      info.isNarrow ? "mx-px max-w-full" : "mx-0.5 self-start",
      "border-transparent",
    ),
  rowMoreLinkInnerClass: "max-w-full truncate p-px text-body-14 lg:text-body-12",
};

/**
 * Edited after `shadcn add` of the FullCalendar event-calendar theme: CA-DR-02, CA-VW-39, legacy's ghost
 * (`util/calendarFunctionalHooks.jsx:572-597`, `scss/calendar-page-mfe.scss:101-138`). While a booking is dragged,
 * FullCalendar hides its card where it was, and its copies in other Team columns; legacy keeps them, in the colour's
 * dark shade at half opacity, under the card that follows the pointer. The dark shade is `--ghost-fill`, which the
 * calendar sets to the colour's `--event-<colour>-border` (`ghostFill`, `rules/event-colour.ts`), else the card's own
 * fill; the ink is the open card's rule (`activeColours`, `rules/events.ts`).
 * Re-apply after regenerating.
 */
export function isGhost(info: { isDragging: boolean; isMirror: boolean }): boolean {
  return info.isDragging && !info.isMirror;
}

const GHOST_INK =
  "[--fc-event-contrast-color:oklch(from_var(--ghost-fill,var(--fc-event-color))_clamp(0,(0.59_-_l)_*_1000,1)_0_0)]";

export function blockEventClass(info: {
  isDragging: boolean;
  isMirror: boolean;
  isSelected: boolean;
}): string {
  return cn(
    "group print:bg-eds-general-constant-white relative border-transparent bg-(--fc-event-color) print:border-(--fc-event-color)",
    "hover:not-[.is-open,.is-time-off]:bg-[oklch(from_var(--fc-event-color)_calc(l_-_0.06)_calc(c_*_2)_h)]",
    isGhost(info)
      ? "visible bg-[var(--ghost-fill,var(--fc-event-color))] opacity-50"
      : info.isDragging && !info.isSelected && "opacity-75",
  );
}

export type EventCalendarViewProps = CalendarOptions &
  Required<Pick<CalendarOptions, "popoverCloseContent">>; // ensure callers define icons

export function EventCalendarViews({ views: userViews, ...restOptions }: EventCalendarViewProps) {
  return (
    <FullCalendar
      /* Abstract Event
      ----------------------------------------------------------------------------------------- */

      eventColor="var(--eds-background-accent)"
      eventContrastColor="var(--eds-text-onPrimary)"
      eventClass={(info) =>
        cn(
          info.isSelected
            ? [
                "outline-(color:--eds-border-focus) outline-2",
                info.isDragging ? "shadow-eds-30" : "shadow-eds-20",
              ]
            : "focus-visible:focus-ring",
        )
      }
      /* Background Event
      ----------------------------------------------------------------------------------------- */

      backgroundEventColor="var(--eds-chart-accent-500)"
      backgroundEventClass="not-print:bg-[color-mix(in_oklab,var(--fc-event-color)_10%,transparent)] print:border-1 print:border-(--fc-event-color)"
      backgroundEventTitleClass={(info) =>
        cn(
          "italic opacity-50",
          info.isNarrow
            ? "text-body-14 lg:text-body-12 p-0.5"
            : "text-body-14 lg:text-body-12 p-1.5",
        )
      }
      /* List-Item Event
      ----------------------------------------------------------------------------------------- */

      listItemEventClass="items-center"
      listItemEventBeforeClass="border-(--fc-event-color) rounded-full"
      /* Block Event
      ----------------------------------------------------------------------------------------- */

      blockEventClass={blockEventClass}
      blockEventInnerClass={(info) =>
        cn(
          "print:text-eds-general-constant-black text-(--fc-event-contrast-color)",
          isGhost(info) && GHOST_INK,
        )
      }
      blockEventTimeClass="whitespace-nowrap overflow-hidden shrink-1"
      blockEventTitleClass="whitespace-nowrap overflow-hidden shrink-100"
      /* Row Event
      ----------------------------------------------------------------------------------------- */

      rowEventClass={(info) =>
        cn("mb-px border-y", info.isStart && "border-s", info.isEnd && "border-e")
      }
      rowEventBeforeClass={(info) =>
        cn(
          info.isStartResizable && [
            info.isSelected ? rowTouchResizerClass : rowPointerResizerClass,
            "-start-1",
          ],
        )
      }
      rowEventAfterClass={(info) =>
        cn(
          info.isEndResizable && [
            info.isSelected ? rowTouchResizerClass : rowPointerResizerClass,
            "-end-1",
          ],
        )
      }
      rowEventInnerClass="flex flex-row items-center text-body-14 lg:text-body-12"
      rowEventTimeClass="font-semibold"
      /* Column Event
      ----------------------------------------------------------------------------------------- */

      columnEventClass={(info) =>
        cn(
          "ring-eds-canvas border-x ring",
          info.isStart && "rounded-t-sm border-t",
          info.isEnd && "mb-px rounded-b-sm border-b",
          // The lane finds the card's positioned wrapper by this (`cascadeLaneClass`).
          "cascade-card",
          // A stair over another booking parts from it with a canvas-coloured seam and a soft shadow.
          info.level > 0 && "shadow-[-2px_0_0_var(--eds-background-canvas),var(--eds-shadow-10)]",
        )
      }
      columnEventBeforeClass={(info) =>
        cn(
          info.isStartResizable && [
            info.isSelected ? columnTouchResizerClass : columnPointerResizerClass,
            "-top-1",
          ],
        )
      }
      columnEventAfterClass={(info) =>
        cn(
          info.isEndResizable && [
            info.isSelected ? columnTouchResizerClass : columnPointerResizerClass,
            "-bottom-1",
          ],
        )
      }
      columnEventInnerClass={(info) =>
        cn("flex", info.isShort ? "flex-row items-center gap-1 p-0.5" : "flex-col px-0.5")
      }
      columnEventTimeClass={(info) => cn(!info.isShort && "pt-0.5", "text-body-14 lg:text-body-12")}
      columnEventTitleClass={(info) =>
        cn(!info.isShort && "py-0.5", info.isShort || "text-body-14 lg:text-body-12")
      }
      /* More-Link
      ----------------------------------------------------------------------------------------- */

      moreLinkClass="focus-visible:focus-ring"
      moreLinkInnerClass="whitespace-nowrap overflow-hidden"
      columnMoreLinkClass="mb-px rounded-sm border border-transparent print:border-eds-general-constant-black bg-eds-neutral-secondary hover:bg-eds-neutral-secondary-hover print:bg-eds-general-constant-white ring ring-eds-canvas"
      columnMoreLinkInnerClass="p-0.5 text-body-14 lg:text-body-12"
      /* Day Header
      ----------------------------------------------------------------------------------------- */

      dayHeaderAlign={(info) => (info.inPopover ? "start" : "center")}
      dayHeaderClass={(info) =>
        cn(
          "justify-center",
          info.isDisabled && "bg-eds-calendar-disabled",
          info.inPopover
            ? "border-eds-secondary bg-eds-canvas-secondary border-b"
            : ["border-eds-calendar border", info.isMajor && "border-eds-secondary"],
        )
      }
      dayHeaderInnerClass="mx-1 my-1.5 flex flex-col text-body-14 lg:text-body-12 pointer-coarse:justify-center"
      dayHeaderDividerClass="border-b border-eds-calendar"
      /* Day Cell
      ----------------------------------------------------------------------------------------- */

      dayCellClass={getDayClass}
      dayCellTopClass={(info) =>
        cn(info.isNarrow ? "min-h-px" : "min-h-0.5", "flex flex-row justify-start")
      }
      dayCellTopInnerClass={(info) =>
        cn(
          "mx-2 whitespace-nowrap pointer-coarse:px-2",
          info.isNarrow
            ? "text-body-14 lg:text-body-12 my-0.5"
            : "text-body-14 lg:text-body-12 my-2",
          info.isOther && "text-eds-secondary",
          info.monthText && "font-semibold",
        )
      }
      dayCellInnerClass={(info) => cn(info.inPopover && "p-2")}
      /* Popover
      ----------------------------------------------------------------------------------------- */

      popoverClass="m-1 min-w-55 overflow-hidden rounded-lg border border-eds-secondary bg-eds-menu text-eds-primary shadow-eds-20"
      popoverCloseClass="group absolute top-0.5 end-0.5 focus-visible:focus-ring"
      /* Lane
      ----------------------------------------------------------------------------------------- */

      dayLaneClass={getDayClass}
      dayLaneInnerClass={(info) =>
        info.isStack ? "m-1" : cn(info.isNarrow ? "mx-px" : "ms-0.5 me-[2.5%]", cascadeLaneClass)
      }
      slotLaneClass={getSlotClass}
      /* List Day
      ----------------------------------------------------------------------------------------- */

      listDayHeaderClass="-mb-px border-b border-eds-secondary bg-eds-neutral-secondary flex flex-row items-center justify-between"
      listDayHeaderInnerClass="px-3 py-2 text-body-14 lg:text-body-12 font-semibold"
      /* Single Month (in Multi-Month)
      ----------------------------------------------------------------------------------------- */

      singleMonthClass={(info) =>
        cn(
          info.multiMonthColumns > 1 && "m-4",
          info.multiMonthColumns === 1 && !info.isLast && "border-eds-secondary border-b",
        )
      }
      singleMonthHeaderClass={(info) =>
        cn(
          info.multiMonthColumns > 1 ? "pb-4" : "border-eds-secondary bg-eds-canvas border-b py-2",
          "items-center",
        )
      }
      singleMonthHeaderInnerClass="text-body-16 font-semibold"
      /* Misc Table
      ----------------------------------------------------------------------------------------- */

      tableHeaderClass="bg-eds-canvas"
      fillerClass="border border-eds-calendar opacity-50"
      dayHeaderRowClass="border border-eds-calendar"
      dayRowClass="border border-eds-calendar"
      slotHeaderRowClass="border border-eds-calendar"
      slotHeaderClass={getSlotClass}
      /* Misc Content
      ----------------------------------------------------------------------------------------- */

      // Edited after `shadcn add` of the FullCalendar event-calendar theme: on a touch screen a day's link, the Week
      // header's date and the Month cell's number, is a 44 px target, the owner's floor (2026-09-29): its margin
      // goes so the Week header's 44 px column holds it, the date centred in it and the number inset top-left as
      // before (`dayHeaderInnerClass`, `dayCellTopInnerClass`). Re-apply after regenerating.
      navLinkClass="hover:underline focus-visible:outline-2 focus-visible:outline-(color:--eds-border-focus) -outline-offset-3 pointer-coarse:m-0 pointer-coarse:flex pointer-coarse:min-h-11 pointer-coarse:min-w-11 pointer-coarse:items-center"
      inlineWeekNumberClass={
        "absolute start-0 top-0 rounded-ee-sm bg-eds-canvas-secondary p-0.5 text-center text-eds-secondary text-body-14 lg:text-body-12"
      }
      // Legacy's closed hours are `#f0f0f0` on white (`$background-neutral-disabled`); 3% read `#f7f7f7` (QA-CAL-17).
      // `non-business` names the fill, so the calendar can hide the one FullCalendar 7 puts in an all-day cell (CA-VW-02).
      nonBusinessHoursClass="non-business bg-eds-neutral-disabled"
      highlightClass="bg-eds-chart-accent-100"
      /* View-Specific Options
      ----------------------------------------------------------------------------------------- */

      views={{
        ...userViews,
        dayGrid: {
          ...dayRowCommonClasses,
          dayCellBottomClass: "min-h-px",
          ...userViews?.dayGrid,
        },
        multiMonth: {
          ...dayRowCommonClasses,
          dayCellBottomClass: "min-h-px",
          tableClass: (info) => cn(info.multiMonthColumns > 1 && "border-eds-calendar border"),
          ...userViews?.multiMonth,
        },
        timeGrid: {
          ...dayRowCommonClasses,
          dayCellBottomClass: "min-h-3",

          /* TimeGrid > Week Number Header
          ------------------------------------------------------------------------------------- */

          weekNumberHeaderClass: "items-center justify-end",
          weekNumberHeaderInnerClass: "mx-1 my-0.5 text-body-14 lg:text-body-12",

          /* TimeGrid > All-Day Header
          ------------------------------------------------------------------------------------- */

          allDayHeaderClass: "items-center justify-end",
          allDayHeaderInnerClass: "mx-1 my-2 text-end text-body-14 lg:text-body-12",
          allDayDividerClass: "border-b border-eds-calendar",

          /* TimeGrid > Slot Header
          ------------------------------------------------------------------------------------- */

          slotHeaderClass: "justify-end",
          slotHeaderInnerClass: "mx-1 my-0.5 text-eds-secondary text-body-14 lg:text-body-10",
          slotHeaderDividerClass: "border-e border-eds-calendar",

          /* TimeGrid > Now-Indicator
          ------------------------------------------------------------------------------------- */

          nowIndicatorHeaderClass:
            "start-0.5 -mt-2.5 rounded-sm bg-eds-accent px-1 font-semibold text-body-14 text-eds-onPrimary lg:text-body-12",
          nowIndicatorLineClass: "border-t-2 border-eds-accent",
          nowIndicatorDotClass: "-mt-1 h-[9px] w-0.5 bg-eds-accent",

          ...userViews?.timeGrid,
        },
        list: {
          listDayClass: (info) =>
            cn(!info.isLast && "border-eds-secondary border-b", "flex flex-col"),

          /* List-View > List-Item Event
          ------------------------------------------------------------------------------------- */

          listItemEventClass: (info) =>
            cn(
              "group border-eds-secondary hover:bg-eds-neutral-hover gap-3 border-t px-3 py-2",
              info.isInteractive && "focus-visible:bg-eds-neutral-hover -outline-offset-3",
            ),
          listItemEventBeforeClass: "border-5",
          listItemEventInnerClass: "[display:contents]",
          listItemEventTimeClass:
            "-order-1 shrink-0 w-1/2 max-w-50 whitespace-nowrap overflow-hidden text-ellipsis text-body-14 lg:text-body-12",
          listItemEventTitleClass: (info) =>
            cn(
              "text-body-14 lg:text-body-12 min-w-0 grow overflow-hidden whitespace-nowrap",
              info.event.url && "group-hover:underline",
            ),

          /* No-Events Screen
          ------------------------------------------------------------------------------------- */

          noEventsClass: "bg-eds-canvas-secondary flex flex-col items-center justify-center",
          noEventsInnerClass: "sticky bottom-0 py-15",

          ...userViews?.list,
        },
      }}
      {...restOptions}
    />
  );
}
