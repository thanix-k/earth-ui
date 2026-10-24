import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
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

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Edit staff</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit staff</SheetTitle>
          <SheetDescription>Update how Jordan appears on your booking page.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-4 px-6">
          <div className="grid gap-1">
            <Label htmlFor="staff-name">Name</Label>
            <Input id="staff-name" defaultValue="Jordan Lee" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="staff-email">Email</Label>
            <Input id="staff-email" type="email" defaultValue="jordan@glowsalon.com" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
