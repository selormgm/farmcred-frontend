"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newPermissions, setNewPermissions] = useState("");

  const toggleRole = (index: number) => {
    const updated = [...roles];
    updated[index].active = !updated[index].active;
    setRoles(updated);
  };

  const handleAddRole = () => {
    if (!newRole.trim()) return;
    const permissions = newPermissions
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    setRoles([
      ...roles,
      { name: newRole, permissions, active: true },
    ]);
    setNewRole("");
    setNewPermissions("");
    setOpen(false);
  };

  const handleDeleteRole = (index: number) => {
    const updated = roles.filter((_, i) => i !== index);
    setRoles(updated);
  };

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Role-Based Permissions</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Analytics Viewer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Input
                  id="permissions"
                  value={newPermissions}
                  onChange={(e) => setNewPermissions(e.target.value)}
                  placeholder="e.g. View Reports, Export Data"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRole}>Add Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                {role.name !== "Super Admin" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRole(idx)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
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
