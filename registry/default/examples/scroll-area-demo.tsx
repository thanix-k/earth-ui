import { Fragment } from "react";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Separator } from "@/registry/default/ui/separator";

const times = Array.from({ length: 20 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  const hour = Math.floor(minutes / 60);
  const minute = String(minutes % 60).padStart(2, "0");
  return `${hour > 12 ? hour - 12 : hour}:${minute} ${hour >= 12 ? "pm" : "am"}`;
});

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-lg border border-eds-secondary">
      <div className="p-4 text-body-14 text-eds-primary lg:text-body-12">
        <div className="mb-4 text-heading-14 lg:text-heading-12">Open slots</div>
        {times.map((time) => (
          <Fragment key={time}>
            <div>{time}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
