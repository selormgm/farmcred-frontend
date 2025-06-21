"use client";
import StaticTransaction from "@/components/StaticTransaction";
import TransactionHistory from "@/components/TransactionHistory";
import TransferHistory from "@/components/TransferHistory";
import TrustStar from "@/components/TrustStar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFarmerOverview } from "@/hooks/useFarmerData";

export default function Dashboard() {
  const { data: overview, loading, error } = useFarmerOverview();
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
        <div className="w-1/4 p-8 text-[#158f20]">
          <h2 className="text-[1.5rem] font-medium leading-[1.2] font-[Plus Jakarta Sans]">
            Hello,
            <br />
            <span className="text-[#158f20] block text-[2.2rem] font-bold font-[Plus Jakarta Sans]">
              {overview.full_name}
            </span>
          </h2>
          <div className="bg-[#eff3e4] min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border border-[#D6DFBC] flex flex-col justify-between">
            <p className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Trust Level
            </p>
            <TrustStar income={overview.trust_level_stars} />
          </div>
          <div className="bg-[#eff3e4] min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border border-[#D6DFBC] flex flex-col justify-between">
            <p className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Trust Score
            </p>
            <div>
              <h3 className="text-3xl font-bold">
                {overview.trust_score_percent}%
              </h3>
              <Progress
                value={overview.trust_score_percent}
                className="w-full h-[7px] rounded-full overflow-hidden mt-2 "
              />
            </div>
          </div>
          <div className="bg-[#eff3e4] min-h-48 font-[Inter] mt-4 p-4 rounded-[12px] border border-[#D6DFBC] flex flex-col justify-between">
            <p className="text-[0.85rem] font-medium mb-2 text-[#158f20]">
              Total Income
            </p>
            <h2 className="text-3xl font-bold">
              GH₵{overview.total_income || 0}
            </h2>
          </div>
        </div>
        <div className="flex-1">
          <div className=" gap-4">
            <div className=" flex flex-col gap-4 lg:flex-row h-full">
              <Card className="lg:w-2/5 w-full p-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Transfer History</CardTitle>
                  <Button variant="ghost" className="text-muted-foreground">View More</Button>
                </CardHeader>
                <TransferHistory />
              </Card>
              <Card className="lg:w-3/5 w-full p-4">
                <StaticTransaction />
              </Card>
            </div>

            <Card className="col-span-2 p-4">
              <TransactionHistory />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
