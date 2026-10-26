"use client";

import { ChevronsUpDownIcon, PauseIcon, PlayIcon } from "lucide-react";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Toggle } from "@/registry/default/ui/toggle";

const weeks = {
  "16": [7.5, 8, 6, 8.5, 7, 0, 0],
  "9": [8, 7.5, 8, 8, 6.5, 2, 0],
};
const weekOptions = [
  { label: "Week of 16 Nov", value: "16" },
  { label: "Week of 9 Nov", value: "9" },
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const config = { hours: { label: "Hours", color: "var(--chart-1)" } } satisfies ChartConfig;
const entries = [
  { project: "Setmore · booking page", hours: "3h 10m" },
  { project: "Client calls", hours: "2h 05m" },
  { project: "Code review", hours: "1h 40m" },
];

export function TimesheetCard() {
  const [week, setWeek] = React.useState<keyof typeof weeks>("16");
  const [running, setRunning] = React.useState(true);
  const data = days.map((day, i) => ({ day, hours: weeks[week][i] }));
  const sum = weeks[week].reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sum}h logged</CardTitle>
        <CardDescription>Yocoboard</CardDescription>
        <CardAction>
          <Select
            items={weekOptions}
            value={week}
            onValueChange={(v) => setWeek(v as keyof typeof weeks)}
          >
            <SelectTrigger size="sm" className="w-36" aria-label="Week">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {weekOptions.map((w) => (
                <SelectItem key={w.value} value={w.value}>
                  {w.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={config} className="h-36 w-full">
          <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="hours"
              type="monotone"
              stroke="var(--color-hours)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex items-center justify-between rounded-lg border border-eds-tertiary p-2">
          <div className="flex flex-col">
            <span className="text-heading-14 lg:text-heading-12">Setmore · booking page</span>
            <span className="tabular-nums text-eds-secondary">
              {running ? "Running · 00:42:18" : "Paused"}
            </span>
          </div>
          <Toggle
            variant="outline"
            pressed={running}
            onPressedChange={setRunning}
            aria-label={running ? "Pause timer" : "Start timer"}
          >
            {running ? <PauseIcon /> : <PlayIcon />}
          </Toggle>
        </div>
        <Collapsible className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-heading-14 lg:text-heading-12">Today's entries</span>
            <CollapsibleTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label="Toggle entries" />}
            >
              <ChevronsUpDownIcon />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-1">
            {entries.map((e) => (
              <div key={e.project} className="flex justify-between">
                <span>{e.project}</span>
                <span className="tabular-nums text-eds-secondary">{e.hours}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
