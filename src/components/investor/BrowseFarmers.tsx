"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useFarmerList } from "@/hooks/useInvestorData";
import { useFarmerDetails } from "@/hooks/useInvestorData";
import { InvestorFarmers } from "@/lib/types";
import { useState } from "react";
import FarmerProfile from "./FarmerProfile";

interface BrowseFarmersProps {
  tablelength: number;
  search?: string;
  filter?: string;
  onFiltered?: (filtered: InvestorFarmers[]) => void;
}

const BrowseFarmers = ({
  tablelength,
  search,
  filter = "all",
}: BrowseFarmersProps) => {
  const { data: investorProfile, loading, error } = useFarmerList();
  const length = tablelength;
  const farmers: InvestorFarmers[] = investorProfile ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#157148]">Loading availbale farmers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Failed to load available farmers</div>
      </div>
    );
  }

  if (!farmers || farmers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">No farmers available</div>
      </div>
    );
  }

  //Filter farmers based on search query(case-insensitive)
  const filteredFarmers = farmers.filter((farmers: InvestorFarmers) => {
    const query = search?.toLowerCase() || "";
    if (
      filter === "region" &&
      search &&
      farmers.region.toLowerCase() !== query
    ) {
      return false;
    }
    if (filter === "trust score > 60" && farmers.trust_score_percent <= 60) {
      return false;
    }
    if (filter === "trust score < 60" && farmers.trust_score_percent >= 60) {
      return false;
    }
    if (
      filter === "crop" &&
      search &&
      !farmers.produce.some((crop) => crop.toLowerCase().includes(query))
    ) {
      return false;
    }

    if (search && filter === "all") {
      return (
        farmers.full_name.toLowerCase().includes(query) ||
        farmers.account_id.toString().includes(query) ||
        farmers.country.toLowerCase().includes(query) ||
        farmers.region.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const farmerData = filteredFarmers.slice(0, length);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-200 hover:bg-transparent">
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Farmer ID
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Name
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Region
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Trust Score
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Produce
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Phone Number
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Investment Status
          </TableHead>
          <TableHead
            className="text-base font-normal text-card-foreground h-auto py-3"
            style={{ letterSpacing: "-0.06em" }}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {farmerData.map((farmers: InvestorFarmers, index: number) => (
          <FarmerTableRow
            key={farmers.account_id}
            farmers={farmers}
            isLast={index === farmerData.length - 1}
          />
        ))}
      </TableBody>
    </Table>
  );
};

interface FarmersTableRowProps {
  farmers: InvestorFarmers;
  isLast: boolean;
}

function FarmerTableRow({ farmers, isLast }: FarmersTableRowProps) {
  const [open, setOpen] = useState(false);
  const { data: fullProfile, loading } = useFarmerDetails(farmers.account_id);

  return (
    <TableRow
      className={`hover:bg-transparent ${
        !isLast ? "border-b border-gray-100" : "border-none"
      }`}
    >
      <TableCell
        className="text-base font-normal py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.account_id}
      </TableCell>
      <TableCell
        className="text-base font-normal py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.full_name}
      </TableCell>
      <TableCell
        className="text-base font-normal py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.region}
      </TableCell>
      <TableCell
        className="text-base font-normal py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.trust_score_percent}
      </TableCell>
      <TableCell
        className="text-base font-normal text-[#158F20] py-3 flex gap-1 flex-wrap"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.produce.map((item, index) => (
          <span
            key={index}
            className="bg-[#158F20] items-center text-white text-xs px-2 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </TableCell>
      <TableCell
        className="text-base font-normal text-[#158F20] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.phone_number}
      </TableCell>
      <TableCell className="py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            farmers.investment_status === "accepted"
              ? "bg-green-100 text-[#158f20]"
              : farmers.investment_status === "declined"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {farmers.investment_status}
        </span>
      </TableCell>

      <TableCell className="py-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setOpen(true)}
        >
          <MoreVertical className="h-4 w-4 text-[#157148]" />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <FarmerProfile farmer={farmers} onClose={() => setOpen(false)} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default BrowseFarmers;
