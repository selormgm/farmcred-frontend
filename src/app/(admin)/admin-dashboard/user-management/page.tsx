"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Sprout, Briefcase } from "lucide-react";

export default function UserManagementPage() {
  const [farmerSearch, setFarmerSearch] = useState("");
  const [farmerTrustFilter, setFarmerTrustFilter] = useState("all");

  const [investorSearch, setInvestorSearch] = useState("");
  const [investmentFilter, setInvestmentFilter] = useState("all");

  const [farmers] = useState<any[]>([
    { id: 1, full_name: "Ama Boateng", email: "ama@example.com", trust_level: "High", created_at: "2025-06-01" },
    { id: 2, full_name: "Kojo Mensah", email: "kojo@example.com", trust_level: "Medium", created_at: "2025-05-14" },
    { id: 3, full_name: "Yaw Agyeman", email: "yaw@example.com", trust_level: "Low", created_at: "2025-04-12" },
  ]);

  const [investors] = useState<any[]>([
    { id: 1, full_name: "Kwesi Owusu", email: "kwesi@example.com", total_investments: 10000, created_at: "2025-04-20" },
    { id: 2, full_name: "Esi Dede", email: "esi@example.com", total_investments: 5000, created_at: "2025-05-11" },
    { id: 3, full_name: "Yaw K.", email: "yaw.k@example.com", total_investments: 3000, created_at: "2025-06-15" },
  ]);

  const filteredFarmers = useMemo(() => {
    return farmers.filter((f) => {
      const matchesSearch =
        f.full_name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
        f.email.toLowerCase().includes(farmerSearch.toLowerCase());
      const matchesTrust =
        farmerTrustFilter === "all" || f.trust_level?.toLowerCase() === farmerTrustFilter;
      return matchesSearch && matchesTrust;
    });
  }, [farmerSearch, farmerTrustFilter, farmers]);

  const filteredInvestors = useMemo(() => {
    return investors.filter((i) => {
      const matchesSearch =
        i.full_name.toLowerCase().includes(investorSearch.toLowerCase()) ||
        i.email.toLowerCase().includes(investorSearch.toLowerCase());

      const matchesInvestment =
        investmentFilter === "all" ||
        (investmentFilter === "<5000" && i.total_investments < 5000) ||
        (investmentFilter === "5000-10000" &&
          i.total_investments >= 5000 &&
          i.total_investments <= 10000) ||
        (investmentFilter === ">10000" && i.total_investments > 10000);

      return matchesSearch && matchesInvestment;
    });
  }, [investorSearch, investmentFilter, investors]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <Tabs defaultValue="farmers">
        <TabsList className="mb-4">
          <TabsTrigger value="farmers" className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Farmers
          </TabsTrigger>
          <TabsTrigger value="investors" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Investors
          </TabsTrigger>
        </TabsList>

        {/* Farmers */}
        <TabsContent value="farmers">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search farmers by name or email..."
              value={farmerSearch}
              onChange={(e) => setFarmerSearch(e.target.value)}
              className="w-full sm:max-w-sm"
            />
            <Select value={farmerTrustFilter} onValueChange={setFarmerTrustFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Trust Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <Card key={farmer.id}>
                <CardHeader>
                  <CardTitle>{farmer.full_name}</CardTitle>
                  <p className="text-sm text-gray-500">{farmer.email}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Trust Level:</strong> {farmer.trust_level || "N/A"}
                  </p>
                  <p>
                    <strong>Joined:</strong> {farmer.created_at?.slice(0, 10)}
                  </p>
                  <Link href={`/admin/farmer/${farmer.id}/profile`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Investors */}
        <TabsContent value="investors">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search investors by name or email..."
              value={investorSearch}
              onChange={(e) => setInvestorSearch(e.target.value)}
              className="w-full sm:max-w-sm"
            />
            <Select value={investmentFilter} onValueChange={setInvestmentFilter}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="Investment Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="<5000">Less than GHS 5,000</SelectItem>
                <SelectItem value="5000-10000">GHS 5,000 – 10,000</SelectItem>
                <SelectItem value=">10000">More than GHS 10,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <Card key={investor.id}>
                <CardHeader>
                  <CardTitle>{investor.full_name}</CardTitle>
                  <p className="text-sm text-gray-500">{investor.email}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Investments:</strong> GHS {investor.total_investments || "0"}
                  </p>
                  <p>
                    <strong>Joined:</strong> {investor.created_at?.slice(0, 10)}
                  </p>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
