"use client";

import { FarmerBody } from "@/components/dashboard/farmer-body";
import { FarmerOverview } from "@/components/dashboard/farmer-overview";

export default function Dashboard() {
 return (
    <div className="min-h-screen bg-muted/40 py-6 px-6 lg:px-12 space-y-8">
        <FarmerOverview />
        <FarmerBody />
      </div>
  );
}
