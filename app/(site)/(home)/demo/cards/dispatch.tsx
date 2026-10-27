"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
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
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/registry/default/ui/menubar";
import { Toaster, toast } from "@/registry/default/ui/toast";

const jobs = [
  { id: 1, what: "No heat, furnace clicking", where: "Elm St, Beaverton", urgent: true },
  { id: 2, what: "Breaker keeps tripping", where: "SE Hawthorne Blvd", urgent: false },
  { id: 3, what: "AC tune-up", where: "NW 23rd Ave", urgent: false },
];
const techs = { MR: "Marco Ruiz", KD: "Kim Dao", BO: "Ben Osei" };
type Tech = keyof typeof techs;
const isTech = (v: unknown): v is Tech => typeof v === "string" && Object.hasOwn(techs, v);

function DispatchBoard() {
  const [urgentOnly, setUrgentOnly] = React.useState(false);
  const [tech, setTech] = React.useState<Tech>("MR");
  const [sent, setSent] = React.useState<number[]>([]);
  const visible = jobs.filter((j) => !urgentOnly || j.urgent);

  const dispatch = (id: number) => {
    setSent((s) => [...s, id]);
    const toastId = toast.add({
      title: `Dispatched to ${techs[tech]}`,
      description: "Customer gets a text with the ETA.",
      actionProps: {
        children: "Undo",
        onClick: () => {
          setSent((s) => s.filter((x) => x !== id));
          toast.close(toastId);
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispatch board</CardTitle>
        <CardDescription>ServiceForge</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Jobs</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New job <MenubarShortcut>N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Import from calls</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print route sheet</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={urgentOnly} onCheckedChange={setUrgentOnly}>
                Urgent only
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Technician</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup
                value={tech}
                onValueChange={(v) => {
                  if (isTech(v)) setTech(v);
                }}
              >
                {Object.keys(techs)
                  .filter(isTech)
                  .map((t) => (
                    <MenubarRadioItem key={t} value={t}>
                      {techs[t]}
                    </MenubarRadioItem>
                  ))}
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="flex items-center gap-2 text-eds-secondary">
          <Avatar size="sm">
            <AvatarFallback>{tech}</AvatarFallback>
          </Avatar>
          Assigning to {techs[tech]}
        </div>
        {visible.map((j) => (
          <div
            key={j.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-eds-tertiary p-2"
          >
            <div className="flex flex-col">
              <span className="text-heading-14 lg:text-heading-12">{j.what}</span>
              <span className="text-eds-secondary">{j.where}</span>
            </div>
            {sent.includes(j.id) ? (
              <Badge variant="positive">En route</Badge>
            ) : (
              <div className="flex items-center gap-2">
                {j.urgent && <Badge variant="destructive">Urgent</Badge>}
                <Button size="sm" variant="outline" onClick={() => dispatch(j.id)}>
                  Dispatch
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Base UI Toast needs its provider around whatever calls toast.add.
export function DispatchCard() {
  return (
    <Toaster>
      <DispatchBoard />
    </Toaster>
  );
}
