"use client";

import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { service: "haircut", bookings: 275, fill: "var(--color-haircut)" },
  { service: "colour", bookings: 200, fill: "var(--color-colour)" },
  { service: "beard", bookings: 187, fill: "var(--color-beard)" },
  { service: "treatment", bookings: 90, fill: "var(--color-treatment)" },
];

const chartConfig = {
  bookings: { label: "Bookings" },
  haircut: { label: "Haircut", color: "var(--chart-1)" },
  colour: { label: "Colour", color: "var(--chart-2)" },
  beard: { label: "Beard trim", color: "var(--chart-3)" },
  treatment: { label: "Treatment", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function ChartPie() {
  return (
    <ChartContainer config={chartConfig} className="aspect-square w-full max-w-xs">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="service" hideLabel />}
        />
        <Pie data={chartData} dataKey="bookings" nameKey="service" innerRadius={60} />
        <ChartLegend content={<ChartLegendContent nameKey="service" />} />
      </PieChart>
    </ChartContainer>
  );
}
