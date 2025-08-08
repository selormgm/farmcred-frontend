"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

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
import { useInvestorProfile } from "@/hooks/useInvestorData";

const chartConfig = {
  investments: {
    label: "Investment",
    color: "#72bf01",
  },
  roi: {
    label: "ROI",
    color: "158f20",
  },
} satisfies ChartConfig;

export function ChartBarInvestmentROI() {
  const { data: profile, loading, error } = useInvestorProfile();

  if (loading)
    return (
      <div className="p-4 text-[#157148]">Loading investment vs roi data</div>
    );

  if (error)
    return <div className="p-4 text-red-600">Faailed to load chart data</div>;

  const chartData = [
    {
      month: "Aug",
      investment: profile?.monthly_investment || 100,
      roi: profile?.return_on_investments || 20,
    },
    {
      month: "Sep",
      investment: profile?.monthly_investment || 500,
      roi: profile?.return_on_investments || 80,
    },
    {
      month: "Oct",
      investment: profile?.monthly_investment || 400,
      roi: profile?.return_on_investments || 20,
    },
    {
      month: "Nov",
      investment: profile?.monthly_investment || 70,
      roi: profile?.return_on_investments || 50,
    },
    {
      month: "Dec",
      investment: profile?.monthly_investment || 10,
      roi: profile?.return_on_investments || 40,
    },
  ];

  return (
    <Card className="h-full shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Investment and ROI</CardTitle>
        <CardDescription>August - December 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex=1 min-h-0">
        <ChartContainer config={chartConfig}  className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="investment" fill="#72bf01" radius={4} />
            <Bar dataKey="roi" fill="#158f20" radius={4} />
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Keep investing to grow your impact and returns
        </div>
      </CardFooter>
    </Card>
  );
}
