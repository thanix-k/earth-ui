"use client";

import * as React from "react";
import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

export default function SliderControlled() {
  const [value, setValue] = React.useState([15]);

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="booking-notice">Minimum booking notice</Label>
        <span className="text-body-14 text-eds-secondary lg:text-body-12">{value[0]} hours</span>
      </div>
      <Slider
        id="booking-notice"
        value={value}
        onValueChange={(next) => setValue(Array.isArray(next) ? [...next] : [next])}
        max={48}
      />
    </div>
  );
}
