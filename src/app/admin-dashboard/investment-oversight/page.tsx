import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const investments = [
  {
    id: 1,
    investor: "Akua Mensah",
    project: "Maize Expansion - Bono East",
    amount: 12000,
    returns: "6.5%",
    status: "active",
  },
  {
    id: 2,
    investor: "Yaw Frimpong",
    project: "Cassava Boost - Eastern Region",
    amount: 8000,
    returns: "5.2%",
    status: "flagged",
  },
  {
    id: 3,
    investor: "Linda Appiah",
    project: "Pineapple Farm - Central",
    amount: 10500,
    returns: "8.0%",
    status: "completed",
  },
];

export default function InvestmentOversight() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Investment Oversight</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by project or investor"
          className="border px-3 py-2 rounded-md text-sm w-full sm:w-64"
        />
        <select className="border px-3 py-2 rounded-md text-sm w-full sm:w-48">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <Card key={inv.id} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {inv.project}
              </CardTitle>
              <Badge
                variant={
                  inv.status === "active"
                    ? "default"
                    : inv.status === "flagged"
                    ? "destructive"
                    : "outline"
                }
              >
                {inv.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700 text-sm">Investor: {inv.investor}</p>
              <p className="text-gray-700 text-sm">
                Amount: GH₵ {inv.amount.toLocaleString()}
              </p>
              <p className="text-gray-700 text-sm">
                Expected Returns: {inv.returns}
              </p>
              <div className="pt-2 flex justify-end">
                <Button size="sm" variant="outline">
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent className="justify-center">
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm px-4 py-1 rounded bg-muted">Page 1</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
