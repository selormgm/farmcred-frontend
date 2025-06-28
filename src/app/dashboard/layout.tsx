"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import ProtectedRoute from "@/components/Security/ProtectedRoute";
import { useFarmerProfile } from "@/hooks/useFarmerData";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: profile, loading, error } = useFarmerProfile();
  const { isAuth, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch user profile:", error);

      const isTokenError =
        typeof error === "string" &&
        (error.includes("token not valid") ||
          error.includes("Token is invalid") ||
          error.includes("Authentication credentials"));

      if (isTokenError) {
        console.log(
          "Token error detected in dashboard layout, redirecting to login"
        );
        router.replace("/login");
        return;
      }
    }
  }, [error, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff3e4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#158f20] mx-auto"></div>
          <p className="mt-4 text-[#157148] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  if (error && typeof error === "string" && error.includes("token not valid")) {
    return null;
  }

  return (
  
      <ProtectedRoute>
        <div className="flex flex-col">
          <header className="p-4">
            <Navbar
              username={loading ? "Loading..." : profile?.full_name}
              id={profile?.id || 0}
            />
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </ProtectedRoute>

  );
}
