"use client"
import { AppSidebar } from "@/components/investor/investor-sidebar"
import { SiteHeader } from "@/components/investor/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Investor() {
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
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
