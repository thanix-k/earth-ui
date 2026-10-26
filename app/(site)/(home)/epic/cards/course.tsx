"use client";

import { PlayCircleIcon } from "lucide-react";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";
import { Progress, ProgressLabel, ProgressValue } from "@/registry/default/ui/progress";

const modules = [
  {
    id: "m1",
    title: "Welcome to the team",
    lessons: ["Our story", "How we work", "Your first week"],
  },
  {
    id: "m2",
    title: "Handling calls",
    lessons: ["Greeting script", "Taking a message", "Escalations"],
  },
  { id: "m3", title: "Tools", lessons: ["Setting up Anywhere", "Logging hours in Yocoboard"] },
];
const total = modules.reduce((n, m) => n + m.lessons.length, 0);

export function CourseCard() {
  const [done, setDone] = React.useState(
    new Set(["Our story", "How we work", "Your first week", "Greeting script"]),
  );
  const toggle = (l: string) =>
    setDone((d) => {
      const next = new Set(d);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receptionist onboarding</CardTitle>
        <CardDescription>AdaptiveU</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={Math.round((done.size / total) * 100)}>
          <ProgressLabel>
            {done.size} of {total} lessons
          </ProgressLabel>
          <ProgressValue />
        </Progress>
        <Accordion defaultValue={["m2"]}>
          {modules.map((m) => (
            <AccordionItem key={m.id} value={m.id}>
              <AccordionTrigger>
                {m.title} ({m.lessons.filter((l) => done.has(l)).length}/{m.lessons.length})
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {m.lessons.map((l) => (
                  <Label key={l}>
                    <Checkbox checked={done.has(l)} onCheckedChange={() => toggle(l)} />
                    {l}
                  </Label>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <PlayCircleIcon data-icon="inline-start" />
          Resume: Taking a message
        </Button>
      </CardFooter>
    </Card>
  );
}
