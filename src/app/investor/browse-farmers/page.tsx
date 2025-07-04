"use client";
import BrowseFarmers from "@/components/investor/BrowseFarmers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInvestorProfile } from "@/hooks/useInvestorData";
import { Search } from "lucide-react";
import { useState } from "react";

export default function BrowseFarmersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "region" | "trust score" | "crops" >("all");
  const [open, setOpen] = useState(false);

  const {data: farmers, loading, error} = useInvestorProfile();

  return(
    <div className="mx-24">
      <div className=" flex items-center justify-center mb-4 flex-col gap-4">
        <span className="font-[Plus Jakarta Sans] text-5xl font-semibold text-[#158F20] ">
          Browse Farmers
        </span>
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
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <Button
            variant={filter === "all" ? "default" : "secondary"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "region" ? "default" : "secondary"}
            onClick={() => setFilter("region")}
          >
            Region
          </Button>
          <Button
            variant={filter === "trust score" ? "default" : "secondary"}
            onClick={() => setFilter("trust score")}
          >
            Trust Score
          </Button>
          <Button
            variant={filter === "crops" ? "default" : "secondary"}
            onClick={() => setFilter("crops")}
          >
            Crops
          </Button>
        </div>
    </div>

    <BrowseFarmers tablelength={10} search={search} filter={filter} />
    </div>
  )
}
