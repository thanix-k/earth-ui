"use client";

import { FileTextIcon, PhoneForwardedIcon, UserRoundIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import { Separator } from "@/registry/default/ui/separator";
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
import { Textarea } from "@/registry/default/ui/textarea";

const matters = [
  { client: "Alvarez v. Kline", area: "Personal injury", calls: 3 },
  { client: "Chen estate", area: "Probate", calls: 1 },
];
const modes = [
  {
    value: "intake",
    title: "Full intake",
    desc: "Receptionist collects case details and conflicts.",
  },
  { value: "message", title: "Message only", desc: "Name, number and a short reason." },
  { value: "transfer", title: "Warm transfer", desc: "Patch existing clients straight through." },
];

export function IntakeCard() {
  return (
    <Card>
      <CardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#matters">Matters</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Open</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CardTitle>New-caller intake</CardTitle>
        <CardDescription>Lexreception</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-eds-secondary">Right-click a matter for actions.</p>
        {matters.map((m, i) => (
          <div key={m.client} className="flex flex-col gap-2">
            {i > 0 && <Separator />}
            <ContextMenu>
              <ContextMenuTrigger className="flex items-center justify-between rounded-md p-2 hover:bg-eds-neutral-hover">
                <div className="flex flex-col">
                  <span className="text-heading-14 lg:text-heading-12">{m.client}</span>
                  <span className="text-eds-secondary">{m.area}</span>
                </div>
                <span className="text-eds-secondary">
                  {m.calls} {m.calls === 1 ? "call" : "calls"}
                </span>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuItem>
                  <FileTextIcon />
                  View call notes
                </ContextMenuItem>
                <ContextMenuItem>
                  <PhoneForwardedIcon />
                  Forward to attorney
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <UserRoundIcon />
                  Open client
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" className="w-full" />}>
            Edit intake script
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Intake script</SheetTitle>
              <SheetDescription>
                How receptionists handle new callers for your firm.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-6 px-6">
              <FieldSet>
                <FieldLegend variant="label">When someone new calls</FieldLegend>
                <RadioGroup defaultValue="intake">
                  {modes.map((m) => (
                    <FieldLabel key={m.value} htmlFor={`intake-${m.value}`}>
                      <Field orientation="horizontal">
                        <RadioGroupItem value={m.value} id={`intake-${m.value}`} />
                        <FieldContent>
                          <FieldTitle>{m.title}</FieldTitle>
                          <FieldDescription>{m.desc}</FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </FieldSet>
              <Field>
                <FieldLabel htmlFor="intake-greeting">Greeting</FieldLabel>
                <Textarea
                  id="intake-greeting"
                  defaultValue="Thank you for calling Hale & Moreno, how may I help you today?"
                />
              </Field>
            </div>
            <SheetFooter>
              <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
              <SheetClose render={<Button />}>Save script</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
