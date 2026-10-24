"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { day: "Mon", appointments: 18 },
  { day: "Tue", appointments: 24 },
  { day: "Wed", appointments: 21 },
  { day: "Thu", appointments: 30 },
  { day: "Fri", appointments: 34 },
  { day: "Sat", appointments: 41 },
  { day: "Sun", appointments: 12 },
];

const chartConfig = {
  appointments: { label: "Appointments", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartLine() {
  return (
    <ChartContainer config={chartConfig} className="w-full max-w-lg">
      <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="appointments"
          type="monotone"
          stroke="var(--color-appointments)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
