import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full text-[#158f20]">
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Total Investments
          </CardDescription>
          <CardTitle className="text-4xl font-semibold mb-2 text-[#158f20]">
            $1,250.00
          </CardTitle>
          <CardAction className="text-[#158f20]">
            <PiggyBank className="size-16"/>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            New Farmers
          </CardDescription>
          <CardTitle className="text-4xl font-semibold mb-2 text-[#158f20]">
            1,234
          </CardTitle>
          <CardAction className="text-[#158f20]">
            <Badge variant="outline" className="text-[#158f20]">
              <TrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-[#158f20]">
            Down 20% this period <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Active Farmers
          </CardDescription>
          <CardTitle className="text-4xl font-semibold mb-2 text-[#158f20]">
            45,678
          </CardTitle>
          <CardAction className="text-[#158f20]">
            <Badge variant="outline" className="text-[#158f20]">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-[#158f20]">
            Strong user retention <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Return On Investments
          </CardDescription>
          <CardTitle className="text-4xl font-semibold mb-2 text-[#158f20]">
            4.5%
          </CardTitle>
          <CardAction className="text-[#158f20]">
            <Badge variant="outline" className="text-[#158f20]">
              <TrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-[#158f20]">
            Steady performance increase <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
