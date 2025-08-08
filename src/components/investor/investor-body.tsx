import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartBarInvestmentROI } from "./ProfitChart";
import { useInvestorProfile } from "@/hooks/useInvestorData";
import { Button } from "../ui/button";

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
  const upcomingActions = [
    {
      title: "Review farmer Kofi Boateng",
      dueDate: "Due in 2 days",
      link: "/reviews",
    },
    {
      title: "Fund request from Sarah Appiah",
      dueDate: "Due in 3 days",
      link: "/investments",
    },
    {
      title: "Respond to message from John Aboagye",
      dueDate: "Due today",
      link: "/messages",
    },
  ];

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-6 lg:flex-row lg-items-stretch">
        <div className="flex flex-col xl:flex-row gap-6 w-full">
          <div className="flex-[2] min-w-0">
            <ChartBarInvestmentROI />
          </div>

          <div className="flex flex-col gap-4 flex-1 h-full">
            {/* Upcoming Actions */}
            <Card className="bg-white p-5 rounded-xl dark:bg-card shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm font-medium">
                  Upcoming Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {upcomingActions.length > 0 ? (
                  <ul className="space-y-3">
                    {upcomingActions.map((action, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{action.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {action.dueDate}
                          </p>
                        </div>
                        {action.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs px-2"
                            asChild
                          >
                            <a href={action.link}>View</a>
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    No upcoming actions.
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="flex-1 bg-white p-5 rounded-xl dark:bg-card shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm font-medium">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-auto">
                {recentActivity.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Activity</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.slice(0,5).map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {activity.title}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {activity.timestamp}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
