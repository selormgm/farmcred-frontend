import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Download, Filter } from "lucide-react";

const mockTransactions = [
  {
    id: "TXN1234",
    user: "Kwame Okoro",
    amount: "GH₵ 500.00",
    type: "Loan Payout",
    status: "Successful",
    date: "2024-07-25",
    flagged: false,
  },
  {
    id: "TXN1235",
    user: "Ama Mensah",
    amount: "GH₵ 200.00",
    type: "Produce Sale",
    status: "Successful",
    date: "2024-07-26",
    flagged: true,
  },
  {
    id: "TXN1236",
    user: "Yaw Boateng",
    amount: "GH₵ 1000.00",
    type: "Repayment",
    status: "Failed",
    date: "2024-07-26",
    flagged: false,
  },
];

const ITEMS_PER_PAGE = 10;

export default function TransactionMonitoringPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = mockTransactions.filter((t) => {
    return (
      (!statusFilter || t.status === statusFilter) &&
      (!typeFilter || t.type === typeFilter)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filtered.slice(
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaction Monitoring</h1>
        <div className="space-x-2">
          <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Successful">Successful</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Loan Payout">Loan Payout</SelectItem>
            <SelectItem value="Produce Sale">Produce Sale</SelectItem>
            <SelectItem value="Repayment">Repayment</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Filter className="h-4 w-4 mr-2" /> Advanced Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((txn) => (
                <TableRow
                  key={txn.id}
                  className={txn.flagged ? "bg-red-50" : ""}
                >
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        txn.status === "Successful" ? "default" : "destructive"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>
                    {txn.flagged ? (
                      <Badge variant="destructive">Flagged</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
