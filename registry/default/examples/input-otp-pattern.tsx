"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/default/ui/input-otp";

export default function InputOTPPattern() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} aria-label="Check-in code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
