import { Button } from "@/registry/default/ui/button";
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

const slots = ["9:00 am", "9:30 am", "10:15 am", "11:00 am", "1:30 pm", "2:45 pm"];

export default function DrawerDemo() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Pick a time</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Haircut & style</DrawerTitle>
            <DrawerDescription>Thursday, 6 November with Jordan Lee</DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-3 gap-2 px-6 py-4">
            {slots.map((slot) => (
              <Button key={slot} variant="outline">
                {slot}
              </Button>
            ))}
          </div>
          <DrawerFooter>
            <Button>Continue</Button>
            <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
