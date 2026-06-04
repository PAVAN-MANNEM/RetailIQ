import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  HeartHandshake,
  Users,
  UserRoundX,
  Star,
  Repeat,
  Trophy,
  ShieldAlert,
  Search,
  MapPin,
  CalendarDays,
  Package,
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
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ⚠️ IMPORTANT: Update this path to point to your exports folder where I created the JSON!
import customerSearchDataRaw from "../../data/customer_search_database.json";
const customerSearchData = customerSearchDataRaw as any[];

// --- Extracted Data from CSV ---

const segmentData = [
  { "segment": "Champions", "customers": 874, "salesShare": 88.29, "profitShare": 91.35, "sales": 11162181.82, "profit": 1340514.24 }, 
  { "segment": "Loyal Customers", "customers": 222, "salesShare": 5.72, "profitShare": 5.72, "sales": 722948.33, "profit": 83918.84 }, 
  { "segment": "Potential Loyalists", "customers": 246, "salesShare": 4.13, "profitShare": 2.28, "sales": 522362.69, "profit": 33475.41 }, 
  { "segment": "At Risk", "customers": 248, "salesShare": 1.86, "profitShare": 0.65, "sales": 235009.07, "profit": 9548.81 }
];

const topSalesCust = [
  { "id": "TA-21385", "name": "Tom Ashbrook", "sales": 35668.12, "profit": 6274.99, "orders": 25, "aov": 1426.72 }, 
  { "id": "GT-14710", "name": "Greg Tran", "sales": 34471.89, "profit": 5164.85, "orders": 30, "aov": 1149.06 }, 
  { "id": "TC-20980", "name": "Tamara Chand", "sales": 34218.27, "profit": 8787.47, "orders": 28, "aov": 1222.08 }, 
  { "id": "SM-20320", "name": "Sean Miller", "sales": 31125.29, "profit": -1083.67, "orders": 21, "aov": 1482.16 }, 
  { "id": "BW-11110", "name": "Bart Watters", "sales": 30613.62, "profit": 3337.47, "orders": 35, "aov": 874.67 }, 
  { "id": "HL-15040", "name": "Hunter Lopez", "sales": 29664.23, "profit": 7657.50, "orders": 20, "aov": 1483.21 }, 
  { "id": "SE-20110", "name": "Sanjit Engle", "sales": 29532.63, "profit": 5863.62, "orders": 36, "aov": 820.35 }, 
  { "id": "PS-19045", "name": "Penelope Sewall", "sales": 29252.32, "profit": 4426.20, "orders": 26, "aov": 1125.09 }, 
  { "id": "RB-19360", "name": "Raymond Buch", "sales": 29197.63, "profit": 8523.95, "orders": 25, "aov": 1167.91 }, 
  { "id": "ZC-21910", "name": "Zuschuss Carroll", "sales": 28472.82, "profit": 452.50, "orders": 37, "aov": 769.54 }
];

const topProfitCust = [
  { "id": "TC-20980", "name": "Tamara Chand", "sales": 34218.27, "profit": 8787.47, "orders": 28, "aov": 1222.08 }, 
  { "id": "RB-19360", "name": "Raymond Buch", "sales": 29197.63, "profit": 8523.95, "orders": 25, "aov": 1167.91 }, 
  { "id": "SC-20095", "name": "Sanjit Chand", "sales": 25602.61, "profit": 8106.22, "orders": 28, "aov": 914.38 }, 
  { "id": "BE-11335", "name": "Bill Eplett", "sales": 27158.02, "profit": 7790.70, "orders": 37, "aov": 734.00 }, 
  { "id": "HL-15040", "name": "Hunter Lopez", "sales": 29664.23, "profit": 7657.50, "orders": 20, "aov": 1483.21 }, 
  { "id": "AB-10105", "name": "Adrian Barton", "sales": 22966.78, "profit": 6912.61, "orders": 33, "aov": 695.96 }, 
  { "id": "SP-20920", "name": "Susan Pistek", "sales": 28124.21, "profit": 6649.63, "orders": 28, "aov": 1004.44 }, 
  { "id": "HM-14860", "name": "Harry Marie", "sales": 27434.17, "profit": 6544.89, "orders": 37, "aov": 741.46 }, 
  { "id": "TA-21385", "name": "Tom Ashbrook", "sales": 35668.12, "profit": 6274.99, "orders": 25, "aov": 1426.72 }, 
  { "id": "SE-20110", "name": "Sanjit Engle", "sales": 29532.63, "profit": 5863.62, "orders": 36, "aov": 820.35 }
];

const topOrderCust = [
  { "id": "PO-18850", "name": "Patrick OBrill", "sales": 25274.47, "profit": 3249.28, "orders": 41, "aov": 616.45 }, 
  { "id": "KH-16690", "name": "Kristen Hastings", "sales": 18158.46, "profit": 2367.49, "orders": 39, "aov": 465.60 }, 
  { "id": "MP-17965", "name": "Michael Paige", "sales": 17228.50, "profit": 1455.21, "orders": 39, "aov": 441.76 }, 
  { "id": "CK-12205", "name": "Chloris Kastensmidt", "sales": 13625.21, "profit": 1311.21, "orders": 38, "aov": 358.56 }, 
  { "id": "WB-21850", "name": "William Brown", "sales": 16704.66, "profit": 2694.50, "orders": 38, "aov": 439.60 }, 
  { "id": "JH-15985", "name": "Joseph Holt", "sales": 18863.40, "profit": -182.93, "orders": 38, "aov": 496.41 }, 
  { "id": "AR-10825", "name": "Anthony Rawles", "sales": 15311.04, "profit": 2828.10, "orders": 38, "aov": 402.92 }, 
  { "id": "SC-20380", "name": "Shahid Collister", "sales": 16122.72, "profit": 1282.25, "orders": 37, "aov": 435.75 }, 
  { "id": "TP-21130", "name": "Theone Pippenger", "sales": 22697.58, "profit": 1964.41, "orders": 37, "aov": 613.45 }, 
  { "id": "SZ-20035", "name": "Sam Zeldin", "sales": 15192.38, "profit": 2785.23, "orders": 37, "aov": 410.60 }
];

const topLossCust = [
  { "id": "CS-12505", "name": "Cindy Stewart", "sales": 11535.25, "profit": -6437.37, "orders": 16, "margin": -55.81 }, 
  { "id": "DM-3345", "name": "Denise Monton", "sales": 4998.42, "profit": -5474.61, "orders": 6, "margin": -109.53 }, 
  { "id": "GT-14635", "name": "Grant Thornton", "sales": 19080.35, "profit": -3790.08, "orders": 20, "margin": -19.86 }, 
  { "id": "LF-17185", "name": "Luke Foster", "sales": 12864.72, "profit": -3700.20, "orders": 22, "margin": -28.76 }, 
  { "id": "MT-8070", "name": "Michelle Tran", "sales": 6851.92, "profit": -2991.62, "orders": 7, "margin": -43.66 }, 
  { "id": "JF-5355", "name": "Jay Fein", "sales": 3475.76, "profit": -2891.35, "orders": 9, "margin": -83.19 }, 
  { "id": "CM-11815", "name": "Candace McMahon", "sales": 14362.80, "profit": -2881.64, "orders": 23, "margin": -20.06 }, 
  { "id": "JC-6105", "name": "Julie Creighton", "sales": 3914.94, "profit": -2601.42, "orders": 6, "margin": -66.45 }, 
  { "id": "SR-20425", "name": "Sharelle Roach", "sales": 12721.25, "profit": -2544.73, "orders": 19, "margin": -20.00 }, 
  { "id": "SN-20560", "name": "Skye Norling", "sales": 12738.71, "profit": -2527.12, "orders": 25, "margin": -19.84 }
];

const customerNotes = [
  "Champions represent 55% of the total customer base but generate a massive 88% of total revenue. Retention of this cohort is critical to top-line stability.", 
  "The average order value (AOV) across the entire customer base sits at $504.99, indicating strong up-sell conversion.", 
  "At Risk customers generate negative overall profit margins (-20% to -109%) primarily due to excessive historical discounting and logistical returns.", 
  "Reward Champions with loyalty perks, exclusive offers, and premium cross-sell opportunities to cement their LTV (Lifetime Value).",
  "Trigger aggressive retention campaigns and targeted recovery outreach for the At Risk segment to re-engage dormant, previously high-value accounts."
];

// --- Theme Config ---
const segmentPalette = ["#60a5fa", "#34d399", "#a78bfa", "#f59e0b", "#fb7185"]; 

// --- Formatters ---
function moneyExact(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value); }
function formatNumber(value: number) { return new Intl.NumberFormat("en-US").format(value); }
function pct(value: number) { return `${value.toFixed(2)}%`; }

// --- CUSTOM TOOLTIPS ---
const CustomSegmentTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const totalCustomers = 1590; 
    const custShare = (data.customers / totalCustomers) * 100;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
        <p className="font-semibold text-white mb-2">{data.segment}</p>
        <p className="text-sm text-amber-400 mb-1">Customers: {formatNumber(data.customers)} ({pct(custShare)})</p>
        <p className="text-sm text-sky-400 mb-1">Total Sales: {moneyExact(data.sales)}</p>
        <p className="text-sm text-emerald-400 font-medium pt-1 border-t border-slate-800">Profit: {moneyExact(data.profit)}</p>
      </div>
    );
  }
  return null;
};

// --- UI Components ---
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function MetricCard({ title, value, detail, trend, icon: Icon }: { title: string; value: string; detail: string; trend?: "up" | "down", icon: any }) {
  const up = trend !== "down";
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 h-full flex flex-col justify-between">
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
          <div className="mt-5 flex items-center justify-between">
            <div className={`flex items-center gap-1 text-sm font-medium ${up ? "text-emerald-400" : "text-rose-400"}`}>
              {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{up ? "Healthy" : "Action Required"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCust, setSelectedCust] = useState<any | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Search filtering logic utilizing the fully imported customerSearchData
  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return [];
    return customerSearchData.filter((c: any) => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectCustomer = (c: any) => {
    setSelectedCust(c);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // Detect 'Enter' key to select the first matching customer
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredCustomers.length > 0) {
      handleSelectCustomer(filteredCustomers[0]);
    }
  };

  return (
    <div className="mx-auto mt-6 flex flex-col min-w-0 max-w-[1600px] gap-6 w-full pb-10 relative">
      
      {/* 1. Header Block */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20 shrink-0">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Customer Analytics</p>
              <h2 className="text-xl font-semibold text-white">Customer & RFM Insights</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                End-to-End full width breakdown of customer segments, loyalty tiers, lifetime value, and at-risk loss leaders.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Key Customer KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full items-stretch">
        <MetricCard title="Active Customers" value="1,590" detail="Unique buying accounts" trend="up" icon={Users} />
        <MetricCard title="Champions Share" value="55.0%" detail="Percentage of top buyers" trend="up" icon={Trophy} />
        <MetricCard title="Top Sales Value" value="$35.6K" detail="Highest account revenue" trend="up" icon={Star} />
        <MetricCard title="At-Risk Base" value="15.6%" detail="Customers at risk of churn" trend="down" icon={UserRoundX} />
        <MetricCard title="Repeat Orders" value="25,035" detail="Total order lines logged" trend="up" icon={Repeat} />
        <MetricCard title="Avg Order Value" value="$505" detail="Average basket spend" trend="up" icon={BadgeCheck} />
      </section>

      {/* 3. Customer Search Engine */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-[100] overflow-visible">
        <CardHeader className="pb-2">
          <SectionTitle title="Customer Search Database" subtitle="Instantly lookup specific customer profiles by Name or ID" />
        </CardHeader>
        <CardContent className="overflow-visible">
          <div className="relative z-[110] overflow-visible">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search all 1,590 customers by name (e.g. Tom Ashbrook) or ID and press Enter..." 
              className="w-full pl-12 py-6 rounded-2xl bg-slate-900 border-slate-700 text-slate-200 text-lg placeholder:text-slate-500 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-950"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
            />
            {/* Auto-suggest Dropdown */}
            {showDropdown && filteredCustomers.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl z-[120] max-h-80 overflow-y-auto outline outline-1 outline-slate-800">
                 {filteredCustomers.map((c: any) => (
                    <div 
                      key={c.id} 
                      className="px-5 py-4 hover:bg-slate-800 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-800/50 last:border-0"
                      onClick={() => handleSelectCustomer(c)}
                    >
                      <div>
                        <p className="font-medium text-white">{c.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{c.id}</p>
                      </div>
                      <Badge className="bg-slate-800 text-slate-300">Select</Badge>
                    </div>
                 ))}
              </div>
            )}
          </div>

          {/* Render Selected Customer Profile */}
          {selectedCust && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 rounded-3xl border border-sky-500/30 bg-sky-950/10 flex flex-col xl:flex-row gap-8 w-full">
               <div className="flex-1 space-y-5">
                 <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                       <Users className="h-8 w-8 text-sky-400" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-white">{selectedCust.name}</h3>
                       <p className="text-slate-400 font-mono text-sm mt-1">{selectedCust.id}</p>
                       <div className="flex items-center gap-2 mt-2 text-sm text-slate-300">
                          <MapPin className="h-4 w-4 text-sky-400" /> {selectedCust.location}
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                       <p className="text-xs uppercase tracking-wider text-slate-500">Total Sales</p>
                       <p className="text-xl font-semibold text-sky-400 mt-1">{moneyExact(selectedCust.sales)}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                       <p className="text-xs uppercase tracking-wider text-slate-500">Net Profit</p>
                       <p className={`text-xl font-semibold mt-1 ${selectedCust.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{moneyExact(selectedCust.profit)}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                       <p className="text-xs uppercase tracking-wider text-slate-500">Total Orders</p>
                       <p className="text-xl font-semibold text-amber-400 mt-1">{formatNumber(selectedCust.orders)}</p>
                    </div>
                 </div>
               </div>
               
               <div className="flex-1 grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2"><CalendarDays className="h-4 w-4" /> Latest Order Dates</p>
                    <ul className="space-y-2">
                       {selectedCust.orderDates.map((date: string, idx: number) => (
                         <li key={idx} className="text-sm text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-lg border border-slate-800/50">{date}</li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2"><Package className="h-4 w-4" /> Top Purchased Products</p>
                    <ul className="space-y-2">
                       {selectedCust.products.map((prod: string, idx: number) => (
                         <li key={idx} className="text-xs leading-5 text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-lg border border-slate-800/50 truncate" title={prod}>{prod}</li>
                       ))}
                    </ul>
                 </div>
               </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* RFM Segment Definitions */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
         <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">RFM Segment Definitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                  <p className="font-bold text-sky-400 mb-1">Champions</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Bought recently, buy often, and spend the most. Core foundation of revenue.</p>
               </div>
               <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="font-bold text-emerald-400 mb-1">Loyal Customers</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Spend good money and order frequently. Highly responsive to promotions.</p>
               </div>
               <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <p className="font-bold text-amber-400 mb-1">Potential Loyalists</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Recent customers with average frequency. Ready for cross-sell nurturing.</p>
               </div>
               <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <p className="font-bold text-rose-400 mb-1">At Risk / Need Attention</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Used to purchase frequently but haven't returned recently. Highest churn risk.</p>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 4. Customer Distribution by RFM Segment */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Customer Distribution by RFM Segment" subtitle="Proportion of unique customer accounts grouped by historical behavioral tiers" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={segmentData} 
                dataKey="customers" 
                nameKey="segment" 
                cx="50%" 
                cy="50%" 
                innerRadius={90} 
                outerRadius={140} 
                paddingAngle={4}
                label={(props) => `${props.name} (${((props.percent ?? 0)*100).toFixed(1)}%)` }
                labelLine={false}
              >
                {segmentData.map((entry, index) => (
                  <Cell key={entry.segment} fill={segmentPalette[index % segmentPalette.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomSegmentTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Revenue Contribution by Customer Segment */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Revenue Contribution by Customer Segment" subtitle="How much topline sales revenue is driven by each loyalty tier" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="segment" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip content={<CustomSegmentTooltip />} cursor={{ fill: "#1e293b" }} />
              <Bar dataKey="salesShare" name="Share of Sales (%)" radius={[4, 4, 0, 0]} barSize={80}>
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={segmentPalette[index % segmentPalette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Profit Contribution by Customer Segment */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Profit Contribution by Customer Segment" subtitle="How much bottom-line net profit is driven by each loyalty tier" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="segment" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip content={<CustomSegmentTooltip />} cursor={{ fill: "#1e293b" }} />
              <Bar dataKey="profitShare" name="Share of Profit (%)" radius={[4, 4, 0, 0]} barSize={80}>
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={segmentPalette[index % segmentPalette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 7. Top Customers by Sales */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Top 10 Customers (By Sales)" subtitle="Highest grossing customer accounts based on historical order volume" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topSalesCust.map((row, index) => (
            <div key={`sales-${row.id}`} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-semibold text-sm shrink-0">
                    #{index + 1}
                 </div>
                 <div>
                   <p className="font-semibold text-white text-lg">{row.name}</p>
                   <p className="text-sm text-slate-400">ID: {row.id}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-[600px] shrink-0">
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Total Sales</p>
                    <p className="font-semibold text-sky-400">{moneyExact(row.sales)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Net Profit</p>
                    <p className={`font-semibold ${row.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{moneyExact(row.profit)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Orders</p>
                    <p className="font-semibold text-amber-400">{formatNumber(row.orders)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">AOV</p>
                    <p className="font-semibold text-slate-200">{moneyExact(row.aov)}</p>
                 </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 8. Top Customers by Profit */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Top 10 Customers (By Profit)" subtitle="Most fundamentally profitable customer accounts across the business" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topProfitCust.map((row, index) => (
            <div key={`profit-${row.id}`} className="rounded-2xl border border-emerald-500/10 bg-emerald-950/10 p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-semibold text-sm shrink-0">
                    #{index + 1}
                 </div>
                 <div>
                   <p className="font-semibold text-white text-lg">{row.name}</p>
                   <p className="text-sm text-slate-400">ID: {row.id}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-[600px] shrink-0">
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Net Profit</p>
                    <p className="font-semibold text-emerald-400">{moneyExact(row.profit)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Total Sales</p>
                    <p className="font-semibold text-sky-400">{moneyExact(row.sales)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Orders</p>
                    <p className="font-semibold text-amber-400">{formatNumber(row.orders)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">AOV</p>
                    <p className="font-semibold text-slate-200">{moneyExact(row.aov)}</p>
                 </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 9. Top Customers by Order (Frequency) */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Top 10 Customers (By Order Frequency)" subtitle="Customers with the highest transaction recurrence and engagement" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topOrderCust.map((row, index) => (
            <div key={`order-${row.id}`} className="rounded-2xl border border-amber-500/10 bg-amber-950/10 p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center text-amber-400 font-semibold text-sm shrink-0">
                    #{index + 1}
                 </div>
                 <div>
                   <p className="font-semibold text-white text-lg">{row.name}</p>
                   <p className="text-sm text-slate-400">ID: {row.id}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-[600px] shrink-0">
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Orders</p>
                    <p className="font-semibold text-amber-400">{formatNumber(row.orders)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Total Sales</p>
                    <p className="font-semibold text-sky-400">{moneyExact(row.sales)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Net Profit</p>
                    <p className={`font-semibold ${row.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{moneyExact(row.profit)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">AOV</p>
                    <p className="font-semibold text-slate-200">{moneyExact(row.aov)}</p>
                 </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 10. Top Loss-Making Customers */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Top 10 Loss-Making Customers" subtitle="Critical risk accounts generating the deepest net financial losses" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topLossCust.map((row, index) => (
            <div key={`loss-${row.id}`} className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 font-semibold text-sm shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                 </div>
                 <div>
                   <p className="font-semibold text-white text-lg">{row.name}</p>
                   <p className="text-sm text-rose-300">Action Required</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-[600px] shrink-0">
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-rose-400/70 mb-1">Net Loss</p>
                    <p className="font-semibold text-rose-400">{moneyExact(row.profit)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-rose-400/70 mb-1">Total Sales</p>
                    <p className="font-semibold text-slate-200">{moneyExact(row.sales)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-rose-400/70 mb-1">Profit Margin</p>
                    <p className="font-semibold text-rose-400">{pct(row.margin)}</p>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wider text-rose-400/70 mb-1">Orders</p>
                    <p className="font-semibold text-amber-400">{formatNumber(row.orders)}</p>
                 </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 11. Customer Strategic Notes */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full relative z-10">
        <CardHeader className="pb-2">
          <SectionTitle title="Strategic Customer Insights" subtitle="Actionable diagnostic notes generated from RFM and loyalty analysis" />
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {customerNotes.map((text, idx) => (
            <div key={`note-${idx}`} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm leading-6 text-slate-300 flex items-start gap-3">
              <span className="mt-1 text-emerald-400"><HeartHandshake className="h-4 w-4" /></span>
              <p>{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}