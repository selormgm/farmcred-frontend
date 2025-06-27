"use client";

import TransactionHistory from "@/components/TransactionHistory";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFarmerTransactions } from "@/hooks/useFarmerData";
import { handlePrintPDF } from "@/lib/helper-functions";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Printer, Search } from "lucide-react";
import { useState } from "react";
import { BsPrinter } from "react-icons/bs";

export default function TransactionrHistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "csv">("pdf");
  const [open, setOpen] = useState(false);

  const { data: transactions, loading, error } = useFarmerTransactions();

  // Callback to receive filtered transactions from TransactionHistory
  // function handleTransactions(filtered: any[]) {
  //   setTransactions(filtered);
  // }

  function handleExportCSV() {
    const csvRows = [
      ["Name", "Date", "Category", "Status", "Amount"],
      ...(transactions ?? []).map((t) => [
        t.name,
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.status,
        t.amount,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDownload() {
    if (downloadFormat === "pdf") {
      handlePrintPDF(transactions ?? []);
    } else {
      handleExportCSV();
    }
    setOpen(false);
  }

  return (
    <div className="mx-24">
      <div className=" flex items-center justify-center mb-4 flex-col gap-4">
        <span className="font-[Plus Jakarta Sans] text-5xl font-semibold text-[#158F20] ">
          Transactions
        </span>
        <div className="relative w-full max-w-lg">
          <Input
            placeholder="Search..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <Button
            variant={filter === "all" ? "default" : "secondary"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "income" ? "default" : "secondary"}
            onClick={() => setFilter("income")}
          >
            Income
          </Button>
          <Button
            variant={filter === "expense" ? "default" : "secondary"}
            onClick={() => setFilter("expense")}
          >
            Expense
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className=" hover:bg-[#157148] hover:text-white"
            >
              <BsPrinter className="mr-0.5" />
              Print
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Download Format</DialogTitle>
            </DialogHeader>
            <Select
              value={downloadFormat}
              onValueChange={(v) => setDownloadFormat(v as "pdf" | "csv")}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button className="mt-4 w-full" onClick={handleDownload}>
              Download
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <TransactionHistory tablelength={10} search={search} filter={filter} />
    </div>
  );
}
