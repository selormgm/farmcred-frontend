import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const mockRoles = [
  {
    name: "Super Admin",
    permissions: ["All Access"],
    active: true,
  },
  {
    name: "Finance",
    permissions: ["View Transactions", "Adjust Transactions"],
    active: true,
  },
  {
    name: "Support",
    permissions: ["Send Notifications", "View Users"],
    active: false,
  },
];

export default function RoleSettingsPage() {
  const [roles, setRoles] = useState(mockRoles);

  const toggleRole = (index: number) => {
    const updated = [...roles];
    updated[index].active = !updated[index].active;
    setRoles(updated);
  };

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role-Based Permissions</h1>
        <Button>Add New Role</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <Switch
                checked={role.active}
                onCheckedChange={() => toggleRole(idx)}
              />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((p, i) => (
                  <Badge key={i} variant="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
