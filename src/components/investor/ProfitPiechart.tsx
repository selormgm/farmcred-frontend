"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Monthly profit distribution donut chart";

const chartData = [
  { month: "January", profit: 1200, fill: "#157148" },
  { month: "February", profit: 950, fill: "#158f20" },
  { month: "March", profit: 1100, fill: "#72bf01" },
  { month: "April", profit: 800, fill: "#05402e" },
  { month: "May", profit: 1350, fill: "#eff3e4" },
];

const chartConfig = {
  profit: {
    label: "Profit",
  },
  January: { label: "January", color: "#157148" },
  February: { label: "February", color: "#158f20" },
  March: { label: "March", color: "#72bf01" },
  April: { label: "April", color: "#05402e" },
  May: { label: "May", color: "#bef264" },
} satisfies ChartConfig;

export function MonthlyProfitPieChart() {
  return (
    <Card className="p-4 flex-1 flex flex-col h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
        <CardTitle className="text-xl font medium text-[#157148]">
          Monthly Profit Distribution
        </CardTitle>
        <CardDescription>January - May 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="profit"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-[#158f20]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total profit for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
