"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function RequestLoanModal() {
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/loans/request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          purpose,
          duration_months: duration,
        }),
      })

      if (response.ok) {
        toast.success("Loan request submitted successfully!")
        setAmount("")
        setPurpose("")
        setDuration("")
      } else {
        toast.error("Failed to request loan.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

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
            className="bg-[#158f20] text-white hover:bg-[#10741b]"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
  )
}
