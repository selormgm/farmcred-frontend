"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";

export default function TrustScoreManagementPage() {
  const [showHigh, setShowHigh] = useState(true);
  const [showMedium, setShowMedium] = useState(false);
  const [showLow, setShowLow] = useState(false);
  const [showFlagged, setShowFlagged] = useState(false);

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Trust Score Management</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard
          label="High Trust Farmers"
          value="56"
          color="text-green-700"
        />
        <SummaryCard
          label="Medium Trust Farmers"
          value="34"
          color="text-yellow-500"
        />
        <SummaryCard
          label="Low Trust Farmers"
          value="14"
          color="text-red-500"
        />
        <SummaryCard
          label="Trust Flags"
          value="5 Flags"
          color="text-red-700"
          icon={<ShieldAlert />}
        />
      </div>

      {/* Algorithm Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Algorithm Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Loan Repayment History",
            "Investment Participation",
            "Account Age",
            "Reviews & Ratings",
            "Delivery Accuracy",
          ].map((label) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <input
                type="number"
                className="border px-2 py-1 w-16 rounded"
                defaultValue={20}
              />
            </div>
          ))}
          <Button className="mt-4">Save Weights</Button>
        </CardContent>
      </Card>

      {/* High Trust Section */}
      <CollapsibleSection
        title="High Trust Farmers"
        isOpen={showHigh}
        toggle={() => setShowHigh(!showHigh)}
        color="green"
      />

      {/* Medium Trust Section */}
      <CollapsibleSection
        title="Medium Trust Farmers"
        isOpen={showMedium}
        toggle={() => setShowMedium(!showMedium)}
        color="yellow"
      />

      {/* Low Trust Section */}
      <CollapsibleSection
        title="Low Trust Farmers"
        isOpen={showLow}
        toggle={() => setShowLow(!showLow)}
        color="red"
      />

      {/* Flagged Anomalies */}
      <CollapsibleSection
        title="Flagged Anomalies"
        isOpen={showFlagged}
        toggle={() => setShowFlagged(!showFlagged)}
        color="red"
      />
    </main>
  );
}

function SummaryCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className={`text-sm font-medium ${color}`}>
          {label}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className={`text-xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function CollapsibleSection({
  title,
  isOpen,
  toggle,
  color,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  color: string;
}) {
  return (
    <Card>
      <CardHeader
        className="flex flex-row justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <CardTitle className={`text-lg font-semibold text-${color}-700`}>
          {title}
        </CardTitle>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </CardHeader>
      {isOpen && (
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">Farmer {i}</p>
              <p>Trust Score: {Math.floor(Math.random() * 30 + 70)}%</p>
              <Button variant="outline" className="mt-2">
                Adjust Trust
              </Button>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
