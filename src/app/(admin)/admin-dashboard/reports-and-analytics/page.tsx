"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Download, Clock } from "lucide-react";
import { format } from "date-fns";

// Mock definitions
const reportOptions = [
  {
    key: "monthly-platform",
    title: "Monthly Platform Report",
    description: "Summary of loans, users, and revenue for the month.",
    metric: "Total Loans: 320",
  },
  {
    key: "user-growth",
    title: "User Growth Report",
    description: "New farmers and investors acquired over time.",
    metric: "New Farmers: 58",
  },
  {
    key: "loan-performance",
    title: "Loan Performance",
    description: "Repayment rates, defaults, and approval trends.",
    metric: "Repayment Rate: 87%",
  },
  {
    key: "investment-returns",
    title: "Investment Returns",
    description: "Overview of ROI across active investments.",
    metric: "Average ROI: 6.1%",
  },
  {
    key: "trust-changes",
    title: "Trust Level Changes",
    description: "Shifts in trust scores across the platform.",
    metric: "High Trust ↑ 5%",
  },
];

// Mock scheduled reports
type ScheduledReport = {
  id: string;
  reportKey: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  time: string; // HH:MM
  recipients: string;
  enabled: boolean;
  nextRun: string;
};

const initialSchedules: ScheduledReport[] = [
  {
    id: "sch1",
    reportKey: "monthly-platform",
    frequency: "Monthly",
    time: "08:00",
    recipients: "admin@farmcred.com",
    enabled: true,
    nextRun: "September 1, 2025 08:00",
  },
  {
    id: "sch2",
    reportKey: "loan-performance",
    frequency: "Weekly",
    time: "09:30",
    recipients: "loans@farmcred.com",
    enabled: false,
    nextRun: "August 4, 2025 09:30",
  },
];

export default function ReportsAnalyticsPage() {
  const [selectedReportKey, setSelectedReportKey] = useState<string>("");
  const [schedules, setSchedules] =
    useState<ScheduledReport[]>(initialSchedules);
  const [newSchedule, setNewSchedule] = useState<Partial<ScheduledReport>>({
    reportKey: "",
    frequency: "Daily",
    time: "07:00",
    recipients: "",
    enabled: true,
  });

  const selectedReport = reportOptions.find((r) => r.key === selectedReportKey);

  const handleCreateSchedule = () => {
    if (!newSchedule.reportKey || !newSchedule.time || !newSchedule.recipients)
      return;
    const nextRun = computeNextRun(newSchedule.frequency!, newSchedule.time!);
    setSchedules((prev) => [
      ...prev,
      {
        id: `sch_${Date.now()}`,
        reportKey: newSchedule.reportKey!,
        frequency: newSchedule.frequency as any,
        time: newSchedule.time!,
        recipients: newSchedule.recipients!,
        enabled: newSchedule.enabled ?? true,
        nextRun,
      },
    ]);
    // reset partial
    setNewSchedule({
      reportKey: "",
      frequency: "Daily",
      time: "07:00",
      recipients: "",
      enabled: true,
    });
  };

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Preview, generate, or automate recurring report delivery.
          </p>
        </div>
      </div>

      {/* Preview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportOptions.map((report) => (
          <Card
            key={report.key}
            className={`shadow-sm border ${
              selectedReportKey === report.key ? "border-primary" : ""
            }`}
          >
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{report.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {report.description}
                </p>
              </div>
              {selectedReportKey === report.key && <Badge>Selected</Badge>}
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{report.metric}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setSelectedReportKey(report.key)}
                  variant={
                    selectedReportKey === report.key ? "secondary" : "default"
                  }
                >
                  {selectedReportKey === report.key ? "Selected" : "Preview"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={selectedReportKey !== report.key}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Generator & Feedback */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-2">
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Report</p>
                <Select onValueChange={(val) => setSelectedReportKey(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a report to generate" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportOptions.map((opt) => (
                      <SelectItem key={opt.key} value={opt.key}>
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Format</p>
                <Select onValueChange={() => {}}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="PDF / CSV" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedReport && (
              <p className="text-sm text-muted-foreground">
                Ready to generate: <strong>{selectedReport.title}</strong>
              </p>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button disabled={!selectedReport}>
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
              <Button disabled={!selectedReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Generate CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Auto Reporting */}
        <Card className="space-y-2">
          <CardHeader>
            <CardTitle>Scheduled Auto-Reporting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Report</p>
                <Select
                  onValueChange={(val) =>
                    setNewSchedule((prev) => ({ ...prev, reportKey: val }))
                  }
                  value={newSchedule.reportKey}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select report" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportOptions.map((opt) => (
                      <SelectItem key={opt.key} value={opt.key}>
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Frequency</p>
                <Select
                  onValueChange={(val) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      frequency: val as any,
                    }))
                  }
                  value={newSchedule.frequency}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Daily / Weekly / Monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Time (24h)</p>
                <Input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Recipients</p>
                <Input
                  placeholder="comma separated emails"
                  value={newSchedule.recipients}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      recipients: e.target.value,
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={newSchedule.enabled}
                  onCheckedChange={(v) =>
                    setNewSchedule((prev) => ({ ...prev, enabled: v }))
                  }
                />
                <span className="text-sm">Enabled</span>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Next Run</p>
                <div className="text-sm">
                  {newSchedule.reportKey
                    ? computeNextRun(
                        newSchedule.frequency || "Daily",
                        newSchedule.time || "07:00"
                      )
                    : "Select report & schedule"}
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleCreateSchedule}
                disabled={
                  !newSchedule.reportKey ||
                  !newSchedule.time ||
                  !newSchedule.recipients
                }
              >
                Schedule Report
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setNewSchedule({
                    reportKey: "",
                    frequency: "Daily",
                    time: "07:00",
                    recipients: "",
                    enabled: true,
                  });
                }}
              >
                Reset
              </Button>
            </div>

            {/* Existing Scheduled Reports */}
            <div className="space-y-3">
              {schedules.map((sch) => {
                const reportMeta = reportOptions.find(
                  (r) => r.key === sch.reportKey
                );
                return (
                  <Card key={sch.id} className="border">
                    <CardHeader className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm">
                          {reportMeta?.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {sch.frequency} at {sch.time} to {sch.recipients}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Next: {sch.nextRun}</span>
                        </div>
                        <div className="flex gap-2">
                          <Switch
                            checked={sch.enabled}
                            onCheckedChange={() => toggleSchedule(sch.id)}
                          />
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

/**
 * Rudimentary next run computation (mocked)
 */
function computeNextRun(frequency: string, time: string) {
  const now = new Date();
  let next = new Date(now);

  const [hour, minute] = time.split(":").map(Number);
  next.setHours(hour, minute, 0, 0);

  if (frequency === "Daily") {
    if (next <= now) next.setDate(next.getDate() + 1);
  } else if (frequency === "Weekly") {
    // next week same day
    next.setDate(next.getDate() + 7);
  } else if (frequency === "Monthly") {
    next.setMonth(next.getMonth() + 1);
  }

  return format(next, "MMMM d, yyyy HH:mm");
}
