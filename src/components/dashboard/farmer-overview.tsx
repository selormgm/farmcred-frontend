import { useFarmerOverview } from "@/hooks/useFarmerData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TrustStar from "./TrustStar";
import { Progress } from "../ui/progress";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import Link from "next/link";

export function FarmerOverview() {
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

  return (
    <div className="w-full px-6 mt-2 text-[#158f20]">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Total Income + Actions */}
        <div className="flex gap-4 flex-[2] min-w-[300px]">
          {/* Total Income */}
          <Card className="flex-1 bg-[#eff3e4] dark:bg-card p-4 rounded-[12px] border flex flex-col justify-between">
            {/* Wallet Icon */}
            <CardTitle className="text-sm font-medium  text-[#158f20]">
              Total Income
            </CardTitle>
            <CardContent className="px-0 mt-auto">
              <div className="text-4xl font-semibold mb-2 text-[#158f20]">
                GH₵{overview.total_income_last_12_months || 0}
              </div>
              <p className="text-sm text-[#72BF01]">Last 12 months</p>
            </CardContent>
          </Card>

          {/* Send Money */}
          <Link href="/dashboard/transfers/send" className="w-[120px]">
            <Card className="h-full bg-[#eff3e4] dark:bg-card p-3 rounded-[12px] border flex flex-col items-center justify-between hover:shadow-md transition-all">
              <BanknoteArrowUp className="w-14 h-14 mb-2 text-[#158f20]" />
              <span className="text-[#158f20] text-sm font-medium">Send</span>
            </Card>
          </Link>

          {/* Receive Money */}
          <Link href="/dashboard/transfers/receive" className="w-[120px]">
            <Card className="h-full bg-[#eff3e4] dark:bg-card p-3 rounded-[12px] border flex flex-col items-center justify-between hover:shadow-md transition-all">
              <BanknoteArrowDown className="w-14 h-14 mb-2 text-[#158f20]" />
              <span className="text-[#158f20] text-sm font-medium">
                Receive
              </span>
            </Card>
          </Link>

          {/* Right: Trust Level + Trust Score */}
          <div className="flex flex-col gap-4 flex-1 min-w-[250px]">
            {/* Trust Level */}
            <Card className="bg-[#eff3e4] dark:bg-card p-4 rounded-[12px] border">
              <CardTitle className="text-sm font-medium mb-2 text-[#158f20]">
                Trust Level
              </CardTitle>
              <CardContent className="text-3xl px-0">
                <TrustStar income={overview.trust_level_stars} />
              </CardContent>
            </Card>

            {/* Trust Score */}
            <Card className="bg-[#eff3e4] dark:bg-card p-4 rounded-[12px] border">
              <CardTitle className="text-sm font-medium mb-2 text-[#158f20]">
                Trust Score
              </CardTitle>
              <CardContent className="text-[#158f20] text-3xl font-semibold px-0">
                {overview.trust_score_percent}%
                <Progress
                  value={overview.trust_score_percent}
                  className="w-full h-[7px] rounded-full overflow-hidden mt-2"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
