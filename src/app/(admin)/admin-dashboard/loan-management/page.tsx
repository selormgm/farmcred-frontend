"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const dummyLoans = [
  {
    id: 1,
    farmer: "Kwame Okoro",
    amount: "GH₵10,000",
    status: "pending",
    dueDate: "2025-09-15",
  },
  {
    id: 2,
    farmer: "Ama Boateng",
    amount: "GH₵7,500",
    status: "approved",
    dueDate: "2025-10-01",
  },
  {
    id: 3,
    farmer: "Yaw Mensah",
    amount: "GH₵12,000",
    status: "completed",
    dueDate: "2025-07-01",
  },
  {
    id: 4,
    farmer: "Esi Brown",
    amount: "GH₵5,000",
    status: "approved",
    dueDate: "2025-11-10",
  },
  {
    id: 5,
    farmer: "Kojo Appiah",
    amount: "GH₵8,500",
    status: "pending",
    dueDate: "2025-09-25",
  },
  {
    id: 6,
    farmer: "Abena Mensimah",
    amount: "GH₵9,000",
    status: "completed",
    dueDate: "2025-06-15",
  },
];

const ITEMS_PER_PAGE = 3;

export default function LoanManagementPage() {
  const [tab, setTab] = useState("pending");
  const [page, setPage] = useState(1);

  const filtered = dummyLoans.filter((loan) =>
    tab === "all" ? true : loan.status === tab
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedLoans = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Loan Management</h1>

      <Tabs
        value={tab}
        onValueChange={(value) => {
          setTab(value);
          setPage(1); // Reset page on tab change
        }}
        className="space-y-6"
      >
        <TabsList className="gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent
          value={tab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedLoans.map((loan) => (
            <Card key={loan.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {loan.farmer}
                  <Badge
                    variant={
                      loan.status === "pending"
                        ? "destructive"
                        : loan.status === "approved"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Loan Amount: {loan.amount}</p>
                <p>Due Date: {loan.dueDate}</p>
                {loan.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="justify-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
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
                onClick={handleNext}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
