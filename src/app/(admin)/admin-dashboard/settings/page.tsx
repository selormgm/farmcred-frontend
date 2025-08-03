import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Settings, Users, ShieldCheck, Activity, Palette } from "lucide-react";

const settings = [
  {
    icon: <Users className="h-5 w-5 text-green-700" />,
    title: "Manage Admin Users",
    description: "Add, edit, or remove admin accounts.",
    href: "/admin-dashboard/settings/users",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-green-700" />,
    title: "Role & Permissions",
    description: "Define and assign roles with specific privileges.",
    href: "/admin-dashboard/settings/roles",
  },
  {
    icon: <Activity className="h-5 w-5 text-green-700" />,
    title: "Activity Logs",
    description: "Track all admin actions across the platform.",
    href: "/admin-dashborad/settings/activity-logs",
  },
  {
    icon: <Palette className="h-5 w-5 text-green-700" />,
    title: "Platform Preferences",
    description: "Adjust themes, language, and display settings.",
    href: "/admin-dashboard/settings/preferences",
  },
];

export default function AdminSettingsPage() {
  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold">Admin Settings & Roles</h1>
      <div className="grid gap-6">
        {settings.map((setting) => (
          <Link key={setting.href} href={setting.href}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                {setting.icon}
                <CardTitle className="text-base font-medium">
                  {setting.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {setting.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
