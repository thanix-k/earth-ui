"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { useIsMobile } from "@/registry/default/hooks/use-mobile";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-eds-modal-overlay duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm";
  /** Below 768px, open as a bottom sheet. On by default: confirmations are short. */
  isSheetOnPhone?: boolean;
  /** The sheet's close button. Turn it off when the content draws its own. */
  showCloseButton?: boolean;
};

function AlertDialogContent(props: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPopup {...props} />
    </AlertDialogPortal>
  );
}

const sheetClasses =
  "inset-x-0 bottom-0 max-w-none rounded-t-lg rounded-b-none pb-[calc(--spacing(6)+env(safe-area-inset-bottom))] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[size=default]:sm:max-w-none data-[size=sm]:sm:max-w-none data-open:slide-in-from-bottom data-closed:slide-out-to-bottom";

// EDS alert modal: 480px wide, the dialog's 24px side padding. As a phone
// sheet it rises like a bottom Sheet, with a close button. The sheet's classes
// go after the caller's, so a width meant for the modal cannot narrow the
// sheet. The layout is read here, inside the portal, so a closed alert dialog
// does not watch the viewport.
function AlertDialogPopup({
  className,
  size = "default",
  isSheetOnPhone = true,
  showCloseButton = true,
  children,
  ...props
}: AlertDialogContentProps) {
  const isMobile = useIsMobile();
  const layout = isSheetOnPhone && isMobile ? "sheet" : "dialog";
  return (
    <AlertDialogPrimitive.Popup
      data-slot="alert-dialog-content"
      data-size={size}
      data-layout={layout}
      className={cn(
        "group/alert-dialog-content fixed z-50 grid w-full gap-4 bg-eds-menu px-6 pt-5 pb-6 text-eds-primary shadow-eds-30 outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        layout === "dialog" &&
          "top-1/2 left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg duration-100 data-[size=default]:sm:max-w-120 data-[size=sm]:sm:max-w-80 data-open:zoom-in-95 data-closed:zoom-out-95",
        className,
        layout === "sheet" && sheetClasses,
      )}
      {...props}
    >
      {children}
      {layout === "sheet" && showCloseButton && (
        <AlertDialogPrimitive.Close
          data-slot="alert-dialog-close"
          render={<Button variant="ghost" className="absolute top-3 right-3" size="icon" />}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </AlertDialogPrimitive.Close>
      )}
    </AlertDialogPrimitive.Popup>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-start gap-2 text-left group-data-[size=default]/alert-dialog-content:pr-6 has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 group-data-[size=sm]/alert-dialog-content:place-items-center group-data-[size=sm]/alert-dialog-content:text-center sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 pt-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 md:flex-row md:items-center md:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-eds-neutral-secondary text-eds-primary sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-heading-16 text-eds-primary sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-body-14 text-eds-secondary lg:text-body-12 *:[a]:text-eds-link *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-eds-link-hover",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

// EDS alert modals cancel with a tertiary (ghost) button.
function AlertDialogCancel({
  className,
  variant = "ghost",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
