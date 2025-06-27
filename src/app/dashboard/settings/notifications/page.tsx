"use client";

import Link from "next/link";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function NotificationSettings() {
  const [trustLevelNotify, setTrustLevelNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);

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
          onCheckedChange={(checked) => setTrustLevelNotify(checked === true)}
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
          <span className="text-sm text-[#72BF01]">Receive sms notifications whenever trust level increases </span>
        </div>
        <Switch
          checked={smsNotify}
          onCheckedChange={setSmsNotify}
          className="data-[state=checked]:bg-[#158f20]"
        />
      </div>
      <div className="flex items-center justify-between mb-4 text-[#158f20]">
        <div className="flex flex-col">
          <span className="font-semibold">Email Notification</span>
          <span className="text-sm text-[#72BF01]">Receive email notifications whenever trust level increases </span>
        </div>
        <Switch
          checked={emailNotify}
          onCheckedChange={setEmailNotify}
          className="data-[state=checked]:bg-[#158f20]"
        />
      </div>
    </div>
  );
}
