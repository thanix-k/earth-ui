"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlertIcon } from "lucide-react";
import type * as React from "react";
import { useMemo } from "react";
import { cn } from "@/registry/default/lib/utils";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 text-eds-primary has-[>[data-slot=checkbox-group]]:gap-2 has-[>[data-slot=radio-group]]:gap-2",
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-2 text-eds-primary data-[variant=label]:text-body-14 data-[variant=legend]:text-body-16 data-[variant=legend]:font-medium lg:data-[variant=label]:text-body-12",
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-2 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
}

// EDS fields stack the label, control and message 4px apart. Horizontal
// fields (a checkbox or switch next to its label) use an 8px gap.
const fieldVariants = cva("group/field flex w-full min-w-auto", {
  variants: {
    orientation: {
      vertical: "flex-col gap-1 *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center gap-2 has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio],[role=switch]]:mt-px lg:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio],[role=switch]]:mt-0.5",
      responsive:
        "flex-col gap-1 *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-2 @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio],[role=switch]]:mt-px lg:@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio],[role=switch]]:mt-0.5",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"fieldset"> & VariantProps<typeof fieldVariants>) {
  return (
    <fieldset
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col", className)}
      {...props}
    />
  );
}

// A FieldLabel that wraps a whole Field becomes an EDS select card.
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 group-data-[disabled=true]/field:text-eds-disabled",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:cursor-pointer has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-eds-input has-[>[data-slot=field]]:transition-colors has-[>[data-slot=field]]:duration-300 has-[>[data-slot=field]]:ease-[ease] has-[>[data-slot=field]]:hover:border-eds-input-hover *:data-[slot=field]:p-3 lg:*:data-[slot=field]:p-2",
        "has-[>[data-slot=field]]:has-data-checked:border-eds-input-active has-[>[data-slot=field]]:has-data-checked:hover:border-eds-input-active",
        "has-[>[data-slot=field]]:has-data-disabled:cursor-default has-[>[data-slot=field]]:has-data-disabled:border-eds-input-disabled has-[>[data-slot=field]]:has-data-disabled:bg-eds-neutral-disabled has-[>[data-slot=field]]:has-data-disabled:hover:border-eds-input-disabled",
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-body-14 font-medium text-eds-primary group-data-[disabled=true]/field:text-eds-disabled group-has-data-disabled/field-label:text-eds-disabled lg:text-body-12",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-body-14 text-eds-secondary group-data-[orientation=horizontal]/field:text-balance group-data-[disabled=true]/field:text-eds-disabled group-has-data-disabled/field-label:text-eds-disabled lg:text-body-12 [[data-variant=legend]+&]:-mt-2",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:text-eds-link [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-eds-link-hover",
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-body-14 group-data-[variant=outline]/field-group:-mb-2 lg:text-body-12",
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-eds-canvas px-2 text-eds-secondary"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

// EDS field messages lead with an error icon aligned to the first line.
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error) => error?.message && <li key={error.message}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        "flex gap-1 text-body-14 text-eds-critical group-data-[disabled=true]/field:text-eds-disabled lg:text-body-12",
        className,
      )}
      {...props}
    >
      <CircleAlertIcon aria-hidden="true" className="mt-px size-5 shrink-0 lg:mt-0.5 lg:size-4" />
      <div className="min-w-0 flex-1">{content}</div>
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
