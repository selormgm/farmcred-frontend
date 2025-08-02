"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { logout } from "@/lib/services/authService";
import { LogOut } from "lucide-react";

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

export default function AdminPreferencesPage() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  function handleLanguageChange(value: "en" | "fr" | "twi") {
    setLanguage(value);
  }

  const handleLogout = () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <main className="space-y-6 px-6 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold">{t("admin_preferences")}</h1>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>{t("appearance")}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="theme-toggle">{t("dark_mode")}</Label>
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
          <CardTitle>{t("language")}</CardTitle>
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

      {/* Logout */}
      <Card>
        <CardContent>
          <Button
            variant="ghost"
            className="text-destructive flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {t("logout")}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
