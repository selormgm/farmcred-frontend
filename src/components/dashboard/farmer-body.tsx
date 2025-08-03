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
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="flex-1 w-full px-6 mt-2">
      <div className="flex flex-col gap-6">
        {/* Insights and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonCard title="Quick Insights" />
              <SkeletonCard title="Income" />
              <SkeletonCard title="Expenses" />
            </>
          ) : (
            <>
              {!loading && overview && transactions && transfers ? (
                <FarmerInsightCard
                  overview={overview}
                  transactions={transactions}
                  transfers={transfers}
                />
              ) : (
                <SkeletonCard title="Quick Insights" />
              )}
              {!loading ? <IncomeChartCard /> : <SkeletonCard title="Income" />}
              {!loading ? (
                <ExpensesChartCard />
              ) : (
                <SkeletonCard title="Expenses" />
              )}
            </>
          )}
        </div>

        {/* Transfer & Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] gap-6 h-[320px]">
          {/* Transfer History */}
          <Card className="p-6 h-full flex flex-col w-full dark:bg-card rounded-[12px]">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <CardTitle className="text-sm font-medium text-[#158f20]">
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
              {loading ? <SkeletonRows /> : <TransferHistory />}
            </div>
          </Card>

          {/* Transaction History */}
          <Card className="p-6 h-full flex flex-col w-full dark:bg-card rounded-[12px]">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <CardTitle className="text-sm font-medium text-[#158f20]">
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
              {loading ? (
                <SkeletonRows />
              ) : (
                <TransactionHistory tablelength={3} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 💡 Skeleton for chart/insight cards
function SkeletonCard({ title }: { title: string }) {
  return (
    <Card className="w-full dark:bg-card rounded-[12px] p-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#158f20]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

// 💡 Skeleton for table-like content (transfers/transactions)
function SkeletonRows() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}
