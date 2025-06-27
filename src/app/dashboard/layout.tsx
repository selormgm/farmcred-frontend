"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Security/ProtectedRoute";
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
    <ProtectedRoute>
      <div className="flex flex-col">
        <header className="p-4">
          <Navbar username={loading ? "Loading..." : profile?.full_name}  id={profile?.id || 0}/>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
