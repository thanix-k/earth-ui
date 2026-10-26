"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/registry/default/ui/combobox";
import { Label } from "@/registry/default/ui/label";
import { Progress, ProgressLabel, ProgressValue } from "@/registry/default/ui/progress";

const data = [
  { stage: "Captured", leads: 248 },
  { stage: "Qualified", leads: 132 },
  { stage: "Contacted", leads: 87 },
  { stage: "Booked", leads: 41 },
];
const config = { leads: { label: "Leads", color: "var(--chart-1)" } } satisfies ChartConfig;
const reps = ["Ava Brooks", "Diego Santos", "Hana Sato", "Liam O'Neill", "Zara Ahmed"];

export function LeadPipelineCard() {
  const anchor = useComboboxAnchor();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead pipeline · this week</CardTitle>
        <CardDescription>Hellosells</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={config} className="h-40 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="stage" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="leads" fill="var(--color-leads)" radius={4} />
          </BarChart>
        </ChartContainer>
        <Progress value={68}>
          <ProgressLabel>Monthly booking goal</ProgressLabel>
          <ProgressValue />
        </Progress>
        <div className="flex flex-col gap-1">
          <Label>Route new leads to</Label>
          <Combobox multiple autoHighlight items={reps} defaultValue={[reps[0], reps[2]]}>
            <ComboboxChips ref={anchor} className="w-full">
              <ComboboxValue>
                {(values: string[]) => (
                  <React.Fragment>
                    {values.map((v) => (
                      <ComboboxChip key={v}>{v}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput placeholder="Add rep" aria-label="Sales reps" />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No reps found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </CardContent>
    </Card>
  );
}
