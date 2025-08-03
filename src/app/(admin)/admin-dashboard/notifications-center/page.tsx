"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send } from "lucide-react";

const mockAnnouncements = [
  {
    id: 1,
    title: "Platform Maintenance Notice",
    message: "We will undergo maintenance on Aug 10 at 11:00 PM.",
    audience: "All Users",
    status: "Delivered",
    date: "2024-08-01",
  },
  {
    id: 2,
    title: "Loan Interest Update",
    message: "New interest rates take effect Aug 15.",
    audience: "Farmers",
    status: "Pending",
    date: "2024-08-03",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NotificationCenter() {
  const [audience, setAudience] = useState("All");

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" />
          <Textarea placeholder="Your message..." rows={4} />
          <Tabs defaultValue="All" className="w-full">
            <TabsList>
              <TabsTrigger value="All" onClick={() => setAudience("All")}>
                All Users
              </TabsTrigger>
              <TabsTrigger
                value="Farmers"
                onClick={() => setAudience("Farmers")}
              >
                Farmers
              </TabsTrigger>
              <TabsTrigger
                value="Investors"
                onClick={() => setAudience("Investors")}
              >
                Investors
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="flex gap-2">
            <Send className="w-4 h-4" /> Send Notification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockAnnouncements.map((note) => (
              <div
                key={note.id}
                className="border rounded-md p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <p className="text-sm text-gray-600">{note.message}</p>
                  <p className="text-xs mt-1">Audience: {note.audience}</p>
                  <p className="text-xs">Date: {formatDate(note.date)}</p>
                </div>
                <Badge
                  variant={
                    note.status === "Delivered" ? "default" : "secondary"
                  }
                >
                  {note.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
