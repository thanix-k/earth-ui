"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { type DayButton, DayPicker, getDefaultClassNames, type Locale } from "react-day-picker";
import { cn } from "@/registry/default/lib/utils";
import { Button, buttonVariants } from "@/registry/default/ui/button";

// Sizes follow EDS's standard calendar: 44px days, 40px nav buttons, 14px
// text. Override --cell-size, --nav-size and the text size for EDS's small one.
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  const isMultiMonth = (props.numberOfMonths ?? 1) > 1;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-eds-canvas p-3 text-body-14 text-eds-primary [--cell-radius:var(--radius-sm)] [--cell-size:--spacing(11)] [--nav-size:--spacing(10)] pointer-coarse:[--cell-size:--spacing(11)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        formatWeekdayName: (date) => date.toLocaleString(locale?.code, { weekday: "narrow" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-8 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-1.5", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center gap-1",
          isMultiMonth ? "justify-between" : "justify-end",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--nav-size) p-0 select-none aria-disabled:pointer-events-none aria-disabled:bg-transparent aria-disabled:text-eds-disabled",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--nav-size) p-0 select-none aria-disabled:pointer-events-none aria-disabled:bg-transparent aria-disabled:text-eds-disabled",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--nav-size) w-full items-center",
          isMultiMonth
            ? "justify-center px-(--nav-size)"
            : "justify-start pe-[calc(var(--nav-size)*2)]",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--nav-size) w-full items-center gap-1 font-semibold",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-full transition-colors duration-300 ease-[ease] hover:bg-eds-neutral-hover has-focus-visible:focus-ring",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer bg-eds-menu opacity-0 pointer-coarse:-inset-y-1.5",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "font-semibold select-none",
          captionLayout === "label"
            ? "px-3"
            : "flex h-8 items-center gap-1 rounded-full ps-3 pe-2 [&>svg]:size-3.5 [&>svg]:text-eds-icon-secondary",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex h-(--cell-size) flex-1 items-center justify-center font-normal text-eds-secondary select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full first:mt-0", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn("text-eds-tertiary select-none", defaultClassNames.week_number),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center text-eds-primary select-none data-disabled:cursor-not-allowed data-outside:text-eds-secondary [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)",
          defaultClassNames.day,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarRoot({
  className,
  rootRef,
  ...props
}: React.ComponentProps<"div"> & { rootRef?: React.Ref<HTMLDivElement> }) {
  return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
}

function CalendarChevron({
  className,
  orientation,
  ...props
}: React.ComponentProps<"svg"> & { orientation?: "up" | "down" | "left" | "right" }) {
  if (orientation === "left") {
    return <ChevronLeftIcon className={cn("size-5", className)} {...props} />;
  }

  if (orientation === "right") {
    return <ChevronRightIcon className={cn("size-5", className)} {...props} />;
  }

  return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
}

function CalendarWeekNumber({
  children,
  week: _week,
  ...props
}: React.ComponentProps<"td"> & { week?: unknown }) {
  return (
    <td {...props}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">
        {children}
      </div>
    </td>
  );
}

// EDS day states: a solid inverse fill for the selected day and range ends, a
// neutral band between them, and a short underline under today.
function CalendarDayButton({
  className,
  day,
  modifiers,
  locale: _locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.isoDate}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-(--cell-radius) border-0 text-current leading-none font-normal focus-visible:z-10 data-disabled:pointer-events-none [&>span]:text-body-10 [&>span]:text-eds-secondary",
        "data-[selected-single=true]:bg-eds-inverse data-[selected-single=true]:font-medium data-[selected-single=true]:text-eds-inverse data-[selected-single=true]:hover:bg-eds-inverse data-[selected-single=true]:active:bg-eds-inverse",
        "data-[range-end=true]:bg-eds-inverse data-[range-end=true]:font-medium data-[range-end=true]:text-eds-inverse data-[range-end=true]:hover:bg-eds-inverse data-[range-end=true]:active:bg-eds-inverse data-[range-end=true]:data-[range-start=false]:rounded-s-none",
        "data-[range-start=true]:bg-eds-inverse data-[range-start=true]:font-medium data-[range-start=true]:text-eds-inverse data-[range-start=true]:hover:bg-eds-inverse data-[range-start=true]:active:bg-eds-inverse data-[range-start=true]:data-[range-end=false]:rounded-e-none",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-eds-neutral-active data-[range-middle=true]:text-eds-primary data-[range-middle=true]:hover:bg-eds-neutral-active data-[range-middle=true]:active:bg-eds-neutral-active",
        "group-data-today/day:font-semibold! group-data-today/day:after:absolute group-data-today/day:after:top-1/2 group-data-today/day:after:left-1/2 group-data-today/day:after:h-0.5 group-data-today/day:after:w-3 group-data-today/day:after:-translate-x-1/2 group-data-today/day:after:translate-y-2 group-data-today/day:after:rounded-full group-data-today/day:after:bg-eds-inverse",
        "group-data-today/day:data-[range-end=true]:after:bg-eds-canvas group-data-today/day:data-[range-start=true]:after:bg-eds-canvas group-data-today/day:data-[selected-single=true]:after:bg-eds-canvas",
        "group-data-today/day:data-disabled:bg-eds-neutral-disabled group-data-today/day:data-disabled:after:bg-eds-neutral-tertiary-hover",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
