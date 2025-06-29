"use client";
import StaticTransaction from "@/components/dashboard/StaticTransaction";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import TransferHistory from "@/components/dashboard/TransferHistory";
import TrustStar from "@/components/dashboard/TrustStar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFarmerOverview } from "@/hooks/useFarmerData";
import { toast } from "sonner";
import Link from "next/link";

export default function Dashboard() {
  const { data: overview, loading, error } = useFarmerOverview();
  const tablelength = 3;
  if (error) {
    console.error("Failed to fetch overview data:", error);
  }
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (!overview) {
    return <div className="p-4">No overview data available.</div>;
  }
  console.log(overview);

  return (
    <div className="flex flex-col ">
      <main className="p-4 flex flex-1">
        {/*Sidebar with Greeting */}
        <div className="w-1/4 pr-8 pl-8 text-[#158f20]">
          <h2 className="text-[1.5rem] font-medium leading-[1.2] font-[Plus Jakarta Sans] tracking-tighter">
            Hello,
            <br />
            <span className="text-[#158f20] font-[Plus Jakarta Sans] text-6xl font-semibold tracking-tighter">
              {overview.full_name}
            </span>
          </h2>
          <Card className="bg-[#eff3e4] dark:bg-card min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border flex flex-col justify-between">
            <CardTitle className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Trust Level
            </CardTitle>
            <CardContent className="text-3xl px-0">
              <TrustStar income={overview.trust_level_stars} />
            </CardContent>
          </Card>
          <Card className="bg-[#eff3e4] dark:bg-card min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border flex flex-col justify-between">
            <CardTitle className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Trust Score
            </CardTitle>
            <CardContent className="text-[#158f20] text-3xl font-semibold px-0">
              {overview.trust_score_percent}%
              <Progress
                value={overview.trust_score_percent}
                className="w-full h-[7px] rounded-full overflow-hidden mt-2 "
              />
            </CardContent>
          </Card>
          <Card className="bg-[#eff3e4]  dark:bg-card min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border flex flex-col justify-between">
            <CardTitle className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Total Income
            </CardTitle>
            <CardContent className="text-[#158f20] text-3xl font-semibold px-0">
              GH₵{overview.total_income_last_12_months || 0}
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row h-full">
              <Card className="lg:w-2/5 w-full p-6 h-[450px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                  <CardTitle className="text-xl font-semibold text-[#157148]">
                    Transfer History
                  </CardTitle>
                  <Link href="/dashboard/transfers">
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium"
                    >
                      View More
                    </Button>
                  </Link>
                </CardHeader>
                <div className="flex-1">
                  <TransferHistory />
                </div>
              </Card>
              <Card className="lg:w-5/5 w-full p-6 h-[450px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                  <CardTitle className="text-xl font-medium text-[#157148]">
                    Static Transactions
                  </CardTitle>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#72BF01] border border-[#B8B8B8]"></div>
                      <span className="text-lg font-normal text-[#157148]">
                        Income
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#158F20] border border-[#B8B8B8]"></div>
                      <span className="text-lg font-normal text-[#157148]">
                        Expenses
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <div className="flex-1 overflow-auto">
                  <StaticTransaction />
                </div>
              </Card>
            </div>

            <Card className="p-6 h-[400px] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                <CardTitle className="text-xl font-medium text-[#157148]">
                  Transaction History
                </CardTitle>
                <Link href="/dashboard/transactions">
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium"
                  >
                    View More
                  </Button>
                </Link>
              </CardHeader>
              <div className="flex-1">
                <TransactionHistory tablelength={4} />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
