"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginAndStoreToken } from "@/lib/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAndStoreToken(email, password);

    if (result.success && result.userRole === "admin") {
      router.push("/admin-dashboard");
    } else {
      setError("Invalid credentials or unauthorized access.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="fixed top-6 left-6 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl max-w-sm text-center shadow-xl">
        <Image
          src="/logo/farmcred-04.png"
          alt="FarmCred Logo"
          width={160}
          height={60}
          className="h-16 w-auto object-contain"
          priority
        />
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:block relative">
          <div className="absolute inset-0">
            <Image
              src="/images/admin-login2.jpg"
              alt="Admin Login Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-[#eff3e4]/20"></div>

          <div className="absolute bottom-12 left-8 right-8 flex justify-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 max-w-sm text-center shadow-xl">
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-white drop-shadow-lg font-[Plus Jakarta Sans]">
                  Welcome to FarmCred
                </h1>
                <p className="text-white/90 font-[Inter] text-sm leading-relaxed drop-shadow-md">
                  Secure access to the FarmCred admin dashboard. Monitor users,
                  manage loans, and track platform performance in one place.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-8 right-8 text-center">
            <p className="text-white/90 font-[Inter] text-xs">
              © {new Date().getFullYear()} FarmCred. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#158f20] font-[Plus Jakarta Sans]">
                Welcome Administrator{" "}
              </h2>
              <p className="mt-2 text-md text-[#157148] font-[Inter]">
                Sign in to the admin dashboard
              </p>
            </div>

            <Card className="border-[#D6DFBC] shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#157148] font-[Inter]">
                  Admin Sign In
                </CardTitle>
                <CardDescription className="text-sm font-[Inter] text-gray-600">
                  Enter your admin credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50"
                    >
                      <AlertDescription className="font-[Inter] text-sm text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-[#157148] font-[Inter]"
                    >
                      Admin Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="h-10 border-[#D6DFBC] focus:border-[#158f20] focus:ring-[#158f20] text-[#157148] font-[Inter] text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-[#157148] font-[Inter]"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="h-10 border-[#D6DFBC] focus:border-[#158f20] focus:ring-[#158f20] text-[#157148] font-[Inter] text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 bg-[#158f20] hover:bg-[#157148] text-white font-[Inter] font-medium text-sm"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-gray-500 font-[Inter] mt-6">
              Only authorized admins may access this portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
