"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, CircleCheck, LayoutGrid, List, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProgressCircle } from "@/components/investor/progress-cricle";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Dummy investment data
const investments = [
  {
    id: 1,
    farmerName: "Kwame Mensah",
    status: "Active",
    expectedReturn: "₵5,200",
    repaymentProgress: 65,
  },
  {
    id: 2,
    farmerName: "Ama Boateng",
    status: "Completed",
    expectedReturn: "₵4,000",
    repaymentProgress: 100,
  },
  {
    id: 3,
    farmerName: "Yaw Adomako",
    status: "Pending",
    expectedReturn: "₵3,500",
    repaymentProgress: 0,
  },
];

const statuses = ["All", "Active", "Completed", "Pending"];

export default function InvestmentPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filtered =
    selectedStatus === "All"
      ? investments
      : investments.filter((inv) => inv.status === selectedStatus);

  //Toast when repayment is ≥ 90 and < 100
  useEffect(() => {
    const nearlyDone = investments.filter(
      (inv) => inv.repaymentProgress >= 90 && inv.repaymentProgress < 100
    );

    if (nearlyDone.length > 0) {
      toast.info(
        `You have ${nearlyDone.length} investment${
          nearlyDone.length > 1 ? "s" : ""
        } nearing full repayment.`
      );
    }
  }, []);

  return (
    <div className="px-6 lg:px-24 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-[#158f20]">
          My Investments
        </h1>

        <div className="flex gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            onClick={() => setView("grid")}
            size="icon"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            size="icon"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter by Status */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            onClick={() => setSelectedStatus(status)}
            className="text-sm"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Investment Cards */}
      <div
        className={cn(
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        )}
      >
        {filtered.map((inv) => {
          // Repayment tag logic
          let tag;
          if (inv.repaymentProgress >= 100) {
            tag = {
              icon: CircleCheck,
              text: "Fully Repaid",
              color: "bg-green-100 text-green-700 border-green-300",
            };
          } else if (inv.repaymentProgress >= 90) {
            tag = {
              icon: Bell,
              text: "Repayment Nearly Complete",
              color: "bg-yellow-100 text-yellow-700 border-yellow-300",
            };
          } else if (inv.repaymentProgress < 50) {
            tag = {
              icon: ShieldAlert,
              text: "Behind Schedule",
              color: "bg-red-100 text-red-700 border-red-300",
            };
          }

          return (
            <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all flex justify-between items-center">
              {/* Left side: info */}
              <div className="flex items-start gap-3 max-w-[80%]">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {inv.farmerName}
                  </h2>
                  <p className="text-sm text-gray-500">{inv.status}</p>

                  {tag && (
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full border ${tag.color}`}
                    >
                      {tag.text}
                    </span>
                  )}

                  <div className="text-sm text-gray-600 mt-2">
                    <p>
                      <strong>Expected Return:</strong> {inv.expectedReturn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side: progress circle */}
              <ProgressCircle value={inv.repaymentProgress} />
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-10">
          No investments found for <strong>{selectedStatus}</strong>.
        </p>
      )}
    </div>
  );
}
