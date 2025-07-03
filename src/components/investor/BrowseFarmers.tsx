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
import { useInvestorProfile } from "@/hooks/useInvestorData";
import { InvestorFarmers } from "@/lib/types";
import { useState } from "react";

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
  const { data: investorProfile, loading, error } = useInvestorProfile();
  const length = tablelength;
  const farmers: InvestorFarmers[] = investorProfile?.farmers
    ? (investorProfile.farmers as string[]).map((farmerStr) =>
        JSON.parse(farmerStr)
      )
    : [];

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
    if (filter === "region" && farmers.region !== "region") return false;
    if (filter === "trust score" && farmers.trust_score_percent < 80)
      return false;
    if (filter === "crop" && (!search || !farmers.produce.includes(search)))
      return false;

    if (!search) return true;

    const query = search.toLowerCase();
    return (
      farmers.full_name.toLowerCase().includes(query) ||
      farmers.account_id.toString().includes(query) ||
      farmers.country.toLowerCase().includes(query) ||
      farmers.region.toLowerCase().includes(query)
    );
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
        className="text-base font-normal text-[#158F20] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.produce}
      </TableCell>
      <TableCell
        className="text-base font-normal text-[#158F20] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.phone_number}
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
          <DialogContent className="text-[#158f20]">
            <DialogTitle className="text-[#157148]">
              Farmer Profile
            </DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default BrowseFarmers;
