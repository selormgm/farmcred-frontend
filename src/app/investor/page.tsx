"use client";
import { BodyCards } from "@/components/investor/investor-body";
import { SectionCards } from "@/components/investor/investor-overview";

export default function Investor() {
  /*const { data: overview, loading, error } = useInvestorProfile;
  const tablelength = 3;
  if (error) {
    console.error("Failed to fetch overview data:", error);
  }
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (!overview) {
    return <div className="p-4">No overview data available.</div>;
  }
  console.log(overview);*/

  return (
    <div className="min-h-screen bg-muted/40 py-6 px-6 lg:px-12 space-y-8">
        <SectionCards />
        <BodyCards />
      </div>
  );
}
