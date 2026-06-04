import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  MapPinned,
  Building2,
  Percent,
  Wallet,
  LandPlot,
  Lightbulb,
  Search,
  Map,
  Activity,
  DollarSign,
  Package,
  User
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine
} from "recharts";
import { ComposableMap, Geographies, Geography as GeoPath, ZoomableGroup } from "react-simple-maps";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { DashboardControls } from "@/layout/DashboardShell";

// =========================================================================================
// ⚠️ SAFELY IMPORTED JSON: Ensure geo_search_database.json is in THIS SAME FOLDER
// =========================================================================================
import rawGeoSearchData from "../../data/geo_search_database.json";
const geoSearchDatabase = Array.isArray(rawGeoSearchData) ? rawGeoSearchData : [];

// ============================================================================
// DATA SOURCES
// ============================================================================

const globalData = [{"Country": "Afghanistan", "Sales": 21673.32, "Profit": 5460.3}, {"Country": "Albania", "Sales": 3888.12, "Profit": 709.32}, {"Country": "Algeria", "Sales": 36091.59, "Profit": 9106.5}, {"Country": "Angola", "Sales": 25554.0, "Profit": 6494.97}, {"Country": "Argentina", "Sales": 57511.78, "Profit": -18693.80}, {"Country": "Australia", "Sales": 925235.85, "Profit": 103907.43}, {"Country": "Austria", "Sales": 92539.05, "Profit": 24341.7}, {"Country": "Bangladesh", "Sales": 78256.47, "Profit": 19430.89}, {"Country": "Belgium", "Sales": 49226.7, "Profit": 11572.59}, {"Country": "Brazil", "Sales": 361106.42, "Profit": 30090.50}, {"Country": "Canada", "Sales": 66928.17, "Profit": 17817.39}, {"Country": "China", "Sales": 700562.03, "Profit": 150683.09}, {"Country": "Colombia", "Sales": 81502.53, "Profit": 18798.05}, {"Country": "Cuba", "Sales": 158854.94, "Profit": 38889.22}, {"Country": "Dominican Republic", "Sales": 126140.58, "Profit": -7613.50}, {"Country": "Egypt", "Sales": 84139.32, "Profit": 19702.23}, {"Country": "El Salvador", "Sales": 177554.90, "Profit": 42023.24}, {"Country": "France", "Sales": 858931.08, "Profit": 109029.00}, {"Country": "Germany", "Sales": 628840.03, "Profit": 107322.82}, {"Country": "Guatemala", "Sales": 131602.47, "Profit": 27944.69}, {"Country": "Honduras", "Sales": 90125.65, "Profit": -29482.37}, {"Country": "India", "Sales": 589650.11, "Profit": 129071.84}, {"Country": "Indonesia", "Sales": 404887.50, "Profit": 15608.68}, {"Country": "Iran", "Sales": 113746.11, "Profit": 26856.24}, {"Country": "Iraq", "Sales": 70714.8, "Profit": 18243.21}, {"Country": "Italy", "Sales": 289709.66, "Profit": 19828.76}, {"Country": "Japan", "Sales": 100787.52, "Profit": 24328.47}, {"Country": "Mexico", "Sales": 622590.62, "Profit": 102818.10}, {"Country": "Morocco", "Sales": 87077.94, "Profit": 22761.42}, {"Country": "Netherlands", "Sales": 77514.95, "Profit": -41070.08}, {"Country": "New Zealand", "Sales": 172020.62, "Profit": 16600.28}, {"Country": "Nicaragua", "Sales": 149687.06, "Profit": 33401.44}, {"Country": "Nigeria", "Sales": 54350.35, "Profit": -80750.72}, {"Country": "Pakistan", "Sales": 58872.61, "Profit": -22446.65}, {"Country": "Panama", "Sales": 51539.93, "Profit": -17723.45}, {"Country": "Philippines", "Sales": 183420.17, "Profit": -16128.23}, {"Country": "Poland", "Sales": 44228.85, "Profit": 10983.12}, {"Country": "Russia", "Sales": 82913.88, "Profit": 22536.45}, {"Country": "Saudi Arabia", "Sales": 82012.2, "Profit": 19339.59}, {"Country": "South Africa", "Sales": 95292.27, "Profit": 21936.63}, {"Country": "Spain", "Sales": 287146.68, "Profit": 54390.12}, {"Country": "Sweden", "Sales": 30491.40, "Profit": -17519.37}, {"Country": "Thailand", "Sales": 77051.96, "Profit": -7308.20}, {"Country": "Turkey", "Sales": 108507.95, "Profit": -98447.23}, {"Country": "Ukraine", "Sales": 86857.17, "Profit": 20944.23}, {"Country": "United Kingdom", "Sales": 528576.3, "Profit": 111900.15}, {"Country": "United States", "Sales": 2297200.86, "Profit": 286397.02}, {"Country": "Vietnam", "Sales": 65800.20, "Profit": -1870.23}];

const regionalData = [{"Region": "Africa", "Sales": 783773.21, "Profit": 88871.63}, {"Region": "Canada", "Sales": 66928.17, "Profit": 17817.39}, {"Region": "Caribbean", "Sales": 324280.86, "Profit": 34571.32}, {"Region": "Central", "Sales": 2822302.52, "Profit": 311403.98}, {"Region": "Central Asia", "Sales": 752826.57, "Profit": 132480.19}, {"Region": "EMEA", "Sales": 806161.31, "Profit": 43897.97}, {"Region": "East", "Sales": 678781.24, "Profit": 91522.78}, {"Region": "North", "Sales": 1248165.60, "Profit": 194597.95}, {"Region": "North Asia", "Sales": 848309.78, "Profit": 165578.42}, {"Region": "Oceania", "Sales": 1100184.61, "Profit": 120089.11}, {"Region": "South", "Sales": 1600907.04, "Profit": 140355.77}, {"Region": "Southeast Asia", "Sales": 884423.17, "Profit": 17852.33}, {"Region": "West", "Sales": 725457.82, "Profit": 108418.45}];

const topStatesSales = [{"State": "England", "Sales": 485170.97}, {"State": "California", "Sales": 457687.63}, {"State": "Ile-de-France", "Sales": 317822.54}, {"State": "New York", "Sales": 310876.27}, {"State": "New South Wales", "Sales": 270487.10}, {"State": "Queensland", "Sales": 238312.73}, {"State": "North Rhine-Westphalia", "Sales": 216451.85}, {"State": "Texas", "Sales": 170188.05}, {"State": "San Salvador", "Sales": 153639.40}, {"State": "National Capital", "Sales": 152175.36}];
const topStatesProfit = [{"State": "England", "Profit": 99907.73}, {"State": "California", "Profit": 76381.39}, {"State": "New York", "Profit": 74038.55}, {"State": "Ile-de-France", "Profit": 44055.92}, {"State": "New South Wales", "Profit": 43695.98}, {"State": "North Rhine-Westphalia", "Profit": 42347.87}, {"State": "San Salvador", "Profit": 35883.38}, {"State": "Washington", "Profit": 33402.65}, {"State": "Michigan", "Profit": 24463.19}, {"State": "São Paulo", "Profit": 21878.02}];
const topCitiesSales = [{"City": "New York City", "Sales": 256368.16}, {"City": "Los Angeles", "Sales": 175851.34}, {"City": "Manila", "Sales": 120886.95}, {"City": "Seattle", "Sales": 119540.74}, {"City": "San Francisco", "Sales": 112669.09}, {"City": "Philadelphia", "Sales": 109077.01}, {"City": "Sydney", "Sales": 101945.52}, {"City": "Jakarta", "Sales": 94321.32}, {"City": "London", "Sales": 86945.81}, {"City": "Mexico City", "Sales": 85728.55}];
const topCitiesProfit = [{"City": "New York City", "Profit": 62036.98}, {"City": "Los Angeles", "Profit": 30440.76}, {"City": "Seattle", "Profit": 29156.10}, {"City": "Managua", "Profit": 17853.72}, {"City": "San Francisco", "Profit": 17507.39}, {"City": "London", "Profit": 17378.72}, {"City": "Sydney", "Profit": 16002.81}, {"City": "Vienna", "Profit": 15660.84}, {"City": "San Salvador", "Profit": 15036.51}, {"City": "Mexico City", "Profit": 13342.29}];
const bottomStatesSales = [{"State": "Matabeleland North", "Sales": 3.47}, {"State": "Kabarole", "Sales": 3.57}, {"State": "Bitola", "Sales": 10.98}, {"State": "Manicaland", "Sales": 11.85}, {"State": "Pernik", "Sales": 14.82}, {"State": "Rize", "Sales": 18.53}, {"State": "Edirne", "Sales": 18.53}, {"State": "Zhambyl", "Sales": 22.05}, {"State": "Gangwon", "Sales": 22.41}, {"State": "Inhambane", "Sales": 23.25}];
const bottomStatesProfit = [{"State": "Istanbul", "Profit": -29033.70}, {"State": "Lagos", "Profit": -25922.51}, {"State": "Texas", "Profit": -25729.36}, {"State": "Ohio", "Profit": -16971.38}, {"State": "Izmir", "Profit": -15729.80}, {"State": "Pennsylvania", "Profit": -15559.96}, {"State": "Francisco Morazán", "Profit": -15007.42}, {"State": "Panama", "Profit": -14978.50}, {"State": "Punjab", "Profit": -14665.05}, {"State": "Stockholm", "Profit": -13806.44}];
const bottomCitiesSales = [{"City": "Abilene", "Sales": 1.39}, {"City": "Elyria", "Sales": 1.82}, {"City": "Jupiter", "Sales": 2.06}, {"City": "Pensacola", "Sales": 2.21}, {"City": "Ormond Beach", "Sales": 2.81}, {"City": "Felahiye", "Sales": 2.81}, {"City": "Victoria Falls", "Sales": 3.47}, {"City": "Fort Portal", "Sales": 3.57}, {"City": "San Luis Obispo", "Sales": 3.62}, {"City": "Springdale", "Sales": 4.30}];
const bottomCitiesProfit = [{"City": "Lagos", "Profit": -25922.51}, {"City": "Istanbul", "Profit": -19960.91}, {"City": "Tegucigalpa", "Profit": -15007.42}, {"City": "Philadelphia", "Profit": -13837.77}, {"City": "Lahore", "Profit": -13626.37}, {"City": "Stockholm", "Profit": -11632.89}, {"City": "Manila", "Profit": -11158.56}, {"City": "Kano", "Profit": -10916.21}, {"City": "Hanover", "Profit": -10440.16}, {"City": "Toulouse", "Profit": -10382.22}];

const geoInsights = [
  "California, England, and New York generate the vast majority of global profit. Ensure priority supply chain allocation and top-tier customer service for these states.",
  "Massive margin leakage detected in Lagos, Istanbul, and Texas. Immediately audit logistics costs and restrict deep promotional discounting in these toxic zones.",
  "Sales revenue is highly distributed across the globe, but profitability is dangerously concentrated strictly in North American and Western European hubs.",
  "Southeast Asia generates exceptional sales volume but microscopic profit contribution, indicating a critical need for price-floor intervention.",
  "City-level performance is highly polarized; your Top 5 cities generate far more net profit than the Bottom 20 cities combined. Refocus localized ad spend."
];

// --- Calculations & Variables ---
const totalRegionalSales = regionalData.reduce((acc, curr) => acc + curr.Sales, 0);
const avgSales = totalRegionalSales / regionalData.length;
const avgProfit = regionalData.reduce((acc, curr) => acc + curr.Profit, 0) / regionalData.length;

const regionalScatterData = regionalData.map(d => ({
  ...d,
  margin: (d.Profit / d.Sales) * 100
}));

// --- Theme Config ---
const COLORS = ["#60a5fa", "#34d399", "#a78bfa", "#f59e0b", "#f43f5e", "#2dd4bf", "#fbbf24", "#818cf8"];

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
function moneyExact(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value); }
function formatNumber(value: number) { return new Intl.NumberFormat("en-US").format(value); }
function pct(value: number) { return `${value.toFixed(1)}%`; }

const getMarginColor = (margin: number) => {
  if (margin < 0) return "#f43f5e"; // Rose 500 (Loss)
  if (margin < 10) return "#fbbf24"; // Amber 400 (Weak)
  return "#34d399"; // Emerald 400 (Strong)
};

// ============================================================================
// UI COMPONENTS
// ============================================================================

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function MetricCard({ title, value, detail, icon: Icon }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl h-full flex flex-col justify-between">
        <CardContent className="p-5 flex flex-col h-full justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
              <p className="mt-1 text-sm text-slate-400">{detail}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-200 shrink-0">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Full Width Leaderboard Bar Chart Component
function FullWidthRankChart({ title, subtitle, data, yAxisKey, metricKey, fill, isMoney = true, danger = false }: any) {
  return (
    <Card className={`w-full rounded-3xl border ${danger ? "border-rose-500/20 bg-rose-950/10" : "border-slate-800 bg-slate-950/80"} shadow-2xl`}>
      <CardHeader>
        <SectionTitle title={title} subtitle={subtitle} />
      </CardHeader>
      <CardContent className="h-[400px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 80, right: 30, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={danger ? "#881337" : "#1f2937"} horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" tickFormatter={isMoney ? money : undefined} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey={yAxisKey} stroke="#e2e8f0" tickLine={false} axisLine={false} width={150} />
            <Tooltip 
              cursor={{ fill: danger ? "#4c0519" : "#1e293b" }}
              contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }} 
              formatter={(value) => isMoney ? money(Number(value)) : Number(value) }
            />
            <Bar dataKey={metricKey} name={metricKey} fill={fill} radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Interactive Real World Heatmap Component
function GlobalMap({ type }: { type: "sales" | "profit" }) {
  const isSales = type === "sales";
  const [tooltip, setTooltip] = useState({ content: "", value: 0, visible: false, x: 0, y: 0 });

  const mapData = useMemo(() => {
    const maxVal = Math.max(...globalData.map((d) => (isSales ? d.Sales : d.Profit)));
    const minVal = isSales ? 0 : Math.min(...globalData.map((d) => d.Profit));
    return { maxVal, minVal };
  }, [isSales]);

  const getCountryData = (geoName: string) => {
    const nameMap: Record<string, string> = {
      "United States of America": "United States",
      "Russian Federation": "Russia",
      "Dem. Rep. Congo": "Democratic Republic of the Congo",
      "Côte d'Ivoire": "Cote d'Ivoire",
      "Dominican Rep.": "Dominican Republic",
      "Central African Rep.": "Central African Republic",
      "Eq. Guinea": "Equatorial Guinea",
      "Bosnia and Herz.": "Bosnia and Herzegovina",
      "S. Sudan": "South Sudan"
    };
    const searchName = nameMap[geoName] || geoName;
    return globalData.find((d) => d.Country === searchName);
  };

  const getColor = (geoName: string) => {
    const data = getCountryData(geoName);
    if (!data) return "#1e293b"; // Slate-800 for empty borders

    const val = isSales ? data.Sales : data.Profit;

    if (isSales) {
      const intensity = Math.max(0.15, val / mapData.maxVal);
      return `rgba(56, 189, 248, ${intensity})`; // Sky-400
    } else {
      if (val >= 0) {
        const intensity = Math.max(0.2, val / mapData.maxVal);
        return `rgba(52, 211, 153, ${intensity})`; // Emerald-400
      } else {
        const intensity = Math.max(0.2, val / mapData.minVal); 
        return `rgba(244, 63, 94, ${intensity})`; // Rose-500
      }
    }
  };

  return (
    <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
      <CardHeader>
        <SectionTitle 
          title={isSales ? "Global Sales Distribution" : "Global Profit Distribution"} 
          subtitle={isSales ? "Topline revenue volume mapped globally. (Scroll to Zoom, Drag to Pan)" : "Net profit mapping. Green indicates positive margins, Red flags severe loss centers. (Scroll to Zoom)"} 
        />
      </CardHeader>
      <CardContent 
        className="relative h-[600px] w-full cursor-grab active:cursor-grabbing bg-[#020617] rounded-b-3xl"
        onMouseMove={(e) => {
          if (tooltip.visible) {
            setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
          }
        }}
      >
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
          <ZoomableGroup center={[0, 20]} minZoom={1} maxZoom={8}>
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }: any) =>
                geographies.map((geo: any) => (
                  <GeoPath
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColor(geo.properties.name)}
                    stroke="#020617"
                    strokeWidth={0.5}
                    onMouseEnter={() => {
                      const data = getCountryData(geo.properties.name);

                      if (data) {
                        setTooltip({
                          content: data.Country,
                          value: isSales ? data.Sales : data.Profit,
                          visible: true,
                          x: 0,
                          y: 0,
                        });
                      }
                    }}
                    onMouseLeave={() =>
                      setTooltip((prev) => ({
                        ...prev,
                        visible: false,
                      }))
                    }
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: "#fcd34d",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltip.visible && (
          <div 
            className="pointer-events-none fixed z-50 rounded-xl border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md"
            style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
          >
            <p className="mb-1 font-semibold text-white">{tooltip.content}</p>
            <div className="text-sm">
              {isSales && <p className="text-slate-300">Sales: <span className="font-medium text-sky-400">{money(tooltip.value)}</span></p>}
              {!isSales && <p className="text-slate-300">Profit: <span className={`font-medium ${tooltip.value >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{money(tooltip.value)}</span></p>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

export default function Geography() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeo, setSelectedGeo] = useState<any | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Advanced Search Engine Filter
  const filteredGeoList = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    
    return geoSearchDatabase
      .filter((g: any) => 
        g.name.toLowerCase().includes(query) || 
        g.location.toLowerCase().includes(query)
      )
      .sort((a: any, b: any) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        // Exact startsWith matches rank higher
        const aStarts = aName.startsWith(query) ? 1 : 0;
        const bStarts = bName.startsWith(query) ? 1 : 0;
        if (aStarts !== bStarts) return bStarts - aStarts;
        return aName.localeCompare(bName);
      })
      .slice(0, 100); // Cap DOM rendering to prevent lagging
  }, [searchQuery]);

  const handleSelectGeo = (g: any) => {
    setSelectedGeo(g);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredGeoList.length > 0) {
      handleSelectGeo(filteredGeoList[0]);
    }
  };

  return (
    <div className="mx-auto mt-6 flex max-w-[1800px] flex-col gap-8 min-w-0 pb-20">
      
      {/* 1. Header Block */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20 shrink-0">
              <Globe2 className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Spatial Intelligence</p>
              <h2 className="text-xl font-semibold text-white">Geographic Performance Dashboard</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                End-to-End global analysis mapping sales scale, profitability networks, and regional risk assessment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Geography KPIs (Cards) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full items-stretch">
        <MetricCard title="Total Revenue" value="$12.64M" detail="Global generated sales" icon={Wallet} />
        <MetricCard title="Net Retained" value="$1.47M" detail="Total global profit" icon={LandPlot} />
        <MetricCard title="Global Margin" value="11.61%" detail="Average global efficiency" icon={Percent} />
        <MetricCard title="Active Countries" value="147" detail="Sovereign borders operating" icon={Globe2} />
        <MetricCard title="Active Provinces" value="1,094" detail="State-level hubs" icon={MapPinned} />
        <MetricCard title="Active Cities" value="3,636" detail="Municipal supply zones" icon={Building2} />
      </section>

      {/* 3. Advanced Geography Search Engine */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-[100] overflow-visible">
        <CardHeader className="pb-2 overflow-visible">
          <SectionTitle title="Geographic Search Database" subtitle="Instantly lookup specific cities, states, countries, or regions to view local performance." />
        </CardHeader>
        <CardContent className="overflow-visible">
          <div className="relative z-[110] overflow-visible">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search all 5,100+ locations by name (e.g. 'Los Angeles', 'Germany') and hit Enter..." 
              className="w-full pl-12 py-6 rounded-2xl bg-slate-900 border-slate-700 text-slate-200 text-lg placeholder:text-slate-500 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-950 relative z-[120]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
            />
            {/* Suggestion Dropdown Panel */}
            {showDropdown && filteredGeoList.length > 0 && (
              <div className="absolute top-[110%] left-0 w-full bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl z-[999] max-h-80 overflow-y-auto outline outline-1 outline-slate-800">
                 {filteredGeoList.map((g: any) => (
                    <div 
                      key={g.id} 
                      className="px-5 py-4 hover:bg-slate-800 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-800/50 last:border-0"
                      onClick={() => handleSelectGeo(g)}
                    >
                      <div className="pr-4 truncate">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-white truncate">{g.name}</p>
                            <Badge className="bg-slate-800 text-sky-300 border-none">{g.type}</Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 truncate">{g.location}</p>
                      </div>
                      <Badge className="bg-slate-800 text-slate-300 shrink-0 border-slate-700">Select</Badge>
                    </div>
                 ))}
              </div>
            )}
            
            {/* Fallback Message for missing database file */}
            {showDropdown && geoSearchDatabase.length === 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl z-[120] p-4 text-center">
                 <p className="text-slate-400 text-sm">Please place 'geo_search_database.json' in this folder to enable search.</p>
              </div>
            )}
          </div>

          {/* Dynamic Selection Profile Display */}
          {selectedGeo && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 rounded-3xl border border-sky-500/30 bg-sky-950/10 flex flex-col xl:flex-row gap-8 w-full relative z-10">
               <div className="flex-1 space-y-5">
                 <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                       <Map className="h-8 w-8 text-sky-400" />
                    </div>
                    <div className="min-w-0">
                       <h3 className="text-xl font-bold text-white leading-7">{selectedGeo.name}</h3>
                       <p className="text-slate-400 font-mono text-xs mt-1">{selectedGeo.location}</p>
                       <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="bg-slate-900 border border-slate-800 text-sky-300">{selectedGeo.type}</Badge>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                       <p className="text-xs font-medium uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> Local Sales</p>
                       <p className="text-xl font-semibold text-sky-400 mt-1">{moneyExact(selectedGeo.sales)}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                       <p className="text-xs font-medium uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Local Profit</p>
                       <p className={`text-xl font-semibold mt-1 ${selectedGeo.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{moneyExact(selectedGeo.profit)}</p>
                    </div>
                 </div>
               </div>
               
               <div className="flex-1 grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2"><Package className="h-4 w-4 text-sky-400" /> Top Purchased Products</p>
                    <ul className="space-y-2">
                       {selectedGeo.topProducts?.map((prod: string, idx: number) => (
                         <li key={idx} className="text-xs leading-5 text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-lg border border-slate-800/50 truncate" title={prod}>{prod}</li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2"><User className="h-4 w-4 text-sky-400" /> High-Volume Accounts</p>
                    <ul className="space-y-2">
                       {selectedGeo.topCustomers?.map((cust: string, idx: number) => (
                         <li key={idx} className="text-xs leading-5 text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-lg border border-slate-800/50 truncate" title={cust}>{cust}</li>
                       ))}
                    </ul>
                 </div>
               </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* 4. Global Sales Map (Graph) */}
      <GlobalMap type="sales" />

      {/* 5. Global Profit Map (Graph) */}
      <GlobalMap type="profit" />

      {/* 6. Sales Distribution By Region (Graph: Donut) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Sales Distribution by Region" subtitle="Proportional market share across all 13 global regions." />
        </CardHeader>
        <CardContent className="h-[500px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={regionalData} dataKey="Sales" nameKey="Region" innerRadius={120} outerRadius={180} paddingAngle={2}>
                {regionalData.map((entry, index) => (
                  <Cell key={entry.Region} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }} 
                formatter={(value) => {
                  const percent = ((Number(value) / totalRegionalSales) * 100).toFixed(1);
                  return `${money(Number(value))} (${percent}%)`;
                }} 
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 7. Regional Performance by Sales and Profits (Graph: Bar) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Regional Performance" subtitle="Total Sales and Profit output by global region." />
        </CardHeader>
        <CardContent className="h-[500px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="Region" stroke="#94a3b8" tickLine={false} axisLine={false} angle={-35} textAnchor="end" />
              <YAxis stroke="#94a3b8" tickFormatter={money} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "#1e293b" }} contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }} formatter={(value) => money(Number(value))} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="Sales" name="Total Sales" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Profit" name="Total Profit" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 8. Regional Profitability Matrix (Graph: Scatter with Quadrants) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl relative overflow-hidden">
        <CardHeader>
          <SectionTitle 
            title="Regional Profitability Matrix" 
            subtitle="Scatter plot mapping revenue vs profit by region. Separated into performance quadrants based on global averages." 
          />
        </CardHeader>
        
        {/* Absolute Background Quadrant Watermarks */}
        <div className="absolute inset-0 mt-24 pointer-events-none p-10 flex flex-col justify-between z-0 opacity-40">
           <div className="flex justify-between w-full px-12 pt-8">
               <span className="text-purple-500 font-bold uppercase tracking-widest text-lg md:text-xl">Low Sales | High Profit</span>
               <span className="text-emerald-500 font-bold uppercase tracking-widest text-lg md:text-xl">High Sales | High Profit</span>
           </div>
           <div className="flex justify-between w-full px-12 pb-12">
               <span className="text-rose-500 font-bold uppercase tracking-widest text-lg md:text-xl">Low Sales | Low Profit</span>
               <span className="text-amber-500 font-bold uppercase tracking-widest text-lg md:text-xl">High Sales | Low Profit</span>
           </div>
        </div>

        <CardContent className="h-[600px] w-full min-w-0 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="Sales" type="number" stroke="#94a3b8" tickFormatter={money} name="Total Sales" />
              <YAxis dataKey="Profit" type="number" stroke="#94a3b8" tickFormatter={money} name="Net Profit" />
              <ZAxis dataKey="Sales" type="number" range={[200, 2000]} name="Volume" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
                        <p className="mb-2 font-semibold text-white">{data.Region}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-300">Sales: <span className="font-medium text-sky-400">{money(data.Sales)}</span></p>
                          <p className="text-slate-300">Profit: <span className={`font-medium ${data.Profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{money(data.Profit)}</span></p>
                          <p className="text-slate-300">Margin: <span className="font-medium text-amber-400">{pct(data.margin)}</span></p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <ReferenceLine x={avgSales} stroke="#64748b" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'Avg Sales', fill: '#94a3b8', fontSize: 12 }} />
              <ReferenceLine y={avgProfit} stroke="#64748b" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Avg Profit', fill: '#94a3b8', fontSize: 12 }} />
              
              <Scatter data={regionalScatterData} name="Profitability Matrix">
                {regionalScatterData.map((entry, index) => {
                  let dotColor = "#38bdf8"; // default
                  if (entry.Sales >= avgSales && entry.Profit >= avgProfit) dotColor = "#34d399"; // High/High
                  else if (entry.Sales >= avgSales && entry.Profit < avgProfit) dotColor = "#fbbf24"; // High/Low
                  else if (entry.Sales < avgSales && entry.Profit < avgProfit) dotColor = "#f43f5e"; // Low/Low
                  else dotColor = "#a855f7"; // Low/High

                  return <Cell key={`cell-${index}`} fill={dotColor} opacity={0.85} stroke={dotColor} strokeWidth={2} />
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 9-12. Top Leaders (Graphs: Full Width Horizontal Bars) */}
      <FullWidthRankChart title="Top 10 States by Sales" subtitle="The highest revenue-generating states/provinces globally." data={topStatesSales} yAxisKey="State" metricKey="Sales" fill="#60a5fa" />
      <FullWidthRankChart title="Top 10 States by Profit" subtitle="The absolute best bottom-line contributing states." data={topStatesProfit} yAxisKey="State" metricKey="Profit" fill="#34d399" />
      <FullWidthRankChart title="Top 10 Cities by Sales" subtitle="Metropolitan hubs driving the most top-line volume." data={topCitiesSales} yAxisKey="City" metricKey="Sales" fill="#60a5fa" />
      <FullWidthRankChart title="Top 10 Cities by Profit" subtitle="The most financially efficient and profitable cities." data={topCitiesProfit} yAxisKey="City" metricKey="Profit" fill="#34d399" />

      {/* 13-16. Bottom Bleeders (Graphs: Full Width Horizontal Bars with Danger styling) */}
      <FullWidthRankChart title="Bottom 10 States by Sales" subtitle="States with the absolute lowest recorded revenue." data={bottomStatesSales} yAxisKey="State" metricKey="Sales" fill="#94a3b8" danger />
      <FullWidthRankChart title="Bottom 10 States by Profit" subtitle="Major profit leaks. These states lose the most money." data={bottomStatesProfit} yAxisKey="State" metricKey="Profit" fill="#f43f5e" danger />
      <FullWidthRankChart title="Bottom 10 Cities by Sales" subtitle="Micro-markets with basically zero volume." data={bottomCitiesSales} yAxisKey="City" metricKey="Sales" fill="#94a3b8" danger />
      <FullWidthRankChart title="Bottom 10 Cities by Profit" subtitle="Toxic localized markets causing the steepest net losses." data={bottomCitiesProfit} yAxisKey="City" metricKey="Profit" fill="#f43f5e" danger />

      {/* 17. Geography Insights (Cards) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Geography Actionable Insights" subtitle="Strategic findings derived from the spatial data matrices." />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {geoInsights.map((text, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-semibold text-white uppercase text-xs tracking-wider">Strategic Note</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}