"use client";

import Navbar from "@/components/Navbar";
import { useFarmerProfile } from "@/hooks/useFarmerData";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: profile, loading, error } = useFarmerProfile();

  if (error) {
    console.error("Failed to fetch user profile:", error);
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4">
        <Navbar username={loading ? "Loading..." : profile?.full_name} />
      </header>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
