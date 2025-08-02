"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin-dashboard/admin-header";
import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar";



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, userRole, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!isAuth || userRole !== "admin")) {
      // console.log("Unauthorized access to admin, redirecting to login")
      router.replace("/admin-login");
    }
  }, [isAuth, userRole, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-primary" />
        <p className="ml-4">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!isAuth || userRole !== "admin") return null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "260px",
          "--header-height": "60px",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <AdminHeader text={""} />
        <main className="flex-1 p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
