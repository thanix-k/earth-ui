"use client";

import * as React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Textarea } from "@/registry/default/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

const services = [
  { label: "Deep tissue massage · 60 min", value: "massage" },
  { label: "Physio assessment · 45 min", value: "physio" },
  { label: "Sports recovery · 30 min", value: "recovery" },
];
const slots = ["9:00", "10:30", "12:00", "14:15", "15:45", "17:00"];

export function BookSlotCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 18));
  const [slot, setSlot] = React.useState(["10:30"]);
  const [open, setOpen] = React.useState(false);
  const when = `${date?.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} at ${slot[0] ?? "—"}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a session</CardTitle>
        <CardDescription>Setmore</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select items={services} defaultValue="massage">
          <SelectTrigger className="w-full" aria-label="Service">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <span>with Rhea Kapoor</span>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          {...(date ? { defaultMonth: date } : {})}
          className="mx-auto"
        />
        <ToggleGroup
          variant="outline"
          value={slot}
          onValueChange={setSlot}
          aria-label="Time"
          className="grid w-full grid-cols-3"
        >
          {slots.map((s) => (
            <ToggleGroupItem key={s} value={s}>
              {s}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="w-full" disabled={!slot[0]} />}>
            Continue
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your details</DialogTitle>
              <DialogDescription>{when} with Rhea Kapoor</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="book-name">Full name</FieldLabel>
                <Input id="book-name" defaultValue="Daniel Okafor" />
              </Field>
              <Field>
                <FieldLabel htmlFor="book-email">Email</FieldLabel>
                <Input id="book-email" type="email" defaultValue="daniel@okafor.me" />
              </Field>
              <Field>
                <FieldLabel htmlFor="book-notes">Anything we should know?</FieldLabel>
                <Textarea id="book-notes" placeholder="Old knee injury, left side." />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" />}>Back</DialogClose>
              <Button
                onClick={() => {
                  setOpen(false);
                  toast("Session booked", { description: `${when} with Rhea Kapoor` });
                }}
              >
                Confirm booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
