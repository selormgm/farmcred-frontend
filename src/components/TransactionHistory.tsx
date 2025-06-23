"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {  MoreVertical } from "lucide-react";
import { useFarmerTransactions } from "@/hooks/useFarmerData";
import { Transaction } from "@/lib/types";

const TransactionHistory = () => {
  const { data: transactions, loading, error } = useFarmerTransactions();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#157148]">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Failed to load transactions</div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">No transactions available</div>
      </div>
    );
  }

  const transactionData = transactions.slice(0, 4); // Show max 4 transactions

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-200 hover:bg-transparent">
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Transaction Name
          </TableHead>
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Date
          </TableHead>
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Category
          </TableHead>
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Status
          </TableHead>
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Amount
          </TableHead>
          <TableHead
            className="text-base font-normal text-black/40 h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionData.map((transaction: Transaction, index: number) => (
          <TableRow
            key={transaction.id}
            className={`hover:bg-transparent ${
              index !== transactionData.length - 1
                ? "border-b border-gray-100"
                : "border-none"
            }`}
          >
            <TableCell
              className="text-base font-normal text-[#157148] py-3"
              style={{ letterSpacing: "-0.06em" }}
            >
              {transaction.name}
            </TableCell>
            <TableCell
              className="text-base font-normal text-[#157148] py-3"
              style={{ letterSpacing: "-0.06em" }}
            >
              {new Date(transaction.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell
              className="text-base font-normal text-[#157148] py-3"
              style={{ letterSpacing: "-0.06em" }}
            >
              {transaction.category}
            </TableCell>
            <TableCell className="py-3">
              <Badge
                className={`px-3 py-1 rounded-full text-white font-normal text-sm border-none ${
                  transaction.status === "income"
                    ? "bg-[#72BF01] hover:bg-[#72BF01]"
                    : "bg-[#158F20] hover:bg-[#158F20]"
                }`}
                style={{ letterSpacing: "-0.06em" }}
              >
                {transaction.status === "income" ? "Income" : "Expenses"}
              </Badge>
            </TableCell>
            <TableCell
              className="text-base font-medium text-[#157148] py-3"
              style={{ letterSpacing: "-0.06em" }}
            >
              ₵ {transaction.amount.toLocaleString()}
            </TableCell>
            <TableCell className="py-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4 text-[#157148]" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionHistory;
