import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const slots = ["9:00 am", "9:30 am", "10:00 am", "11:15 am", "2:00 pm"];

export default function CarouselOrientation() {
  return (
    <Carousel opts={{ align: "start" }} orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="-mt-2 h-48">
        {slots.map((slot) => (
          <CarouselItem key={slot} className="basis-1/2 pt-2">
            <div className="flex h-full items-center justify-center rounded-xl border border-eds-secondary bg-eds-canvas p-4 text-heading-16 text-eds-primary">
              {slot}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
