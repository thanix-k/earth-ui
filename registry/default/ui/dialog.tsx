"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { useIsMobile } from "@/registry/default/hooks/use-mobile";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-eds-modal-overlay duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

type DialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  /** Below 768px, open as a bottom sheet. Suits short dialogs: a confirmation, a QR code, a share link. */
  isSheetOnPhone?: boolean;
};

function DialogContent(props: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPopup {...props} />
    </DialogPortal>
  );
}

const sheetClasses =
  "inset-x-0 bottom-0 max-h-[80%] max-w-none rounded-t-lg rounded-b-none pb-[calc(--spacing(6)+env(safe-area-inset-bottom))] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-none data-open:slide-in-from-bottom data-closed:slide-out-to-bottom";

// EDS modal: 640px wide, 16px from the viewport edge, 24px side padding,
// 20px top and 24px bottom. As a phone sheet it rises like a bottom Sheet.
// The sheet's classes go after the caller's, so a width meant for the modal
// cannot narrow the sheet. The layout is read here, inside the portal, so a
// closed dialog does not watch the viewport.
function DialogPopup({
  className,
  children,
  showCloseButton = true,
  isSheetOnPhone = false,
  ...props
}: DialogContentProps) {
  const isMobile = useIsMobile();
  const layout = isSheetOnPhone && isMobile ? "sheet" : "dialog";
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      data-layout={layout}
      className={cn(
        "fixed z-50 grid w-full gap-4 overflow-y-auto bg-eds-menu px-6 pt-5 pb-6 text-body-14 text-eds-primary shadow-eds-30 outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        layout === "dialog" &&
          "top-1/2 left-1/2 max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg duration-100 sm:max-w-160 data-open:zoom-in-95 data-closed:zoom-out-95",
        className,
        layout === "sheet" && sheetClasses,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={<Button variant="ghost" className="absolute top-3 right-3" size="icon" />}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 pr-6", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 pt-2 pointer-coarse:gap-3 sm:flex-row sm:items-center sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="ghost" />}>Close</DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-heading-16 text-eds-primary", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-body-14 text-eds-secondary *:[a]:text-eds-link *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-eds-link-hover",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
