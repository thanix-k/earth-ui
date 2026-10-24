import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const services = [
  { name: "Haircut & style", duration: "45 min", price: "$55" },
  { name: "Colour refresh", duration: "90 min", price: "$120" },
  { name: "Beard trim", duration: "20 min", price: "$25" },
  { name: "Scalp treatment", duration: "30 min", price: "$40" },
  { name: "Blow-dry", duration: "30 min", price: "$35" },
];

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {services.map((service) => (
          <CarouselItem key={service.name}>
            <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-eds-secondary bg-eds-canvas p-6">
              <span className="text-heading-20 text-eds-primary">{service.name}</span>
              <span className="text-body-14 text-eds-secondary">
                {service.duration} · {service.price}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
