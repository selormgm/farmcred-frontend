import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

const mockAdmins = [
  { id: 1, name: "Nana Kofi", email: "nana@farmcred.com", role: "Super Admin" },
  { id: 2, name: "Abena Mensah", email: "abena@farmcred.com", role: "Finance" },
  { id: 3, name: "Kojo Asante", email: "kojo@farmcred.com", role: "Support" },
];

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState(mockAdmins);

  const handleRemove = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Admin Users</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleRemove(admin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
