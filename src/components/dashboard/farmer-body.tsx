import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TransferHistory from "./TransferHistory";
import TransactionHistory from "./TransactionHistory";
import { useFarmerProfile } from "@/hooks/useFarmerData";
import IncomeChartCard from "./IncomeTransaction";
import ExpensesChartCard from "./ExpenseTransaction";
import { FarmerInsightCard } from "./FarmerInsight";

export function FarmerBody() {
  const { data: profile, loading, error } = useFarmerProfile();
  const tablelength = 3;
  if (error) {
    console.error("Failed to fetch data:", error);
  }
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (!profile) {
    return <div className="p-4">No data available.</div>;
  }
  console.log(profile);

  return (
    <div className="flex-1 w-full px-6 mt-2">
      <div className="flex flex-col gap-4">
        {/* Insights and Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Insight Card */}
          <FarmerInsightCard />

          {/* Income Chart (already has its own card wrapper) */}
          <IncomeChartCard />

          {/* Expenses Chart (already has its own card wrapper) */}
          <ExpensesChartCard />
        </div>

        {/* Transfer & Transaction History Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] gap-4 h-[320px]">
          {/* Transfer History*/}
          <Card className="p-6 h-full flex flex-col w-full dark:bg-card border rounded-[12px] border-[#eff3e4]">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <CardTitle className="text-sm font-medium  text-[#158f20]">
                Transfer History
              </CardTitle>
              <Link href="/dashboard/transfers">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium text-sm"
                >
                  View More
                </Button>
              </Link>
            </CardHeader>
            <div className="flex-1 overflow-auto">
              <TransferHistory />
            </div>
          </Card>

          {/* Transaction History*/}
          <Card className=" p-6 h-full flex flex-col w-full dark:bg-card border rounded-[12px] border-[#eff3e4]">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <CardTitle className="text-sm font-medium  text-[#158f20]">
                Transaction History
              </CardTitle>
              <Link href="/dashboard/transactions">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium text-sm"
                >
                  View More
                </Button>
              </Link>
            </CardHeader>
            <div className="flex-1 overflow-auto">
              <TransactionHistory tablelength={3} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
