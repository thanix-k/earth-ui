import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const staff = ["Maya", "Jordan", "Priya", "Sam", "Alex", "Noah"];

export default function CarouselSize() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
      <CarouselContent>
        {staff.map((name) => (
          <CarouselItem key={name} className="basis-1/2 lg:basis-1/3">
            <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-eds-secondary bg-eds-canvas p-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-eds-avatar text-body-14 font-medium text-eds-primary">
                {name[0]}
              </span>
              <span className="text-body-12 text-eds-primary">{name}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
