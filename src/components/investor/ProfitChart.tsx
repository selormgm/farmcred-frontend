"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export const description = "Investor profit and loss chart";

const chartData = [
  { month: "January", profit: 120, loss: 0 },
  { month: "February", profit: 200, loss: 0 },
  { month: "March", profit: 0, loss: 90 },
  { month: "April", profit: 0, loss: 130 },
  { month: "May", profit: 150, loss: 0 },
  { month: "June", profit: 180, loss: 0 },
  { month: "July", profit: 160, loss: 0 },
  { month: "August", profit: 0, loss: 70 },
  { month: "September", profit: 0, loss: 100 },
  { month: "October", profit: 140, loss: 0 },
  { month: "November", profit: 50, loss: 0 },
  { month: "December", profit: 0, loss: 90 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    color: "#158f20",
  },
  loss: {
    label: "Loss",
    color: "#72bf01",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function ChartBarProfitLoss() {
  return (
    <Card className="p-4 flex-1 flex flex-col h-[600px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium">
          Investor Profit & Loss
        </CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-full max-w-[500px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 60, left: 0 }}
            barCategoryGap={24}
            height={440}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              interval={0}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="profit"
              layout="vertical"
              fill={chartConfig.profit.color}
              radius={4}
            >
              <LabelList
                dataKey="profit"
                position="right"
                offset={8}
                formatter={(value: number) => (value > 0 ? `+GH₵${value}` : "")}
                fontSize={12}
                className="fill-foreground"
              />
            </Bar>
            <Bar
              dataKey="loss"
              layout="vertical"
              fill={chartConfig.loss.color}
              radius={4}
            >
              <LabelList
                dataKey="loss"
                position="right"
                offset={8}
                formatter={(value: number) => (value > 0 ? `-GH₵${value}` : "")}
                fontSize={12}
                className="fill-foreground"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-[#158f20]">
          Overall up 8.4% ROI <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Summary of profits and losses from farmer investments
        </div>
      </CardFooter>
    </Card>
  );
}
