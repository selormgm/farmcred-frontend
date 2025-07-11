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
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useFarmerList } from "@/hooks/useInvestorData";
import { useFarmerDetails } from "@/hooks/useInvestorData";
import { InvestorFarmers } from "@/lib/types";
import { useState } from "react";
import FarmerProfile from "./FarmerProfileDialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InvestorDialogContent } from "./InvestmentDialog";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const { data: farmerListData, loading, error } = useFarmerList();
  const length = tablelength;
  const farmers: InvestorFarmers[] = Array.isArray(farmerListData)
    ? farmerListData
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#157148]">{t("loading_farmers")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">
          {t("error_loading_farmers")}: {error}
        </div>
      </div>
    );
  }

  if (!farmers || farmers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">{t("no_farmers_available")}</div>
      </div>
    );
  }

  const filteredFarmers = farmers.filter((farmer: InvestorFarmers) => {
    const query = search?.toLowerCase() || "";
    if (
      filter === "region" &&
      search &&
      farmer.region.toLowerCase() !== query
    ) {
      return false;
    }
    if (filter === "trust score > 60" && farmer.trust_score_percent <= 60) {
      return false;
    }
    if (filter === "trust score < 60" && farmer.trust_score_percent >= 60) {
      return false;
    }
    if (
      filter === "crop" &&
      search &&
      !farmer.produce.some((crop) => crop.toLowerCase().includes(query))
    ) {
      return false;
    }

    if (search && filter === "all") {
      return (
        farmer.full_name.toLowerCase().includes(query) ||
        farmer.account_id.toString().includes(query) ||
        farmer.country.toLowerCase().includes(query) ||
        farmer.region.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const farmerData = filteredFarmers.slice(0, length);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-200 hover:bg-transparent">
          {[
            "farmer_id",
            "name",
            "region",
            "trust_score",
            "produce",
            "phone_number",
            "investment_status",
            "action",
          ].map((label) => (
            <TableHead
              key={label}
              className="text-base font-normal text-card-foreground h-auto py-3"
              style={{ letterSpacing: "-0.06em" }}
            >
              {t(label)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {farmerData.map((farmer: InvestorFarmers, index: number) => (
          <FarmerTableRow
            key={farmer.account_id}
            farmers={farmer}
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
  const { t } = useLanguage();
  const [openDetails, setOpenDetails] = useState(false);
  const [openInvest, setOpenInvest] = useState(false);
  const { data: fullProfile, loading } = useFarmerDetails(farmers.account_id);

  return (
    <TableRow
      className={`hover:bg-transparent ${
        !isLast ? "border-b border-gray-100" : "border-none"
      }`}
    >
      <TableCell
        className="text-base font-normal text-[#158F20] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.account_id}
      </TableCell>
      <TableCell
        className="text-base font-normal text-[#158F20] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.full_name}
      </TableCell>
      <TableCell
        className="text-base font-normal text-[#72BF01] py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.region}
      </TableCell>
      <TableCell
        className="text-base font-normal py-3 text-[#05402E]  dark:text-green-700"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.trust_score_percent}%
      </TableCell>
      <TableCell
        className="text-base font-normal py-3 flex gap-1 flex-wrap"
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
        className="text-base font-normal text-[#05402E]  dark:text-green-700 py-3"
        style={{ letterSpacing: "-0.06em" }}
      >
        {farmers.phone_number}
      </TableCell>
      <TableCell className="py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        farmers.investment_status === "accepted"
          ? "bg-green-100 text-[#158f20] dark:bg-green-900 dark:text-green-300"
          : farmers.investment_status === "declined"
          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }`}
        >
          {farmers.investment_status || t("no_investment")}
        </span>
      </TableCell>

      <TableCell className="py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-[#157148]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col w-40 gap-1">
            <DropdownMenuItem onClick={() => setOpenDetails(true)}>
              {t("view_details")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenInvest(true)}>
             {t("invest_in_farmer")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={openDetails} onOpenChange={setOpenDetails}>
          <FarmerProfile
            farmer={farmers}
            fullProfile={fullProfile}
            onClose={() => setOpenDetails(false)}
          />
        </Dialog>
        <Dialog open={openInvest} onOpenChange={setOpenInvest}>
          <InvestorDialogContent
            farmer={farmers}
            onClose={() => setOpenInvest(false)}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default BrowseFarmers;
