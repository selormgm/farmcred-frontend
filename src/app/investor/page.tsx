"use client";
import { BodyCards } from "@/components/investor/investor-body";
import { SectionCards } from "@/components/investor/investor-overview";
import { AppSidebar } from "@/components/investor/investor-sidebar";
import { SiteHeader } from "@/components/investor/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 62)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <BodyCards />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
