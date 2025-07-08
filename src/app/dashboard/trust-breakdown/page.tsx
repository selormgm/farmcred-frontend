"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TrustStar from "@/components/dashboard/TrustStar";
import { useFarmerProfile, useFarmerOverview } from "@/hooks/useFarmerData";
import {
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Phone,
  MapPin,
  Calendar,
  Info,
  ArrowRight,
  Wheat,
  DollarSign,
  CreditCard,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustBreakdown() {
  const { data: profile, loading: profileLoading } = useFarmerProfile();
  const { data: overview, loading: overviewLoading } = useFarmerOverview();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  if (profileLoading || overviewLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#158f20]"></div>
      </div>
    );
  }

  if (!profile || !overview) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No trust data available</p>
      </div>
    );
  }
  const safeOverview = {
    ...overview,
    trust_score_percent: overview.trust_score_percent || 0,
    current_month_income: overview.current_month_income || 0,
    total_loans: overview.total_loans || 0,
    on_time_loans: overview.on_time_loans || 0,
    missed_loans: overview.missed_loans || 0,
  };

  const safeProfile = {
    ...profile,
    full_name: profile.full_name || "Unknown",
    account_id: profile.id || "N/A",
    region: profile.region || "Unknown",
    country: profile.country || "Unknown",
    produce: profile.produce || [],
    phone_number: profile.phone_number || "N/A",
    trust_level_stars: profile.trust_level_stars || 0,
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "bg-gradient-to-r from-[#158f20] to-[#0f6b18]",
        textColor: "text-[#158f20]",
      };
    if (score >= 80)
      return {
        label: "Very Good",
        color: "bg-gradient-to-r from-[#158f20] to-[#0f6b18]",
        textColor: "text-[#158f20]",
      };
    if (score >= 70)
      return {
        label: "Good",
        color: "bg-gradient-to-r from-[#158f20] to-[#0f6b18]",
        textColor: "text-[#158f20]",
      };
    if (score >= 60)
      return {
        label: "Fair",
        color: "bg-gradient-to-r from-[#158f20] to-[#0f6b18]",
        textColor: "text-[#158f20]",
      };
    return {
      label: "Poor",
      color: "bg-gradient-to-r from-[#158f20] to-[#0f6b18]",
      textColor: "text-[#158f20]",
    };
  };

  const trustLevel = getTrustLevel(safeOverview.trust_score_percent);
  const repaymentRate =
    safeOverview.total_loans > 0
      ? (safeOverview.on_time_loans / safeOverview.total_loans) * 100
      : 0;
  const onTimePaymentRate =
    safeOverview.total_loans > 0
      ? Math.round(
          (safeOverview.on_time_loans / safeOverview.total_loans) * 100
        )
      : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#158f20] to-[#0f6b18] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Trust Overview</h1>
        <p className="text-green-100">
          Comprehensive trust score breakdown and analysis
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-[#eff3e4] to-white border-0 ">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              <Avatar className="w-24 h-24 border-4 border-white ">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-[#158f20] text-white text-2xl font-bold">
                  {safeProfile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-[#158f20] text-xl font-bold">
              {safeProfile.full_name}
            </CardTitle>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-[#158f20] border-green-200"
              >
                <div className="w-2 h-2 rounded-full bg-[#158f20] mr-1"></div>
                Active
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#158f20]" />
                <span className="text-gray-600">{safeProfile.region}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#158f20]" />
                <span className="text-gray-600">
                  {safeProfile.phone_number}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Wheat className="w-4 h-4 text-[#158f20]" />
                <span className="text-gray-600">
                  {safeProfile.produce.length > 0
                    ? safeProfile.produce.join(", ")
                    : "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-[#158f20]" />
                <span className="text-gray-600">
                  Farmer ID: {safeProfile.account_id}
                </span>
              </div>
            </div>

            {/* Trust Level */}
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Trust Level</p>
                <TrustStar income={safeProfile.trust_level_stars} />
                <p className="text-xs text-gray-400 mt-1">
                  {safeProfile.trust_level_stars}/5 stars
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Score Breakdown */}
        <Card className="lg:col-span-2 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#158f20]">
              <Shield className="w-6 h-6" />
              Trust Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trust Score Circle */}
              <div className="flex flex-col items-center justify-center p-6">
                <div className="relative w-40 h-40 mb-4">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f3f4f6"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#158f20"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${
                        (safeOverview.trust_score_percent / 100) * 251.2
                      } 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-boldFarmer ID text-[#158f20]">
                      {safeOverview.trust_score_percent}%
                    </span>
                    <span className="text-xs font-medium text-gray-500 mt-1">
                      {trustLevel.label}
                    </span>
                  </div>
                </div>
                <Badge
                  className={`${trustLevel.color} text-white px-4 py-1 rounded-full`}
                >
                  Trust Score
                </Badge>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Repayments Made
                    </span>
                    <Info className="w-4 h-4 text-[#158f20]" />
                  </div>
                  <div className="text-2xl font-bold text-[#158f20]">
                    {safeOverview.on_time_loans}/{safeOverview.total_loans}
                  </div>
                  <Progress value={onTimePaymentRate} className="h-2 mt-2" />
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      On-time Payments
                    </span>
                    <CheckCircle className="w-4 h-4 text-[#158f20]" />
                  </div>
                  <div className="text-2xl font-bold text-[#158f20]">
                    {onTimePaymentRate}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {safeOverview.on_time_loans} of {safeOverview.total_loans}{" "}
                    payments
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Late Payments
                    </span>
                    <Clock className="w-4 h-4 text-[#158f20]" />
                  </div>
                  <div className="text-2xl font-bold text-[#158f20]">
                    {safeOverview.missed_loans}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Payment delays recorded
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Financial Summary */}
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#158f20]">
              <DollarSign className="w-5 h-5" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">
                Monthly Income
              </span>
              <span className="font-bold text-[#158f20]">
                GH₵{safeOverview.current_month_income.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">
                Consistency
              </span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-[#158f20]"
              >
                8 months active
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">
                Source Verified
              </span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-[#158f20]"
              >
                Yes (Cooperative)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="border-0 ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#158f20]">
              <CreditCard className="w-5 h-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#158f20]" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Recent Payment</div>
                  <div className="text-xs text-gray-500">
                    2 days ago - On time
                  </div>
                </div>
                <span className="text-[#158f20] font-medium">GH₵500</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#158f20]" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Previous Payment</div>
                  <div className="text-xs text-gray-500">
                    1 month ago - On time
                  </div>
                </div>
                <span className="text-[#158f20] font-medium">GH₵750</span>
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                View Full History
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Summary */}
        <Card className="border-0 ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#158f20]">
              <TrendingUp className="w-5 h-5" />
              Trust Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#158f20] mb-2">
                  {trustLevel.label}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Consistently reliable in repayments, with verified earnings
                  and strong farming output
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#158f20]"></div>
                  <span>Verified income source</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#158f20]"></div>
                  <span>High payment consistency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#158f20]"></div>
                  <span>Active farming operations</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="text-center pt-6">
        <Button
          className="bg-[#158f20] hover:bg-[#0f6b18] text-white px-8 py-3 rounded-xl"
          onClick={() => window.history.back()}
        >
          View Full History
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
