"use client";

import { CheckIcon, CopyIcon, InfoIcon } from "lucide-react";
import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function InputGroupButtonExample() {
  const [copied, setCopied] = React.useState(false);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <InputGroup>
        <InputGroupInput
          defaultValue="https://glowsalon.setmore.com"
          readOnly
          aria-label="Booking page link"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Copy link"
            onClick={() => {
              navigator.clipboard?.writeText("https://glowsalon.setmore.com");
              setCopied(true);
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton size="icon-xs" aria-label="About coupon codes">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="Coupon code" aria-label="Coupon code" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline">Apply</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
