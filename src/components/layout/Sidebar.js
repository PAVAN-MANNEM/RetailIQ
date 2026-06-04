import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, BarChart3, BriefcaseBusiness, ChevronRight, Home, LayoutDashboard, MapPinned, Settings, TrendingUp, Users, X, } from "lucide-react";
import { NavLink } from "react-router-dom";
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
export default function Sidebar({ open, onClose }) {
    const content = (_jsxs("div", { className: "flex h-full flex-col border-r border-slate-800 bg-slate-950/95 px-5 py-6", children: [_jsxs("div", { className: "flex items-center justify-between gap-3 mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-700", children: _jsx(BarChart2, { className: "h-5 w-5 text-slate-300" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-base font-semibold tracking-tight text-slate-200", children: "Superstore" }), _jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "Data & Analytics" })] })] }), _jsx("button", { onClick: onClose, className: "rounded-2xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white xl:hidden", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("nav", { className: "mt-8 space-y-2", children: navItems.map((item) => {
                    const Icon = item.icon;
                    return (_jsx(NavLink, { to: item.to, onClick: onClose, className: ({ isActive }) => `flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${isActive
                            ? "bg-slate-800/80 text-white font-medium"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"}`, children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsxs("span", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: "h-4 w-4" }), item.label] }), _jsx(ChevronRight, { className: `h-4 w-4 transition-colors ${isActive ? "text-slate-400" : "text-slate-600"}` })] })) }, item.label));
                }) })] }));
    return (_jsxs(_Fragment, { children: [_jsx("aside", { className: "fixed inset-y-0 left-0 z-40 hidden w-[300px] overflow-y-auto xl:block", children: content }), _jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 bg-black/60 xl:hidden", onClick: onClose, children: _jsx(motion.aside, { initial: { x: -320 }, animate: { x: 0 }, exit: { x: -320 }, transition: { type: "spring", damping: 26, stiffness: 220 }, className: "h-full w-[300px] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: content }) })) })] }));
}
