"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RequestLoanModal } from "@/components/dashboard/RequestLoan";
import { farmerService } from "@/lib/api/farmer";
import { farmerLoanService } from "@/lib/api/farmerloan";

interface Loan {
  id: number;
  amount: number;
  due_date: string;
  status: "pending" | "approved" | "repaid" | "declined" | "active";
  date_repaid?: string;
  on_time?: boolean;
}

const statusColorMap = {
  repaid: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-indigo-100 text-indigo-700",
  declined: "bg-red-100 text-red-700",
};

export default function LoanPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    farmerService
      .getLoans()
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(
          err.response?.data?.detail || err.message || "An error occurred"
        );
        setLoading(false);
      });
  }, []);

  const totalLoaned = loans
    .filter((loan) => loan.status !== "declined")
    .reduce((sum, loan) => sum + Number(loan.amount), 0);

  const repaidLoans = loans.filter((loan) => loan.status === "repaid");
  const repaymentProgress = loans.length
    ? (repaidLoans.length / loans.length) * 100
    : 0;

  if (loading) {
    return <div className="p-4">Loading loans...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-semibold text-[#158f20]">My Loans</h2>
        <div className="flex items-center gap-3">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("grid")}
          >
            <Grid3X3 className="w-4 h-4 mr-1" /> Grid
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            <List className="w-4 h-4 mr-1" /> List
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <PlusCircle className="w-4 h-4 mr-1" />
                Request Loan
              </Button>
            </DialogTrigger>
            <RequestLoanModal />
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Loaned Amount</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-[#158f20]">
            GHS{" "}
            {totalLoaned.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repayment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={repaymentProgress} className="h-3" />
            <div className="text-sm mt-2">
              {repaidLoans.length} of {loans.length} loans repaid
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {loans.map((loan) => (
          <Card key={loan.id} className="dark:bg-card">
            <div className="space-y-2 p-4">
              <div className="text-sm text-muted-foreground">
                Loan ID: #{loan.id}
              </div>
              <div className="text-xl font-semibold">GHS {loan.amount}</div>
              <div className="text-sm">Due: {loan.due_date}</div>
              <Badge className={cn("w-fit", statusColorMap[loan.status])}>
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
