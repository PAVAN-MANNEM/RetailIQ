import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CommandPalette from "@/components/layout/CommandPalette";
export default function DashboardShell() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [role, setRole] = useState("executive");
    const [commandOpen, setCommandOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [timeRange, setTimeRange] = useState("last12");
    const [viewFilter, setViewFilter] = useState("all");
    const [lastUpdated, setLastUpdated] = useState(() => new Date());
    useEffect(() => {
        const interval = window.setInterval(() => {
            setLastUpdated(new Date());
        }, 5000);
        return () => window.clearInterval(interval);
    }, []);
    const controls = {
        searchQuery,
        setSearchQuery,
        timeRange,
        setTimeRange,
        viewFilter,
        setViewFilter,
        lastUpdated,
        refresh: () => setLastUpdated(new Date()),
    };
    return (_jsxs("div", { className: "min-h-screen overflow-hidden bg-[#08111f] text-white", children: [_jsx(CommandPalette, { open: commandOpen, onOpenChange: setCommandOpen }), _jsx(Sidebar, { open: sidebarOpen, onClose: () => setSidebarOpen(false), role: role, onRoleChange: setRole }), _jsx("div", { className: "min-h-screen xl:pl-[300px]", children: _jsxs("main", { className: "min-h-screen", children: [_jsx(Header, { role: role, onMenuClick: () => setSidebarOpen(true), controls: controls }), _jsx("div", { className: "px-4 pb-8 sm:px-6 lg:px-8", children: _jsx(Outlet, { context: { role, controls } }) })] }) })] }));
}
