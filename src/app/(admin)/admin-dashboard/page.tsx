"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { DollarSign, ShieldAlert, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">FarmCred Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <SummaryCard icon={<Users />} label="Total Farmers" value="132" />
        <SummaryCard icon={<Users />} label="Total Investors" value="47" />
        <SummaryCard
          icon={<DollarSign />}
          label="Total Investments"
          value="GH₵ 82,000"
        />
        <SummaryCard icon={<TrendingUp />} label="Loans Approved" value="56" />
        <SummaryCard icon={<TrendingUp />} label="Pending Loans" value="12" />
        <SummaryCard
          icon={<DollarSign />}
          label="Platform Revenue"
          value="GH₵ 5,400"
        />
        <SummaryCard
          icon={<ShieldAlert />}
          label="Trust Warnings"
          value="3 Flags"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Loan Disbursement Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Loan Disbursement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Loan Disbursed (GH₵)",
                    data: [5000, 7000, 6000, 8000, 10000, 9500, 12000],
                    backgroundColor: "#158f20",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Farmer Registration Growth Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Farmer Registration Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "New Farmers",
                    data: [10, 15, 20, 18, 25, 30, 40],
                    backgroundColor: "#72BF01",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Trust Level Distribution Pie Chart */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Trust Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie
              data={{
                labels: ["High Trust", "Medium Trust", "Low Trust"],
                datasets: [
                  {
                    data: [60, 30, 10],
                    backgroundColor: ["#158f20", "#72BF01", "#FF5252"],
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <div className="text-green-700">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
