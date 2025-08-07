"use client"
import { useEffect, useState } from "react";
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

const dummyFarmers = [
  {
    id: 1,
    name: "Kwame Okoro",
    location: "Volta Region",
    trustLevel: "High",
    totalLoans: 3,
    activeInvestments: 2,
  },
  {
    id: 2,
    name: "Ama Mensah",
    location: "Bono East",
    trustLevel: "Medium",
    totalLoans: 5,
    activeInvestments: 1,
  },
  {
    id: 3,
    name: "Yaw Boateng",
    location: "Eastern Region",
    trustLevel: "Low",
    totalLoans: 1,
    activeInvestments: 0,
  },
  {
    id: 4,
    name: "Efua Adjei",
    location: "Greater Accra",
    trustLevel: "High",
    totalLoans: 4,
    activeInvestments: 3,
  },
  {
    id: 5,
    name: "Kojo Antwi",
    location: "Ashanti Region",
    trustLevel: "Medium",
    totalLoans: 2,
    activeInvestments: 1,
  },
  {
    id: 6,
    name: "Akua Owusu",
    location: "Central Region",
    trustLevel: "Low",
    totalLoans: 0,
    activeInvestments: 0,
  },
];

const ITEMS_PER_PAGE = 5;

export default function FarmersManagementPage() {
  const [search, setSearch] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState(dummyFarmers);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredFarmers.length / ITEMS_PER_PAGE);

  const paginatedFarmers = filteredFarmers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredFarmers(dummyFarmers);
    } else {
      const filtered = dummyFarmers.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFarmers(filtered);
      setCurrentPage(1); // Reset to page 1 on new search
    }
  }, [search]);

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#158f20]">Manage Farmers</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedFarmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{farmer.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{farmer.location}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Trust Level:</strong> {farmer.trustLevel}
              </p>
              <p className="text-sm">
                <strong>Total Loans:</strong> {farmer.totalLoans}
              </p>
              <p className="text-sm">
                <strong>Investments:</strong> {farmer.activeInvestments}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
                <Button size="sm" variant="destructive">
                  Flag/Suspend
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
