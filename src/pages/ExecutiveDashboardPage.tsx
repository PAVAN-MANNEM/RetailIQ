import { useOutletContext } from "react-router-dom";
import ExecutiveDashboard from "./ExecutiveDashboard";
import type { DashboardControls, DashboardRole } from "@/layout/DashboardShell";

export default function ExecutiveDashboardPage() {
  const { role, controls } = useOutletContext<{ role: DashboardRole; controls: DashboardControls }>();
  return <ExecutiveDashboard />;
}
