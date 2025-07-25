"use client";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InvestorFarmers } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface FarmerProfileDialogProps {
  farmer: InvestorFarmers;
  onClose: () => void;
}

export function InvestorDialogContent({
  farmer,
  onClose,
}: FarmerProfileDialogProps) {
  const { t } = useLanguage();

  return (
    <DialogContent className="text-center space-y-2">
      <DialogTitle className="text-lg font-medium text-gray-800 dark:text-gray-100 ">
        {t("are_you_sure_you_want_to_invest_in")}{" "}
        <span className="font-semibold text-[#158f20]">{farmer.full_name}</span>
        ?
        <DialogClose />
      </DialogTitle>
      <DialogFooter className="flex items-center justify-between">
        <Button variant="outline">{t("yes")}</Button>
        <Button variant="destructive" onClick={onClose}>
          {t("no")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
