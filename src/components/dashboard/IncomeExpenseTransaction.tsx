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
  income: {
    label: "Income",
    color: "#72BF01",
  },
  expenses: {
    label: "Expenses",
    color: "#158F20",
  },
};

export default function IncomeExpensesChart() {
  const { data: chartData, loading, error } = useFarmerTransactionsChart();

  if (loading)
    return <div className="p-4 text-[#157148]">Loading income vs expenses data...</div>;

  if (error)
    return <div className="p-4 text-red-600">Failed to load chart data</div>;

  const transformedData = (chartData || []).map((item, index) => ({
    week: item.period || `Week ${index + 1}`,
    income: parseFloat(item.income?.toString()) || 0,
    expenses: parseFloat(item.expenses?.toString()) || 0,
  })).slice(-6); // Last 6 weeks

  return (
    <Card className="w-full dark:bg-card rounded-[12px] shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Income vs Expenses (Last 6 Weeks)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(v) => `₵${v}`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke={chartConfig.income.color}
              strokeWidth={2}
              dot={{ r: 4, fill: chartConfig.income.color }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke={chartConfig.expenses.color}
              strokeWidth={2}
              dot={{ r: 4, fill: chartConfig.expenses.color }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
