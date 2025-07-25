import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TransferHistory from "./TransferHistory";
import TransactionHistory from "./TransactionHistory";
import {
  useFarmerProfile,
  useFarmerTransactions,
  useFarmerTransfers,
  useFarmerOverview,
} from "@/hooks/useFarmerData";
import IncomeChartCard from "./IncomeTransaction";
import ExpensesChartCard from "./ExpenseTransaction";
import { FarmerInsightCard } from "./FarmerInsight";

export function FarmerBody() {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFarmerProfile();
  const { data: overview, loading: overviewLoading } = useFarmerOverview();
  const { data: transactions, loading: transactionsLoading } =
    useFarmerTransactions();
  const { data: transfers, loading: transfersLoading } = useFarmerTransfers();

  const loading =
    profileLoading ||
    overviewLoading ||
    transactionsLoading ||
    transfersLoading;

  if (profileError) {
    console.error("Failed to fetch data:", profileError);
  }
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex-1 w-full px-6 mt-2">
      <div className="flex flex-col gap-4">
        {/* Insights and Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Insight Card */}
          {overview && transactions && transfers ? (
            <FarmerInsightCard
              overview={overview}
              transactions={transactions}
              transfers={transfers}
            />
          ) : (
            <Card className="w-full dark:bg-card rounded-[12px] border border-[#eff3e4]">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#158f20]">
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center p-8">
                <p className="text-sm text-muted-foreground text-center">
                  Loading insights...
                </p>
              </CardContent>
            </Card>
          )}

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
