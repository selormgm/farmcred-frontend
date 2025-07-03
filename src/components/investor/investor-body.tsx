import { Link, Sidebar } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChartBarProfitLoss} from "./ProfitChart";

export function BodyCards() {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row h-full">
          {/* Left column: Farmers Reviewed, Farmers Funded and Insight Graph stacked */}
          <div className="lg:w-2/5 flex flex-col gap-4 pl-4">
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
                <div className="flex-1"></div>
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
                <div className="flex-1">
                  
                </div>
              </Card>
            </div>
            <Card className=" p-4 h-[345px] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-6 flex-shrink-0">
                <CardTitle className="text-xl font-medium text-[#157148]">
                  Insight
                </CardTitle>
              </CardHeader>
              <div className="flex-1">

              </div>
            </Card>
          </div>
          {/* Right column: Monthly Profit and Recent Activity */}
          <div className="flex-1 flex flex-col gap-4 pr-4">
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
