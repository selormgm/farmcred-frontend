"use client";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FarmerProfile } from "@/lib/types";
import {
  Phone,
  MapPin,
  User,
  ShieldCheck,
  Leaf,
  Home,
  BadgeDollarSign,
  Calendar,
  Landmark,
  Contact,
  ClipboardList,
  Globe,
  BadgeCent,
  PiggyBank,
} from "lucide-react";

interface FarmerProfileDialogProps {
  farmer: FarmerProfile;
  onClose: () => void;
}

export default function FarmerProfileDialogContent({
  farmer,
  onClose,
}: FarmerProfileDialogProps) {
  return (
    <DialogContent className="text-[#158f20] space-y-4">
      <DialogTitle className="text-[#158f20] text-xl mb-2 flex items-center gap-2">
        <User className="w-5 h-5" /> Farmer Profile
      </DialogTitle>

      <Card className="border border-[#157148]/30 rounded-xl shadow-sm">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {/* Full Name */}
          <div className="flex items-center gap-3">
            <User className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-base font-medium">{farmer.full_name}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-base font-medium">{farmer.phone_number}</p>
            </div>
          </div>

          {/* National ID */}
          <div className="flex items-center gap-3">
            <Contact className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">National ID</p>
              <p className="text-base font-medium">{farmer.national_id}</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-3">
            <Calendar className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="text-base font-medium">{farmer.dob}</p>
            </div>
          </div>

          {/* Home Address */}
          <div className="flex items-center gap-3">
            <Home className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Home Address</p>
              <p className="text-base font-medium">{farmer.home_address}</p>
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center gap-3">
            <MapPin className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Region</p>
              <p className="text-base font-medium">{farmer.region}</p>
            </div>
          </div>

          {/* Country */}
          <div className="flex items-center gap-3">
            <Globe className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-base font-medium">{farmer.country}</p>
            </div>
          </div>

          {/* Trust Score */}
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Trust Score</p>
              <p className="text-base font-medium">
                {farmer.trust_score_percent}%
              </p>
            </div>
          </div>

          {/* Trust Level */}
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Trust Level</p>
              <p className="text-base font-medium">
                {farmer.trust_level_stars} stars
              </p>
            </div>
          </div>

          {/* Income */}
          <div className="flex items-center gap-3">
            <BadgeDollarSign className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">
                Total Income (12mo)
              </p>
              <p className="text-base font-medium">
                GHS {farmer.total_income_last_12_months.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Investment Status */}
          <div className="flex items-center gap-3">
            <Landmark className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Investment Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  farmer.investment_status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : farmer.investment_status === "declined"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {farmer.investment_status}
              </span>
            </div>
          </div>

          {/* Produce */}
          <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
            <Leaf className="text-[#158f20] w-5 h-5" />
            <div>
              <p className="text-sm text-muted-foreground">Produce</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {farmer.produce.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-green-100 text-[#158f20] text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions, Transfers, Loans */}
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-2 mt-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#158f20]" />
              Transactions:{" "}
              <span className="font-medium">
                {farmer.transactions?.length ?? 0}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <BadgeCent className="w-4 h-4 text-[#158f20]" />
              Transfers:{" "}
              <span className="font-medium">
                {farmer.transfers?.length ?? 0}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-[#158f20]" />
              Loans:{" "}
              <span className="font-medium">{farmer.loans?.length ?? 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogClose asChild>
        <Button variant="outline" className="mt-2">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
}
