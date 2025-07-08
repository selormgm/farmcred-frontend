"use client";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FarmerProfile, InvestorFarmers } from "@/lib/types";

interface FarmerProfileDialogProps {
  farmer: InvestorFarmers;
  onClose: () => void;
}

export function InvestorDialogContent({
  farmer,
  onClose,
}: FarmerProfileDialogProps) {
  return (
    <DialogContent className="text-center space-y-2">
      <DialogTitle className="text-lg font-medium text-gray-800 dark:text-gray-100 ">
        Are you sure you want to invest in{" "}
        <span className="font-semibold text-[#158f20]">{farmer.full_name}</span>
        ?
        <DialogClose />
      </DialogTitle>
      <DialogFooter className="flex items-center justify-between">
        <Button variant="outline">Yes</Button>
        <Button variant="destructive" onClick={onClose}>
          No
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}


