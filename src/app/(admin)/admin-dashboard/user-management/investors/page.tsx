"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { InvestorProfile } from "@/lib/types/admintypes";

const mockInvestors: InvestorProfile[] = [
  {
    account: 1,
    full_name: "Kwame Mensah",
    email: "kwame@example.com",
    total_investments: 25000,
    created_at: "2024-09-12",
  },
  {
    account: 2,
    full_name: "Ama Boateng",
    email: "ama@example.com",
    total_investments: 14000,
    created_at: "2024-10-01",
  },
  {
    account: 3,
    full_name: "Kojo Asare",
    email: "kojo@example.com",
    total_investments: 31000,
    created_at: "2024-12-18",
  },
];

const ITEMS_PER_PAGE = 5;

export default function InvestorListPage() {
  const [investors] = useState<InvestorProfile[]>(mockInvestors);
  const [search, setSearch] = useState("");
  const [filteredInvestors, setFilteredInvestors] = useState(mockInvestors);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredInvestors.length / ITEMS_PER_PAGE);

  const paginatedInvestors = filteredInvestors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredInvestors(mockInvestors);
    } else {
      const filtered = mockInvestors.filter((f) =>
        f.full_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInvestors(filtered);
      setCurrentPage(1); // Reset to page 1 on new search
    }
  }, [search]);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#158f20]">Manage Investors</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedInvestors.map((investor) => (
          <Card key={investor.account} className="shadow-sm"> 
            <CardHeader>
              <CardTitle>{investor.full_name}</CardTitle>
              <p className="text-sm text-gray-500">{investor.email}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Investments:</strong> GH₵{" "}
                {investor.total_investments.toLocaleString()}
              </p>
              <p>
                <strong>Joined:</strong> {investor.created_at}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/admin-dashboard/user-management/investors/${investor.account}`}
                >
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </Link>
                <Button size="sm" variant="destructive">
                  Flag / Suspend
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="justify-center pt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
