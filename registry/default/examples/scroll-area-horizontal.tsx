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
    <ScrollArea className="w-full max-w-sm rounded-lg border border-eds-secondary whitespace-nowrap">
      <div className="flex w-max gap-3 p-4">
        {services.map((service) => (
          <div
            key={service}
            className="flex h-20 w-32 shrink-0 items-end rounded-lg bg-eds-canvas-tertiary p-3 text-body-14 font-medium text-eds-primary lg:text-body-12"
          >
            {service}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
