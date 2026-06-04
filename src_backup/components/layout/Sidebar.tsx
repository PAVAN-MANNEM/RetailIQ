import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  Home,
  LayoutDashboard,
  MapPinned,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import type { DashboardRole } from "@/layout/DashboardShell";

type Props = {
  open: boolean;
  onClose: () => void;
  role: DashboardRole;
  onRoleChange: (role: DashboardRole) => void;
};

const navItems = [
  { label: "Overview", icon: Home, to: "/" },
  { label: "Sales Performance", icon: TrendingUp, to: "/sales" },
  { label: "Profitability", icon: BarChart3, to: "/profitability" },
  { label: "Customers", icon: Users, to: "/customers" },
  { label: "Products", icon: BriefcaseBusiness, to: "/products" },
  { label: "Geography", icon: MapPinned, to: "/geography" },
  { label: "Reports", icon: LayoutDashboard, to: "/reports" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar({ open, onClose }: Props) {
  const content = (
    <div className="flex h-full flex-col border-r border-slate-800 bg-slate-950/95 px-5 py-6">
      
      {/* Grounded, realistic internal tool branding */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-700">
            <BarChart2 className="h-5 w-5 text-slate-300" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-200">Superstore</p>
            <p className="text-xs text-slate-500 mt-0.5">Data & Analytics</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-2xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white xl:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-slate-800/80 text-white font-medium"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-colors ${isActive ? "text-slate-400" : "text-slate-600"}`} />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[300px] overflow-y-auto xl:block">
        {content}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 xl:hidden"
            onClick={onClose}
          >
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="h-full w-[300px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}