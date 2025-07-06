import { ClipboardCheck, HandCoins } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChartBarProfitLoss } from "./ProfitChart";
import { useInvestorProfile } from "@/hooks/useInvestorData";
import { InvestorInsightCard } from "./InvestorInsight";

export function BodyCards() {
  const { data: profile, loading, error } = useInvestorProfile();
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
    <div className="flex-1">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row h-full">
          {/* Left column: Farmers Reviewed, Farmers Funded and Insight Graph stacked */}
          <div className="flex-[2] flex flex-col gap-4 pl-4">
            <div className="flex flex-row gap-4">
              <Card className="p-4 h-[240px] flex flex-col flex-1">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                  <CardTitle className="text-xl font-semibold text-[#157148]">
                    Farmers Reviewed
                  </CardTitle>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium"
                  >
                    View More
                  </Button>
                </CardHeader>
                <div className="flex-1 flex flex-col justify-center items-center gap-2">
                  <div className="flex items-center gap-16 mb-4">
                    <ClipboardCheck className="text-[#158f20]" size={80} />
                    <div className="text-6xl font-bold text-[#158f20]">
                      {profile.farmers_reviewed || 0}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Total reviews submitted
                  </div>
                </div>
              </Card>
              <Card className="p-4 h-[240px] flex flex-col flex-1">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                  <CardTitle className="text-xl font-semibold text-[#157148]">
                    Farmers Funded
                  </CardTitle>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-[#157148] h-auto p-1 font-medium"
                  >
                    View More
                  </Button>
                </CardHeader>
                <div className="flex-1 flex flex-col justify-center items-center gap-2">
                  <div className="flex items-center gap-16 mb-4">
                    <HandCoins className="text-[#158f20]" size={80} />
                    <div className="text-6xl font-bold text-[#158f20]">
                      {profile.farmers_funded || 0}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total funded farmers
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex-1">
              <InvestorInsightCard />
            </div>
          </div>
          {/* Right column: Monthly Profit and Recent Activity */}
          <div className="flex-[3] flex flex-col gap-4 pr-4">
            <div className="flex flex-row gap-4">
              <div className="flex-[2] min-w-0">
                <ChartBarProfitLoss />
              </div>
              <Card className="p-4 flex-1 flex flex-col max-w-[350px]">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                  <CardTitle className="text-xl font-medium text-[#157148]">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <div className="flex-1 px-4 py-2 text-muted-foreground flex items-center justify-center">
                  {/* Replace this with your recent activity list */}
                  No recent activity.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
