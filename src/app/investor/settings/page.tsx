"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { logout } from "@/lib/services/authService";
import { exportToCSV } from "@/lib/print-function";
// import { useInvestorInvestments } from "@/hooks/useInvestorData";

export default function SettingsPage() {
  // const { data: investments } = useInvestorInvestments();

  // function handleExport() {
  //   if (!investments || investments.length === 0) {
  //     console.warn("No investment data to export.");
  //     return;
  //   }

  //   const simplified = investments.map((inv) => ({
  //     ID: inv.id,
  //     Farmer: inv.farmer_name,
  //     Amount: inv.amount_funded,
  //     "Expected Return": inv.expected_return,
  //     Status: inv.status,
  //     "Funded On": inv.funded_date,
  //   }));

  //   exportToCSV(simplified, "my_investments.csv");
  // }

  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    // Sync theme with switch state
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  function handleLanguageChange(value: "en" | "twi" | "fr") {
    setLanguage(value);
  }

  function handleLogout() {
    logout();
  }

  return (
    <div className="space-y-6 px-6 py-8">
      <h1 className="text-2xl font-bold text-[#158f20]">{t("General Settings")}</h1>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Appearance")}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="theme-toggle">{t("Dark Mode")}</Label>
          <Switch
            id="theme-toggle"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Language")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[200px] capitalize">
              <SelectValue placeholder={t("language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("english")}</SelectItem>
              <SelectItem value="fr">{t("french")}</SelectItem>
              <SelectItem value="twi">{t("twi")}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Export */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Export Data")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">{t("Export Investment Data (CSV)")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
