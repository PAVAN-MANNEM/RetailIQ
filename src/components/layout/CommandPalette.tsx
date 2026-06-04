import React, { useEffect, useMemo, useState } from "react";
import { Search, X, Sparkles, BarChart3, Users, Package, TrendingUp } from "lucide-react";

type CommandItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const commands: CommandItem[] = [
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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CommandPalette({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
      }

      if (!open) return;

      if (e.key === "Escape") onOpenChange(false);

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
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-4">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dashboard actions..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-2xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-400">
              No results found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const active = index === activeIndex;

              return (
                <button
                  key={item.title}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => onOpenChange(false)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition ${
                    active ? "bg-slate-900" : "hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-slate-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
          <span>Press Enter to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}