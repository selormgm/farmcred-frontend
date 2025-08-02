"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InvestorDetail {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  total_investments: number;
  created_at: string;
  is_active: boolean;
  investments: {
    project: string;
    amount: number;
    date: string;
  }[];
}

// Mock data
const mockInvestor: InvestorDetail = {
  id: 1,
  full_name: "Kwame Mensah",
  email: "kwame@example.com",
  phone_number: "0551234567",
  total_investments: 25000,
  created_at: "2024-09-12",
  is_active: true,
  investments: [
    {
      project: "Cashew Expansion",
      amount: 10000,
      date: "2024-12-01",
    },
    {
      project: "Rice Farm Partnership",
      amount: 15000,
      date: "2025-02-15",
    },
  ],
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InvestorProfilePage() {
  const { id } = useParams();

  const investor = mockInvestor;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Investor Profile</h1>
        <Link href="/admin-dashboard/user-management">
          <Button variant="outline" size="sm">Back to Management</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{investor.full_name}</CardTitle>
          <p className="text-sm text-gray-500">{investor.email}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Phone:</strong> {investor.phone_number}</p>
          <p>
            <strong>Status:</strong>{" "}
            {investor.is_active ? (
              <Badge>Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </p>
          <p><strong>Joined:</strong> {formatDate(investor.created_at)}</p>
          <p><strong>Total Invested:</strong> GH₵ {investor.total_investments.toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Investment History</h2>
        {investor.investments.length === 0 ? (
          <p className="text-gray-500">No investments yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {investor.investments.map((inv, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{inv.project}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p><strong>Amount:</strong> GH₵ {inv.amount.toLocaleString()}</p>
                  <p><strong>Date:</strong> {formatDate(inv.date)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
