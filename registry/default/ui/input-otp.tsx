"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// EDS OTPInput draws each digit as its own text field (40×48, 36×40 from lg)
// 12px apart, rather than one joined strip.
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("group/input-otp flex items-center gap-3", containerClassName)}
      spellCheck={false}
      className={cn("disabled:cursor-default", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-12 w-10 items-center pointer-coarse:min-h-12 pointer-coarse:min-w-11 justify-center rounded-lg border border-eds-input bg-eds-canvas text-heading-16 text-eds-primary transition-colors duration-300 ease-[ease] outline-none lg:h-10 lg:w-9 lg:text-heading-14",
        "aria-invalid:border-eds-input-critical data-[active=true]:z-10 data-[active=true]:border-eds-input-active data-[active=true]:inset-ring-1 data-[active=true]:inset-ring-eds-input-active",
        "group-has-disabled/input-otp:border-eds-input-disabled group-has-disabled/input-otp:bg-eds-neutral-disabled group-has-disabled/input-otp:text-eds-disabled-secondary",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-current duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="input-otp-separator"
      className="flex items-center text-eds-tertiary [&_svg:not([class*='size-'])]:size-4"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
