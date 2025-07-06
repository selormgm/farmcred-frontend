import { useInvestorProfile } from "@/hooks/useInvestorData";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export function SiteHeader() {
  const { data: overview } = useInvestorProfile();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-[#158f20]" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-8"
        />
        <h1 className="text-[#158f20] font-[Plus Jakarta Sans] text-2xl font-semibold tracking-tighter">
          Welcome
        </h1>
        <span className="text-[#158f20] font-[Plus Jakarta Sans] text-2xl font-semibold tracking-tighter">
          {overview?.full_name ?? "Investor"}
        </span>
      </div>
    </header>
  );
}
