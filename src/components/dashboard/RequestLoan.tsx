"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useFarmerLoan, useRequestLoan } from "@/hooks/useFarmerLoan";

export function RequestLoanModal({ onSuccess }: { onSuccess?: () => void }) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("");
  const {
    requestLoan,
    loading,
    error
  } = useRequestLoan();

const handleSubmit = async () => {
  try {
    await requestLoan({
      amount: Number(amount),
    });
    toast.success("Loan requested successfully!");
    onSuccess?.(); // optional callback
  } catch (err) {
    toast.error(error || "Loan request failed");
  }
};

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle className="text-[#158f20]">Request a Loan</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter loan amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Input
            id="purpose"
            placeholder="What is the loan for?"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="duration">Duration (months)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g. 6"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#158f20] text-white hover:bg-[#10741b]"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
