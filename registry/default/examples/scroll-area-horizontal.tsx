import { ScrollArea, ScrollBar } from "@/registry/default/ui/scroll-area";

const services = [
  "Haircut",
  "Beard trim",
  "Colour",
  "Blow dry",
  "Manicure",
  "Pedicure",
  "Facial",
  "Massage",
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-sm rounded-lg border border-border whitespace-nowrap">
      <div className="flex w-max gap-3 p-4">
        {services.map((service) => (
          <div
            key={service}
            className="flex h-20 w-32 shrink-0 items-end rounded-lg bg-muted p-3 text-sm font-medium text-foreground lg:text-xs"
          >
            {service}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
