import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/default/ui/input-otp";

export default function InputOTPInvalid() {
  return (
    <Field className="w-fit" data-invalid>
      <FieldLabel htmlFor="sms-code">Code sent to •••• 4821</FieldLabel>
      <InputOTP id="sms-code" maxLength={4} defaultValue="1234">
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid />
          <InputOTPSlot index={1} aria-invalid />
          <InputOTPSlot index={2} aria-invalid />
          <InputOTPSlot index={3} aria-invalid />
        </InputOTPGroup>
      </InputOTP>
      <FieldError>That code didn't match. Try again.</FieldError>
    </Field>
  );
}
