"use client";
import { BodyCards } from "@/components/investor/investor-body";
import { SectionCards } from "@/components/investor/investor-overview";
import { SiteHeader } from "@/components/investor/site-header";
import { useInvestorProfile } from "@/hooks/useInvestorData";

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
    <div className="space-y-6">
      <div className="space-y-8 px-4">
        <SectionCards />
        <BodyCards />
      </div>
    </div>
  );
}
