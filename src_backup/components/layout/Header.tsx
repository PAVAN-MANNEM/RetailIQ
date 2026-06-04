import React, { useRef, useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { DashboardControls, DashboardRole } from "@/layout/DashboardShell";

type Props = {
  role: DashboardRole;
  onMenuClick: () => void;
  controls: DashboardControls;
};

// RetailIQ Platform specific titles
const roleMeta: Record<DashboardRole, { title: string; subtitle: string }> = {
  executive: { title: "RetailIQ Analytics", subtitle: "Strategic Business Intelligence & Performance Overview" },
  manager: { title: "RetailIQ Operations", subtitle: "Category performance & operational insights" },
  rep: { title: "RetailIQ Sales View", subtitle: "Pipeline activity & account tracking" },
};

type Suggestion = { label: string; sublabel: string; path: string };

const allSuggestions: Suggestion[] = [
  { label: "Overview", sublabel: "Platform performance summary", path: "/" },
  { label: "Sales Performance", sublabel: "Trends and volume analytics", path: "/sales" },
  { label: "Profitability", sublabel: "Margin and cost driver analysis", path: "/profitability" },
  { label: "Customers", sublabel: "RFM segmentation and value tracking", path: "/customers" },
  { label: "Products", sublabel: "Category and catalog efficiency", path: "/products" },
  { label: "Geography", sublabel: "Spatial performance distribution", path: "/geography" },
  { label: "Reports", sublabel: "Advanced diagnostics and exports", path: "/reports" },
  { label: "Settings", sublabel: "System and pipeline configurations", path: "/settings" },
];

export default function Header({ role, onMenuClick, controls }: Props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(controls.searchQuery);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(controls.searchQuery);
  }, [controls.searchQuery]);

  const trimmed = inputValue.trim().toLowerCase();
  const suggestions: Suggestion[] = trimmed.length === 0
    ? allSuggestions
    : allSuggestions.filter(s => s.label.toLowerCase().includes(trimmed) || s.sublabel.toLowerCase().includes(trimmed));

  const showDropdown = focused && suggestions.length > 0;

  function commitSuggestion(s: Suggestion) {
    setInputValue(s.label);
    controls.setSearchQuery("");
    setFocused(false);
    setActiveIndex(-1);
    navigate(s.path);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showDropdown) setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showDropdown) setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        commitSuggestion(suggestions[activeIndex]);
      } else if (suggestions.length === 1 && trimmed.length > 0) {
        commitSuggestion(suggestions[0]);
      } else {
        setFocused(false);
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    controls.setSearchQuery(val);
    setActiveIndex(-1);
    setFocused(true);
  }

  function clearSearch() {
    setInputValue("");
    controls.setSearchQuery("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-slate-800 bg-[#08111f]/95 backdrop-blur">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Heading area - no buttons here */}
          <div className="flex items-start gap-3">
            <button onClick={onMenuClick} className="mt-1 rounded-2xl p-2 text-slate-300 hover:bg-slate-900 hover:text-white xl:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{roleMeta[role].title}</h1>
              <p className="mt-1 text-sm text-slate-400">{roleMeta[role].subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search area */}
            <div ref={containerRef} className="relative w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search models, metrics, dashboards…"
                className="h-11 w-full rounded-2xl border border-slate-800 bg-slate-950 pl-10 pr-9 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition hover:bg-slate-900 focus:border-slate-600"
              />
              {inputValue && (
                <button onMouseDown={(e) => { e.preventDefault(); clearSearch(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  <X className="h-4 w-4" />
                </button>
              )}
              {showDropdown && (
                <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                  {suggestions.map((s, i) => (
                    <button
                      key={s.path}
                      onMouseDown={(e) => { e.preventDefault(); commitSuggestion(s); }}
                      className={`flex w-full flex-col items-start px-4 py-3 text-left text-sm transition ${i === activeIndex ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="text-xs text-slate-500">{s.sublabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}