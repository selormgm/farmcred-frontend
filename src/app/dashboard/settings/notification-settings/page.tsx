"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFarmerProfile, useUpdateProfile } from "@/hooks/useFarmerData";
import { toast } from "sonner";

export default function NotificationSettings() {
  const { data: profile, loading } = useFarmerProfile();
  const { updateProfile, loading: saving } = useUpdateProfile();

  const [trustLevelNotify, setTrustLevelNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);

  // Load current preferences
  useEffect(() => {
    if (profile) {
      setTrustLevelNotify(profile.receive_level_notifications);
      setSmsNotify(profile.receive_sms_notifications);
      setEmailNotify(profile.receive_email_notifications);
    }
  }, [profile]);

  // Unified handler
  const handleUpdate = async (field: string, value: boolean) => {
    try {
      const updateData = { [field]: value };
      
      await updateProfile(updateData);
      toast.success("Preferences updated");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update preferences");
    }
  };

  if (loading) return <p className="text-muted">Loading settings...</p>;

  return (
    <div className="bg-white dark:bg-background max-w-3xl">
      <div className="mb-4 flex items-center justify-between ">
        <span className="font-medium text-[#157148] ">Notify me when... </span>
        <Link
          href="/dashboard/settings/notifications/about"
          className="text-[#157148] underline text-sm ml-2"
        >
          About notifications
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <Checkbox
          id="trust-level"
          checked={trustLevelNotify}
          onCheckedChange={(checked) => {
            const newValue = checked === true;
            setTrustLevelNotify(newValue);
          handleUpdate("receive_level_notifications", newValue);}}
          className={`border-[#157148] data-[state=checked]:bg-[#158f20] data-[state=checked]:border-[#158f20]`}
        />
        <label htmlFor="trust-level" className="text-base text-[#158f20]">
          Advanced to new trust level
        </label>
      </div>

      <div className="mb-4 font-medium text-[#157148]">
        Receive notifications via:
      </div>
      <div className="flex items-center justify-between mb-4 text-[#158f20]">
        <div className="flex flex-col">
          <span className="font-semibold">Mobile SMS Notification</span>
          <span className="text-sm text-[#72BF01]">
            Receive sms notifications whenever trust level increases{" "}
          </span>
        </div>
        <Switch
          checked={smsNotify}
          onCheckedChange={(checked) => {
            setSmsNotify(checked);
            handleUpdate("receive_sms_notifications", checked);
          }}
          disabled={saving}
          className="data-[state=checked]:bg-[#158f20]"
        />
      </div>
      <div className="flex items-center justify-between mb-4 text-[#158f20]">
        <div className="flex flex-col">
          <span className="font-semibold">Email Notification</span>
          <span className="text-sm text-[#72BF01]">
            Receive email notifications whenever trust level increases{" "}
          </span>
        </div>
        <Switch
          checked={emailNotify}
          onCheckedChange={(checked) => {
            setEmailNotify(checked);
            handleUpdate("receive_email_notifications", checked);
          }}
          disabled={saving}
          className="data-[state=checked]:bg-[#158f20]"
        />
      </div>
    </div>
  );
}
