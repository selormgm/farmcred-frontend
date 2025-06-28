"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
} satisfies ChartConfig;

const StaticTransaction = () => {
  const { data: chartData, loading, error } = useFarmerTransactionsChart();

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-[#157148]">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-red-600">Failed to load chart data</div>
      </div>
    );
  }

  // Transform the data to match the expected format and limit to latest 6 weeks
  const transformedData = (chartData || [])
    .map((item: any, index: number) => ({
      week: item.period || `Week ${index + 1}`,
      income: parseFloat(item.income) || 0,
      expenses: parseFloat(item.expenses) || 0,
    }))
    .slice(-6); // Get the latest 6 weeks

  // Calculate max value for Y-axis
  const maxIncome =
    transformedData.length > 0
      ? Math.max(...transformedData.map((d) => d.income))
      : 0;
  const maxExpenses =
    transformedData.length > 0
      ? Math.max(...transformedData.map((d) => d.expenses))
      : 0;
  const maxValue = Math.max(maxIncome, maxExpenses);
  const yAxisMax = Math.ceil(maxValue / 100) * 100 || 500; // Default to 500 if no data

  // Generate Y-axis ticks
  const yAxisTicks = Array.from(
    { length: 5 },
    (_, i) => (yAxisMax / 4) * (i + 1)
  );

  return (
    <ChartContainer config={chartConfig} className=" w-full h-full">
        <BarChart
        accessibilityLayer
        data={transformedData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(50, 50, 50, 0.29)"
          strokeWidth={2}
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          className="text-base font-normal text-[#157148]"
          style={{ letterSpacing: "-0.06em" }}
        />
        <YAxis
          domain={[0, yAxisMax]}
          ticks={yAxisTicks}
          tickLine={false}
          axisLine={false}
          className="text-base font-normal text-[#157148]"
          style={{ letterSpacing: "-0.06em" }}
          tickFormatter={(value) => `₵ ${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey="income"
          fill="#72BF01"
          radius={[9, 9, 9, 9]}
          stroke="#EFEFEF"
          strokeWidth={5}
          maxBarSize={58}
        />
        <Bar
          dataKey="expenses"
          fill="#158F20"
          radius={[9, 9, 9, 9]}
          stroke="#EFEFEF"
          strokeWidth={5}
          maxBarSize={58}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default StaticTransaction;
