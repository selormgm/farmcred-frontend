"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock farmer data
const mockFarmers = {
  1: {
    id: 1,
    full_name: "Kwame Okoro",
    email: "kwame.okoro@example.com",
    phone_number: "+233 55 123 4567",
    region: "Volta Region",
    created_at: "2023-04-15",
    trust_level: "High",
    delivery_success_rate: 95,
    review_score: 4.7,
    loan_repayment_rate: 90,
    loans: [
      { id: 101, amount: 2000, status: "Repaid", date: "2023-07-01" },
      { id: 102, amount: 1500, status: "Ongoing", date: "2024-03-15" },
    ],
  },
  2: {
    id: 2,
    full_name: "Ama Mensah",
    email: "ama.mensah@example.com",
    phone_number: "+233 24 765 4321",
    region: "Bono East",
    created_at: "2023-06-10",
    trust_level: "Medium",
    delivery_success_rate: 83,
    review_score: 4.1,
    loan_repayment_rate: 78,
    loans: [
      { id: 103, amount: 1200, status: "Repaid", date: "2023-09-10" },
      { id: 104, amount: 1800, status: "Defaulted", date: "2024-01-20" },
    ],
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusBadgeColor(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "repaid":
      return "default"; // green-like
    case "ongoing":
      return "secondary"; // gray
    case "defaulted":
      return "destructive"; // red
    default:
      return "outline";
  }
}

export default function FarmerProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMock = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      const mockData =
        mockFarmers[Number(id) as keyof typeof mockFarmers] || null;
      setFarmer(mockData);
      setLoading(false);
    };
    fetchMock();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!farmer) return <p className="p-4 text-red-600">Farmer not found</p>;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Back Link */}
      <Button
        onClick={() => router.push("/admin-dashboard/user-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to User Management
      </Button>

      <h1 className="text-2xl font-bold">Farmer Profile</h1>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Full Name:</strong> {farmer.full_name}
          </p>
          <p>
            <strong>Email:</strong> {farmer.email}
          </p>
          <p>
            <strong>Phone:</strong> {farmer.phone_number}
          </p>
          <p>
            <strong>Region:</strong> {farmer.region || "Not set"}
          </p>
          <p>
            <strong>Joined:</strong> {formatDate(farmer.created_at)}
          </p>
        </CardContent>
      </Card>

      {/* Trust Score */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Trust Level:</strong> {farmer.trust_level}
          </p>
          <p>
            <strong>Score Breakdown:</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>Delivery Success Rate: {farmer.delivery_success_rate}%</li>
            <li>Reviews: {farmer.review_score}/5</li>
            <li>Loan Repayment Rate: {farmer.loan_repayment_rate}%</li>
          </ul>
        </CardContent>
      </Card>

      {/* Loan History */}
      <Card>
        <CardHeader>
          <CardTitle>Loan History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {farmer.loans.length === 0 ? (
            <p>No loans found.</p>
          ) : (
            <ul className="space-y-2">
              {farmer.loans.map((loan: any) => (
                <li
                  key={loan.id}
                  className="flex justify-between border p-3 rounded-md bg-muted"
                >
                  <div>
                    <p>
                      <strong>Loan ID:</strong> #{loan.id}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(loan.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <strong>Amount:</strong> GH₵{loan.amount}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant={getStatusBadgeColor(loan.status)}>
                        {loan.status}
                      </Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="destructive">Flag / Suspend</Button>
        <Button variant="outline">Export Profile</Button>
      </div>
    </main>
  );
}
