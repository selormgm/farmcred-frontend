import { useFarmerOverview } from "@/hooks/useFarmerData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TrustStar from "./TrustStar";
import { Progress } from "../ui/progress";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import Link from "next/link";
import FarmerProduct from "./farmer-product";

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
        <div className="flex flex-wrap gap-4 w-full">
          {/* Total Income */}
          <Card className="flex-[1.5] dark:bg-card p-4 rounded-[12px] border flex flex-col justify-between">
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
          <Card className="flex-[1.2] dark:bg-card p-4 rounded-[12px] border flex flex-col justify-between">
            <CardTitle className="text-sm font-medium  text-[#158f20]">
              My Products
            </CardTitle>
            <CardContent className="px-4 mt-auto">
              <FarmerProduct />
            </CardContent>
          </Card>

          {/* Right: Trust Level + Trust Score */}
          <div className="flex flex-col gap-4 flex-1 min-w-[250px]">
            {/* Trust Level */}
            <Card className="dark:bg-card p-4 rounded-[12px] border">
              <CardTitle className="text-sm font-medium mb-2 text-[#158f20]">
                Trust Level
              </CardTitle>
              <CardContent className="text-3xl px-0">
                <TrustStar income={overview.trust_level_stars} />
              </CardContent>
            </Card>

            {/* Trust Score */}
            <Card className="dark:bg-card p-4 rounded-[12px] border">
              <CardTitle className="text-sm font-medium mb-2 text-[#158f20]">
                Trust Score
              </CardTitle>
              <CardContent className="text-[#158f20] text-3xl font-semibold px-0">
                {Math.round(overview.trust_score_percent)}%
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
