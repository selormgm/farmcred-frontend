"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockLogs = [
  {
    admin: "Kwame Admin",
    action: "Approved loan for Yaw Boateng",
    timestamp: "2025-08-01 14:32",
  },
  {
    admin: "Ama Support",
    action: "Reset password for Ama Mensah",
    timestamp: "2025-08-01 13:45",
  },
  {
    admin: "Kojo Super",
    action: "Flagged suspicious transaction #TXN1236",
    timestamp: "2025-07-31 17:20",
  },
];

export default function AdminActivityPage() {
  const [search, setSearch] = useState("");

  const filtered = mockLogs.filter(
    (log) =>
      log.admin.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <Input
        placeholder="Search by admin or action..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Actions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log, i) => (
                <TableRow key={i}>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
