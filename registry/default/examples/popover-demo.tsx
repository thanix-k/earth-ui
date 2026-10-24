import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Reminders</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Booking reminders</PopoverTitle>
          <PopoverDescription>Customers get an email before each appointment.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-1">
          <Label htmlFor="reminder-hours">Hours before</Label>
          <Input id="reminder-hours" type="number" defaultValue="24" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
