import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartBarProfitLoss } from "./ProfitChart";
import { useInvestorProfile } from "@/hooks/useInvestorData";

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
        <div className="flex-[2] space-y-6 min-w-[300px]">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-[1.2] min-w-0">
              <ChartBarProfitLoss />
            </div>
            <Card className="min-h-[240px] max-w-full xl:max-w-[350px] flex-1 bg-white p-5 rounded-xl dark:bg-card shadow-md">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <CardTitle className="text-sm font-medium">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-4 py-2 overflow-y-auto space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="border-b pb-2">
                      <p className="font-medium">
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
