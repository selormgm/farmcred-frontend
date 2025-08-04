"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CircleCheck,
  LayoutGrid,
  List,
  ShieldAlert,
  Play,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProgressCircle } from "@/components/investor/progress-cricle";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const investments = [
  { id: 1, farmerName: "Kwame Mensah", status: "Active", expectedReturn: "₵5,200", repaymentProgress: 65 },
  { id: 2, farmerName: "Ama Boateng", status: "Completed", expectedReturn: "₵4,000", repaymentProgress: 100 },
  { id: 3, farmerName: "Yaw Adomako", status: "Pending", expectedReturn: "₵3,500", repaymentProgress: 0 },
  { id: 4, farmerName: "Akua Asantewaa", status: "Active", expectedReturn: "₵6,000", repaymentProgress: 90 },
  { id: 5, farmerName: "Kojo Owusu", status: "Active", expectedReturn: "₵2,800", repaymentProgress: 25 },
  { id: 6, farmerName: "Esi Agyeman", status: "Pending", expectedReturn: "₵3,000", repaymentProgress: 0 },
  { id: 7, farmerName: "Michael Amponsah", status: "Completed", expectedReturn: "₵4,700", repaymentProgress: 100 },
  { id: 8, farmerName: "Adwoa Serwaa", status: "Active", expectedReturn: "₵5,500", repaymentProgress: 95 },
  { id: 9, farmerName: "Daniel Ntiamoah", status: "Pending", expectedReturn: "₵3,200", repaymentProgress: 0 },
  { id: 10, farmerName: "Naana Korang", status: "Completed", expectedReturn: "₵4,900", repaymentProgress: 100 },
];

const ITEMS_PER_PAGE = 6;
const statuses = ["All", "Active", "Completed", "Pending"] as const;

export default function InvestmentPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedStatus, setSelectedStatus] = useState<(typeof statuses)[number]>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = selectedStatus === "All" ? investments : investments.filter((inv) => inv.status === selectedStatus);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedInvestments = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const nearlyDone = investments.filter((inv) => inv.repaymentProgress >= 90 && inv.repaymentProgress < 100);
    if (nearlyDone.length > 0) {
      toast.info(
        `You have ${nearlyDone.length} investment${nearlyDone.length > 1 ? "s" : ""} nearing full repayment.`
      );
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset pagination when status filter changes
  }, [selectedStatus]);

  return (
    <div className="px-6 lg:px-24 overflow-hidden py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-[#158f20]">My Investments</h1>
        <div className="flex gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} onClick={() => setView("grid")} size="icon">
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")} size="icon">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as (typeof statuses)[number])}>
          <TabsList className="inline-flex space-x-1 rounded-md bg-gray-100 p-1">
            <TabsTrigger value="All" className="flex items-center gap-1 px-3 py-1 text-sm">
              <LayoutGrid className="w-4 h-4" /> All
            </TabsTrigger>
            <TabsTrigger value="Active" className="flex items-center gap-1 px-3 py-1 text-sm">
              <Play className="w-4 h-4" /> Active
            </TabsTrigger>
            <TabsTrigger value="Completed" className="flex items-center gap-1 px-3 py-1 text-sm">
              <CircleCheck className="w-4 h-4" /> Completed
            </TabsTrigger>
            <TabsTrigger value="Pending" className="flex items-center gap-1 px-3 py-1 text-sm">
              <Clock className="w-4 h-4" /> Pending
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={cn(view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4")}>
        {paginatedInvestments.map((inv) => {
          let tag;
          if (inv.repaymentProgress >= 100) {
            tag = { icon: CircleCheck, text: "Fully Repaid", color: "bg-green-100 text-green-700 border-green-300" };
          } else if (inv.repaymentProgress >= 90) {
            tag = { icon: Bell, text: "Repayment Nearly Complete", color: "bg-yellow-100 text-yellow-700 border-yellow-300" };
          } else if (inv.repaymentProgress < 50) {
            tag = { icon: ShieldAlert, text: "Behind Schedule", color: "bg-red-100 text-red-700 border-red-300" };
          }

          return (
            <Card key={inv.id} className="hover:shadow-md transition-all dark:bg-card">
              <CardContent className="flex justify-between items-center gap-3 p-4">
                <div className="flex flex-col max-w-[80%]">
                  <h2 className="text-lg font-semibold text-foreground">{inv.farmerName}</h2>
                  <p className="text-sm text-muted-foreground">{inv.status}</p>
                  {tag && (
                    <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full border ${tag.color}`}>
                      {tag.text}
                    </span>
                  )}
                  <div className="text-sm text-muted-foreground mt-2">
                    <p><strong>Expected Return:</strong> {inv.expectedReturn}</p>
                  </div>
                </div>
                <ProgressCircle value={inv.repaymentProgress} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-10">
          No investments found for <strong>{selectedStatus}</strong>.
        </p>
      )}

      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button onClick={handlePrev} disabled={currentPage === 1} variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNext} disabled={currentPage === totalPages} variant="outline" size="sm">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
