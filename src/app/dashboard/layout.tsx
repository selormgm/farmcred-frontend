import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="  p-4">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}