"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// EDS snackbar: an inverse surface in both colour schemes. Toasts are unstyled
// and painted with eds- tokens, which follow dark mode themselves, so Sonner's
// theme stays "light" (its dark theme leaks description and close colours).
const Toaster = ({ toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-eds-inverse-positive" />,
        info: <InfoIcon className="size-5 text-eds-inverse" />,
        warning: <TriangleAlertIcon className="size-5 text-eds-inverse-caution" />,
        error: <OctagonXIcon className="size-5 text-eds-inverse-critical" />,
        loading: <Loader2Icon className="size-5 animate-spin text-eds-inverse" />,
        close: <XIcon className="size-4" />,
      }}
      style={{ "--width": "360px" } as React.CSSProperties}
      toastOptions={{
        ...toastOptions,
        unstyled: true,
        classNames: {
          toast:
            "group/toast flex min-h-11 w-(--width) items-center gap-2 rounded-lg bg-eds-inverse-secondary px-4 py-2 text-eds-inverse shadow-eds-40 select-none focus-visible:focus-ring",
          content: "flex min-w-0 flex-1 flex-col",
          title: "line-clamp-2 text-body-14 text-eds-inverse lg:text-body-12",
          description:
            "-mt-0.5 line-clamp-2 text-body-14 text-eds-inverse-secondary lg:text-body-12",
          icon: "flex size-5 shrink-0 items-center justify-center",
          actionButton:
            "shrink-0 cursor-pointer rounded-sm px-1 py-0.5 text-body-14 font-semibold text-eds-inverse underline underline-offset-2 outline-none focus-visible:focus-ring lg:text-body-12",
          cancelButton:
            "shrink-0 cursor-pointer rounded-sm px-1 py-0.5 text-body-14 font-semibold text-eds-inverse-secondary outline-none focus-visible:focus-ring lg:text-body-12",
          closeButton:
            "absolute -start-2 -top-2 flex cursor-pointer rounded-full bg-eds-inverse-tertiary p-0.5 text-eds-general-constant-white opacity-0 transition-opacity outline-none group-hover/toast:opacity-100 after:absolute after:inset-0 after:scale-150 after:rounded-full hover:bg-eds-inverse-tertiary-hover focus-visible:opacity-100 focus-visible:focus-ring active:bg-eds-inverse-tertiary-pressed",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
