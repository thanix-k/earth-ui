import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const sides = ["top", "right", "bottom", "left"] as const;

export default function SheetSide() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" className="capitalize" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Booking filters</SheetTitle>
              <SheetDescription>Show appointments by staff, service and status.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button />}>Apply filters</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
