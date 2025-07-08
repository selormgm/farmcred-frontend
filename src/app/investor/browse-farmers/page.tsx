"use client";
import BrowseFarmers from "@/components/investor/BrowseFarmers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFarmerList } from "@/hooks/useInvestorData";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function BrowseFarmersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "region" | "trust score < 60" | "trust score > 60" | "crops"
  >("all");
  const [open, setOpen] = useState(false);

  const { data: farmers, loading, error } = useFarmerList();

  return (
    <div className="px-6 lg:px-24 py-6">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={
                  filter.includes("trust score") ? "default" : "secondary"
                }
              >
                Trust Score
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("trust score > 60")}>
                Above 60
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("trust score < 60")}>
                Below 60
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
  );
}
