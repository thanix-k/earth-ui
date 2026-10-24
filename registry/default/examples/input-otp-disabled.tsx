import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/default/ui/input-otp";

export default function InputOTPDisabled() {
  return (
    <InputOTP maxLength={4} defaultValue="27" disabled aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
