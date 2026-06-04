import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CommandPalette from "@/components/layout/CommandPalette";

export type DashboardRole = "executive" | "manager" | "rep";
export type TimeRange = "last3" | "last6" | "last12" | "all";
export type ViewFilter = "all" | "growth" | "risk" | "customers";

export type DashboardControls = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  timeRange: TimeRange;
  setTimeRange: React.Dispatch<React.SetStateAction<TimeRange>>;
  viewFilter: ViewFilter;
  setViewFilter: React.Dispatch<React.SetStateAction<ViewFilter>>;
  lastUpdated: Date;
  refresh: () => void;
};

export default function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<DashboardRole>("executive");
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>("last12");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("all");
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const controls: DashboardControls = {
    searchQuery,
    setSearchQuery,
    timeRange,
    setTimeRange,
    viewFilter,
    setViewFilter,
    lastUpdated,
    refresh: () => setLastUpdated(new Date()),
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#08111f] text-white">
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
        onRoleChange={setRole}
      />

      <div className="min-h-screen xl:pl-[300px]">
        <main className="min-h-screen">
          <Header role={role} onMenuClick={() => setSidebarOpen(true)} controls={controls} />

          <div className="px-4 pb-8 sm:px-6 lg:px-8">
            <Outlet context={{ role, controls }} />
          </div>
        </main>
      </div>
    </div>
  );
}
