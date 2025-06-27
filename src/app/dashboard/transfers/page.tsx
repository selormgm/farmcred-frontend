"use client";

import TransferTable from "@/components/TransferTable";
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
import {
  useFarmerTransfers,
} from "@/hooks/useFarmerData";
import { handlePrintTransfersPDF } from "@/lib/helper-functions";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Printer, Search } from "lucide-react";
import { useState } from "react";
import { BsPrinter } from "react-icons/bs";

export default function TransferHistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "csv">("pdf");
  const [open, setOpen] = useState(false);

  const { data: transfers, loading, error } = useFarmerTransfers();

  function handleExportTransfersCSV() {
    const csvRows = [
      ["Id", "Date", "Recipient/Sender", "Type", "Amount", "Status"],
      ...(transfers ?? []).map((t) => [
        t.id,
        new Date(t.date).toLocaleDateString(),
        t.recipient_or_sender,
        t.type,
        t.amount,
        t.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transfers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDownload() {
    if (downloadFormat === "pdf") {
      handlePrintTransfersPDF(transfers ?? []);
    } else {
      handleExportTransfersCSV();
    }
    setOpen(false);
  }

  return (
    <div className="mx-24">
      <div className=" flex items-center justify-center mb-4 flex-col gap-4">
        <span className="font-[Plus Jakarta Sans] text-5xl font-semibold text-[#158F20]">
          Transfers
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="space-x-2">
            <Button
              variant={filter === "all" ? "default" : "secondary"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "secondary"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "secondary"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "failed" ? "default" : "secondary"}
              onClick={() => setFilter("failed")}
            >
              Failed
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

        <TransferTable tablelength={10} search={search} filter={filter} />
      </div>
    </div>
  );
}
