"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFarmerTransactionsChart } from "@/hooks/useFarmerData";

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "#158F20",
  },
};

export default function ExpensesChartCard() {
  const { data: chartData, loading, error } = useFarmerTransactionsChart();

  if (loading) return <div className="p-4 text-[#157148]">Loading expenses data...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load expenses data</div>;

  const transformedData = (chartData || []).map((item, index) => ({
    week: item.period || `Week ${index + 1}`,
    expenses: parseFloat(item.expenses?.toString()) || 0,
  })).slice(-6);

  return (
    <Card className="w-full dark:bg-card rounded-[12px] border border-[#eff3e4]">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#158f20]">Expenses (Last 6 Weeks)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(v) => `₵${v}`} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#158F20"
              strokeWidth={2}
              dot={{ r: 4, fill: "#158F20" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
