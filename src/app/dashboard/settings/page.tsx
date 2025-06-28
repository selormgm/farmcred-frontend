"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { logout } from "@/lib/services/authService";
import { useTheme } from "next-themes";

export default function Settings() {
  const { setTheme } = useTheme();

  const { language, setLanguage, t } = useLanguage();

  function handleLanguageChange(value: "en" | "twi" | "fr") {
    setLanguage(value);
  }

  function handleLogout() {
    logout();
  }

  return (
    <div className="bg-white dark:bg-background">
      <div className="mb-6 flex items-center justify-between max-w-3xl border-b pb-2">
        <label className="text-[#158F20] block mb-2 font-medium">
          {t("Theme")}
        </label>
        <Select>
          <SelectTrigger className="border-none shadow-none text-[#158F20]">
            <SelectValue placeholder={t("theme")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem onClick={() => setTheme("light")} value="light">
              {t("light")}
            </SelectItem>
            <SelectItem onClick={() => setTheme("dark")} value="dark">
              {t("dark")}
            </SelectItem>
            <SelectItem onClick={() => setTheme("system")} value="system">
              {t("System")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 flex items-center justify-between max-w-3xl border-b pb-2">
        <label className="block mb-2 font-medium text-[#158F20]">
          {t("language")}
        </label>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="border-none shadow-none text-[#158F20]">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t("english")}</SelectItem>
            <SelectItem value="twi">{t("twi")}</SelectItem>
            <SelectItem value="fr">{t("french")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 flex items-center justify-between max-w-3xl border-b pb-2">
        <label className="block mb-2 font-medium text-[#158F20]">
          {t("logoutDevice")}
        </label>
        <Button
          variant="ghost"
          className="text-destructive flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}
