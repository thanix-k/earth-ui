"use client";

import { ArmchairIcon, type LucideIcon, PresentationIcon, UsersIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { AspectRatio } from "@/registry/default/ui/aspect-ratio";
import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

const spaces: { name: string; seats: string; price: number; icon: LucideIcon; tint: string }[] = [
  {
    name: "Hot desk",
    seats: "1 seat",
    price: 25,
    icon: ArmchairIcon,
    tint: "bg-eds-palette-green-background",
  },
  {
    name: "Meeting room",
    seats: "6 seats",
    price: 40,
    icon: UsersIcon,
    tint: "bg-eds-palette-blue-background",
  },
  {
    name: "Event space",
    seats: "40 seats",
    price: 120,
    icon: PresentationIcon,
    tint: "bg-eds-palette-orange-background",
  },
];
const lengths = ["Half day", "Full day", "Week"] as const;
const multiplier = { "Half day": 1, "Full day": 1.8, Week: 7 };

export function BookDeskCard() {
  const [space, setSpace] = React.useState(0);
  const [length, setLength] = React.useState<(typeof lengths)[number]>("Full day");
  const s = spaces[space];
  const total = Math.round(s.price * multiplier[length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a space · Rutland St</CardTitle>
        <CardDescription>Listerplace</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Carousel className="mx-10">
          <CarouselContent>
            {spaces.map((sp, i) => (
              <CarouselItem key={sp.name}>
                <button type="button" className="w-full text-left" onClick={() => setSpace(i)}>
                  <AspectRatio
                    ratio={16 / 9}
                    className={cn(
                      "flex items-center justify-center rounded-lg",
                      sp.tint,
                      i === space && "ring-2 ring-eds-focus",
                    )}
                  >
                    <sp.icon className="size-10 text-eds-secondary" />
                  </AspectRatio>
                  <div className="mt-2 flex justify-between">
                    <span className="text-heading-14 lg:text-heading-12">{sp.name}</span>
                    <span className="text-eds-secondary">{sp.seats}</span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <ButtonGroup aria-label="Length" className="w-full *:flex-1">
          {lengths.map((l) => (
            <Button
              key={l}
              variant="outline"
              aria-pressed={l === length}
              onClick={() => setLength(l)}
            >
              {l}
            </Button>
          ))}
        </ButtonGroup>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-heading-16 lg:text-heading-14">£{total}</span>
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button />}>Reserve</DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  {s.name}, {length.toLowerCase()}
                </DrawerTitle>
                <DrawerDescription>
                  11 Rutland St, Edinburgh · Thu 19 Nov · £{total} incl. coffee & Wi-Fi
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose render={<Button />}>Confirm reservation</DrawerClose>
                <DrawerClose render={<Button variant="ghost" />}>Not now</DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}
