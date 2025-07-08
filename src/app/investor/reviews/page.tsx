"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useInvestorReview } from "@/hooks/useInvestorData";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function ReviewFarmersPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const { data: review, loading, error } = useInvestorReview();

  return(
    <div className="mx-24">
      <div className=" flex items-center justify-center mb-4 flex-col gap-4">
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
         
    </div>
  )
}
