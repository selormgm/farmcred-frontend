"use client";
import { useFarmerOverview } from '@/hooks/useFarmerData';


export default function Dashboard () {
  const { data: overview, loading, error } = useFarmerOverview();
  if (error) {
    console.error("Failed to fetch overview data:", error);
  }
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (!overview) {
    return <div className="p-4">No overview data available.</div>;
  }

  
  return(
    <div className="flex flex-col h-screen">
      <header className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <p>Welcome to the dashboard!</p>
      </main>
    </div>
  )
}