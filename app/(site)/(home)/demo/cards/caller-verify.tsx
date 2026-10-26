"use client";

import { CircleCheckIcon, ShieldCheckIcon } from "lucide-react";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/default/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/default/ui/input-otp";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { Spinner } from "@/registry/default/ui/spinner";

type State = "idle" | "checking" | "verified";

export function CallerVerifyCard() {
  const [state, setState] = React.useState<State>("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify patient</CardTitle>
        <CardDescription>WellReceived</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Alert>
          <ShieldCheckIcon />
          <AlertTitle>HIPAA check</AlertTitle>
          <AlertDescription>
            Ask the caller for the 6-digit code texted to their number on file.
          </AlertDescription>
        </Alert>
        <InputOTP
          maxLength={6}
          aria-label="Patient code"
          onChange={() => setState("idle")}
          onComplete={() => {
            setState("checking");
            timer.current = setTimeout(() => setState("verified"), 1200);
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {state === "idle" && (
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        )}
        {state === "checking" && (
          <div className="flex h-10 items-center gap-2 text-eds-secondary">
            <Spinner />
            Matching patient record…
          </div>
        )}
        {state === "verified" && (
          <Alert variant="positive">
            <CircleCheckIcon />
            <AlertTitle>Eleanor Shaw · DOB 03/14/1961</AlertTitle>
            <AlertDescription>Dr. Patel's patient · next visit Dec 2</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
