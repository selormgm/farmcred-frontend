import {
  Banknote,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full text-[#158f20]">
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between shadow-md">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Total Investments
          </CardDescription>
          <CardAction className="text-[#158f20]">
            <Banknote size="38" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-4xl font-semibold mb-2 text-[#158f20]">
          $1,250.00
        </CardFooter>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between shadow-md">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            New Farmers
          </CardDescription>
          <CardAction className="text-[#158f20]">
            <Users size="38" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-4xl font-semibold mb-2 text-[#158f20]">
          1,234
        </CardFooter>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between shadow-md">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Active Farmers
          </CardDescription>
          <CardAction className="text-[#158f20]">
            <CheckCircle size="38" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-4xl font-semibold mb-2 text-[#158f20]">
          45,678
        </CardFooter>
      </Card>
      <Card className="dark:bg-card p-5 h-[220px] flex flex-col justify-between shadow-md">
        <CardHeader>
          <CardDescription className="text-sm font-medium  text-[#158f20]">
            Return On Investments
          </CardDescription>
          <CardAction className="text-[#158f20]">
            <TrendingUp size="38" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-4xl font-semibold mb-2 text-[#158f20]">
          4.5%
        </CardFooter>
      </Card>
    </div>
  );
}
