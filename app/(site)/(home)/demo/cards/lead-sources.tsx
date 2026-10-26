"use client";

import { CalendarCheckIcon, HomeIcon, KeyRoundIcon, PhoneIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/default/ui/navigation-menu";

const data = [
  { source: "calls", leads: 142, fill: "var(--color-calls)" },
  { source: "portal", leads: 96, fill: "var(--color-portal)" },
  { source: "website", leads: 61, fill: "var(--color-website)" },
  { source: "referral", leads: 23, fill: "var(--color-referral)" },
];
const config = {
  leads: { label: "Leads" },
  calls: { label: "Phone calls", color: "var(--chart-1)" },
  portal: { label: "Listing portals", color: "var(--chart-2)" },
  website: { label: "Website", color: "var(--chart-3)" },
  referral: { label: "Referrals", color: "var(--chart-5)" },
} satisfies ChartConfig;
const pipelines = [
  { title: "Buyers", desc: "Viewing requests and offers", icon: HomeIcon },
  { title: "Tenants", desc: "Rental enquiries and references", icon: KeyRoundIcon },
  { title: "Valuations", desc: "Owners asking what it's worth", icon: CalendarCheckIcon },
];

export function LeadSourcesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Where leads came from · October</CardTitle>
        <CardDescription>Signmore</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Pipelines</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 gap-0.5">
                  {pipelines.map((p) => (
                    <li key={p.title}>
                      <NavigationMenuLink href="#pipelines" className="items-start">
                        <p.icon className="mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-medium">{p.title}</span>
                          <span className="text-eds-secondary">{p.desc}</span>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#calls" className={navigationMenuTriggerStyle()}>
                <PhoneIcon />
                Calls
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-64">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="source" hideLabel />}
            />
            <Pie data={data} dataKey="leads" nameKey="source" innerRadius={56} />
            <ChartLegend content={<ChartLegendContent nameKey="source" className="flex-wrap" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
