"use client";

import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <Dashboard />
    </main>
  );
}
