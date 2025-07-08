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
    <DialogContent>
      <DialogTitle>
        Are you sure you want to invest in {farmer.full_name}
        <DialogClose />
      </DialogTitle>
      <DialogFooter>
        <Button>Yes</Button>
        <Button>No</Button>
      </DialogFooter>
    </DialogContent>
  );
}
