"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useFarmerProfile } from "@/hooks/useFarmerData";

export default function MyAccount() {
  const { t } = useLanguage();
  const { data: profile, loading } = useFarmerProfile();

  const [phone, setPhone] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Set phone when profile loads
  React.useEffect(() => {
    if (profile?.phone_number) setPhone(profile.phone_number);
  }, [profile]);

  function handlePhoneSave() {
    setEditingPhone(false);
    // TODO: Add API call to update phone number
  }

  function handleChangePassword() {
    // TODO: Add change password logic (e.g., open a modal)
    alert("Change password functionality goes here.");
  }

  function handleDeleteAccount() {
    // TODO: Add delete account logic
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Delete logic
    }
  }

  if (loading) {
    return <div className="p-4">{t("loading") || "Loading..."}</div>;
  }

  if (!profile) {
    return <div className="p-4 text-red-600">{t("No Profile") || "No profile data available."}</div>;
  }

  return (
    <div className="bg-white dark:bg-background">
      <h2 className="text-2xl border-b pb-2 font-bold mb-6 text-[#158f20]">{t("Account Security") || "My Account"}</h2>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-[#158f20]">Email</label>
        <Input value={profile.full_name} disabled className="bg-gray-100 dark:bg-background max-w-sm" />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-[#158f20]">User ID</label>
        <Input value={profile.id || profile.id} disabled className="bg-gray-100 dark:bg-background max-w-sm" />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-[#158f20]">Phone Number</label>
        <div className="flex gap-2 max-w-sm">
          <Input
            value={phone}
            disabled={!editingPhone}
            onChange={e => setPhone(e.target.value)}
            className="bg-gray-100 dark:bg-background"
          />
          {editingPhone ? (
            <Button className="bg-[#158f20]" size="sm" onClick={handlePhoneSave}>
              Save
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="text-[#158f20]" onClick={() => setEditingPhone(true)}>
              <Pencil className="w-4 h-4 mr-1" /> Change
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-[#158f20]">Password</label>
        <div className="flex gap-2 max-w-sm">
          <Input
            type={showPassword ? "text" : "password"}
            value="********"
            disabled
            className="bg-gray-100 dark:bg-background"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPassword((v) => !v)}
            type="button"
            className="text-[#158f20]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button className="bg-[#158f20]" size="sm" onClick={handleChangePassword}>
            <Pencil className="w-4 h-4 mr-1" /> Change
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          className="text-destructive flex items-center gap-2"
          onClick={handleDeleteAccount}
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </Button>
      </div>
    </div>
  );}