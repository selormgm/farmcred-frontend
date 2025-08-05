"use client";

import { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvestmentReport } from "@/lib/types";

const investments = [
  {
    id: 1,
    investor: "Akua Mensah",
    project: "Maize Expansion - Bono East",
    amount: 12000,
    returns: "6.5%",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    notes: "Fully repaid. Excellent ROI and market reach.",
    repayment: "GH₵ 11,340 returned",
  },
  {
    id: 2,
    investor: "Yaw Frimpong",
    project: "Cassava Boost - Eastern Region",
    amount: 8000,
    returns: "5.2%",
    status: "flagged",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    notes: "Fully repaid. Excellent ROI and market reach.",
    repayment: "GH₵ 11,340 returned",
  },
  {
    id: 3,
    investor: "Linda Appiah",
    project: "Pineapple Farm - Central",
    amount: 10500,
    returns: "8.0%",
    status: "completed",
    startDate: "2024-03-10",
    endDate: "2025-03-10",
    notes: "Delayed harvest caused by equipment breakdown.",
    repayment: "GH₵ 1,500 of GH₵ 8,416 returned",
  },
  {
    id: 4,
    investor: "Kojo Antwi",
    project: "Rice Expansion - Volta Region",
    amount: 9500,
    returns: "6.8%",
    status: "active",
    startDate: "2024-03-10",
    endDate: "2025-03-10",
    notes: "Delayed harvest caused by equipment breakdown.",
    repayment: "GH₵ 1,500 of GH₵ 8,416 returned",
  },
  {
    id: 5,
    investor: "Ama Serwaa",
    project: "Tomato Farm - Ashanti Region",
    amount: 7000,
    returns: "4.9%",
    status: "flagged",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    notes: "Yield has exceeded expectations due to favorable weather.",
    repayment: "GH₵ 3,600 of GH₵ 12,780 returned",
  },
  {
    id: 6,
    investor: "Kwesi Biney",
    project: "Yam Project - Northern",
    amount: 11000,
    returns: "7.3%",
    status: "completed",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    notes: "Yield has exceeded expectations due to favorable weather.",
    repayment: "GH₵ 3,600 of GH₵ 12,780 returned",
  },
];

export default function InvestmentOversight() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [selectedReport, setSelectedReport] = useState<InvestmentReport | null>(
    null
  );

  const filtered = useMemo(() => {
    return investments.filter((inv) => {
      const matchesSearch =
        inv.project.toLowerCase().includes(search.toLowerCase()) ||
        inv.investor.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? inv.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by project or investor"
          className="border px-3 py-2 rounded-md text-sm w-full sm:w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border px-3 py-2 rounded-md text-sm w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginated.map((inv) => (
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReport(inv)}
                >
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="justify-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm px-4 py-1 rounded bg-muted">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* View Report Modal */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Investment Report</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-3 text-sm">
              <div>
                <p>
                  <strong>Project:</strong> {selectedReport.project}
                </p>
                <p>
                  <strong>Investor:</strong> {selectedReport.investor}
                </p>
              </div>

              <div>
                <p>
                  <strong>Amount Invested:</strong> GH₵{" "}
                  {selectedReport.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Expected Returns:</strong> {selectedReport.returns}
                </p>
              </div>

              <div>
                <p>
                  <strong>Status:</strong>{" "}
                  <Badge
                    variant={
                      selectedReport.status === "active"
                        ? "default"
                        : selectedReport.status === "flagged"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {selectedReport.status.toUpperCase()}
                  </Badge>
                </p>
              </div>

              <div>
                <p>
                  <strong>Start Date:</strong> 12 Jan 2025
                </p>
                <p>
                  <strong>End Date:</strong> 12 July 2025
                </p>
              </div>

              <div>
                <p>
                  <strong>Repayment Status:</strong> On Track
                </p>
                <div className="w-full bg-muted h-2 rounded-full mt-1">
                  <div className="bg-green-600 h-2 rounded-full w-[75%]"></div>
                </div>
                <p className="text-xs text-muted-foreground">75% repaid</p>
              </div>

              <div>
                <p>
                  <strong>Notes:</strong>
                </p>
                <p className="text-muted-foreground text-sm">
                  Farmer requested an extension due to delayed rains. Monitoring
                  continues with weekly updates.
                </p>
              </div>

              <p className="pt-2 text-muted-foreground text-xs">
                * This is a static mock report preview.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
