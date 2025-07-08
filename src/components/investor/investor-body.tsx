import { ClipboardCheck, HandCoins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

  // Dummy recent activity
  const recentActivity = [
    {
      title: "Funded farmer John Aboagye",
      timestamp: "2025-07-08 09:20",
    },
    {
      title: "Reviewed farmer Sarah Appiah",
      timestamp: "2025-07-07 18:44",
    },
    {
      title: "Added Kofi Boateng to favorites",
      timestamp: "2025-07-06 15:00",
    },
    {
      title: "Withdrew returns from investment",
      timestamp: "2025-07-05 08:44",
    },
  ];

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column: Farmers Reviewed, Farmers Funded and Insight Graph stacked */}
        <div className="flex-[1.3] space-y-6 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 h-[240px] flex flex-col justify-between rounded-xl bg-white dark:bg-card">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <CardTitle className="text-lg font-semibold text-[#157148]">
                  Farmers Reviewed
                </CardTitle>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-[#157148] h-auto p-1 font-small"
                >
                  View More
                </Button>
              </CardHeader>
              <div className="flex-1 flex flex-col justify-center items-center gap-2">
                <div className="flex items-center gap-10 mb-2">
                  <ClipboardCheck className="text-[#158f20]" size={64} />
                  <div className="text-5xl font-bold text-[#158f20]">
                    {profile.farmers_reviewed || 0}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Total reviews submitted
                </div>
              </div>
            </Card>
            <Card className="p-5 h-[240px] flex flex-col justify-between rounded-xl bg-white dark:bg-card">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <CardTitle className="text-lg font-semibold text-[#157148]">
                  Farmers Funded
                </CardTitle>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-[#157148] h-auto p-1 font-small"
                >
                  View More
                </Button>
              </CardHeader>
              <div className="flex-1 flex flex-col justify-center items-center gap-2">
                <div className="flex items-center gap-10 mb-2">
                  <HandCoins className="text-[#158f20]" size={64} />
                  <div className="text-5xl font-bold text-[#158f20]">
                    {profile.farmers_funded || 0}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total funded farmers
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full max-w-full">
            <InvestorInsightCard />
          </div>
        </div>
        {/* Right column: Monthly Profit and Recent Activity */}
        <div className="flex-[2] space-y-6 min-w-[300px]">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-[1] min-w-0">
              <ChartBarProfitLoss />
            </div>
            <Card className="min-h-[240px] max-w-full xl:max-w-[350px] flex-1 bg-white p-5 rounded-xl dark:bg-card">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <CardTitle className="text-xl font-medium text-[#157148]">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-4 py-2 overflow-y-auto space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="border-b pb-2">
                      <p className="font-medium text-[#157148]">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground h-full">
                    No recent activity.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
