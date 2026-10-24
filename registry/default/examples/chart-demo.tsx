"use client";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { month: "May", online: 186, phone: 80 },
  { month: "June", online: 305, phone: 120 },
  { month: "July", online: 237, phone: 96 },
  { month: "August", online: 273, phone: 110 },
  { month: "September", online: 309, phone: 132 },
  { month: "October", online: 344, phone: 140 },
];

const chartConfig = {
  online: { label: "Online", color: "var(--chart-1)" },
  phone: { label: "Phone", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartDemo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>May – October 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="online" fill="var(--color-online)" radius={4} />
            <Bar dataKey="phone" fill="var(--color-phone)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
