import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Search, X, Sparkles, BarChart3, Users, Package, TrendingUp } from "lucide-react";
const commands = [
    {
        title: "Overview",
        description: "Jump to the executive summary section",
        icon: Sparkles,
    },
    {
        title: "Sales Performance",
        description: "Open revenue and trend charts",
        icon: TrendingUp,
    },
    {
        title: "Customers",
        description: "View customer insights",
        icon: Users,
    },
    {
        title: "Products",
        description: "Open product rankings",
        icon: Package,
    },
    {
        title: "Profitability",
        description: "Inspect margin and profit drivers",
        icon: BarChart3,
    },
];
export default function CommandPalette({ open, onOpenChange }) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return commands;
        return commands.filter((item) => item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q));
    }, [query]);
    useEffect(() => {
        function onKeyDown(e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                onOpenChange(true);
            }
            if (!open)
                return;
            if (e.key === "Escape")
                onOpenChange(false);
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => (prev - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
            }
            if (e.key === "Enter" && filtered[activeIndex]) {
                onOpenChange(false);
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeIndex, filtered, open, onOpenChange]);
    useEffect(() => {
        setActiveIndex(0);
    }, [query, open]);
    useEffect(() => {
        if (!open)
            setQuery("");
    }, [open]);
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/60", children: [_jsxs("div", { className: "flex items-center gap-3 border-b border-slate-800 px-4 py-4", children: [_jsx(Search, { className: "h-5 w-5 text-slate-400" }), _jsx("input", { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search dashboard actions...", className: "w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" }), _jsx("button", { onClick: () => onOpenChange(false), className: "rounded-2xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "max-h-[420px] overflow-y-auto p-2", children: filtered.length === 0 ? (_jsx("div", { className: "px-4 py-8 text-center text-sm text-slate-400", children: "No results found." })) : (filtered.map((item, index) => {
                        const Icon = item.icon;
                        const active = index === activeIndex;
                        return (_jsxs("button", { onMouseEnter: () => setActiveIndex(index), onClick: () => onOpenChange(false), className: `flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition ${active ? "bg-slate-900" : "hover:bg-slate-900/60"}`, children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-slate-300", children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: item.title }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: item.description })] })] }, item.title));
                    })) }), _jsxs("div", { className: "flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-500", children: [_jsx("span", { children: "Press Enter to select" }), _jsx("span", { children: "Esc to close" })] })] }) }));
}
