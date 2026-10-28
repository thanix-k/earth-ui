"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

const bookings = [
  { time: "9:00 am", customer: "Ava Thompson", service: "Haircut" },
  { time: "10:30 am", customer: "Liam Chen", service: "Beard trim" },
  { time: "1:00 pm", customer: "Sofia Rossi", service: "Colour" },
] as const;

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex w-full max-w-xs flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="text-heading-14 text-eds-primary lg:text-heading-12">Today's bookings</div>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Toggle" />}>
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <BookingRow {...bookings[0]} />
      <CollapsibleContent className="flex flex-col gap-2">
        {bookings.slice(1).map((booking) => (
          <BookingRow key={booking.time} {...booking} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function BookingRow({
  time,
  customer,
  service,
}: {
  time: string;
  customer: string;
  service: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-eds-secondary px-4 py-2 text-body-14 text-eds-primary lg:text-body-12">
      <span>
        {customer} · {service}
      </span>
      <span className="text-eds-secondary">{time}</span>
    </div>
  );
}
