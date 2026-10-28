import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const bookings = [
  {
    initials: "MR",
    name: "Maya Reed",
    service: "Haircut and style",
    time: "9:30 AM",
    status: "Confirmed",
  },
  {
    initials: "JO",
    name: "James Okafor",
    service: "Beard trim",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    initials: "SL",
    name: "Sofia Lind",
    service: "Colour consult",
    time: "2:15 PM",
    status: "Confirmed",
  },
] as const;

export default function BuildAProductDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Today’s bookings</CardTitle>
        <CardDescription>3 appointments · Thursday</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View calendar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {bookings.map((booking) => (
          <div key={booking.name} className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{booking.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-body-14 text-eds-primary">{booking.name}</span>
              <span className="truncate text-body-12 text-eds-secondary">
                {booking.service} · {booking.time}
              </span>
            </div>
            <Badge variant={booking.status === "Confirmed" ? "positive" : "caution"}>
              {booking.status}
            </Badge>
          </div>
        ))}
        <Separator className="my-1" />
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="online-booking">Accept online bookings</Label>
          <Switch id="online-booking" defaultChecked />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Share link</Button>
        <Button>New booking</Button>
      </CardFooter>
    </Card>
  );
}
