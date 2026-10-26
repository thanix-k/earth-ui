"use client";

import {
  CalendarClockIcon,
  MailIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/default/ui/alert-dialog";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/registry/default/ui/item";

const initial = [
  { id: 1, time: "9:00", who: "Grace Liu", what: "Teeth whitening", status: "Checked in" },
  { id: 2, time: "10:30", who: "Omar Haddad", what: "Routine check-up", status: "Confirmed" },
  { id: 3, time: "13:00", who: "Ines Duarte", what: "Filling", status: "Unconfirmed" },
  { id: 4, time: "15:30", who: "Tom Becker", what: "Hygienist clean", status: "Confirmed" },
] as const;

const statusVariant = {
  "Checked in": "positive",
  Confirmed: "secondary",
  Unconfirmed: "caution",
} as const;

export function AgendaCard() {
  const [items, setItems] = React.useState<readonly (typeof initial)[number][]>(initial);
  const [cancelling, setCancelling] = React.useState<(typeof initial)[number] | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today · Wed 18 Nov</CardTitle>
        <CardDescription>Setmore</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {items.map((a) => (
            <Item key={a.id} variant="outline" size="sm">
              <span className="w-10 shrink-0 tabular-nums text-eds-secondary">{a.time}</span>
              <ItemContent>
                <ItemTitle>{a.who}</ItemTitle>
                <ItemDescription>{a.what}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" aria-label="Actions" />}
                  >
                    <MoreHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <CalendarClockIcon />
                      Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <MessageSquareIcon />
                        Send reminder
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <MailIcon />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquareIcon />
                          SMS
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setCancelling(a)}>
                      <Trash2Icon />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
      <AlertDialog open={!!cancelling} onOpenChange={(open) => !open && setCancelling(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel {cancelling?.who}'s appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              They'll get an email and the {cancelling?.time} slot reopens for booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setItems((all) => all.filter((x) => x.id !== cancelling?.id))}
            >
              Cancel appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
