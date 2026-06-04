import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, BadgeDollarSign, Percent, ShieldAlert, TrendingUp, Wallet, Activity, AlertOctagon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, ReferenceLine, Tooltip, XAxis, YAxis, ZAxis, } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// --- TOTALS FOR CALCULATIONS ---
const TOTAL_PROFIT = 1467457.29;
// --- Extracted Data from CSV ---
const monthlyData = [
    { "period": "Jan 2011", "sales": 98898.48, "profit": 8321.80, "margin": 8.41, "growth": 0.0 },
    { "period": "Feb 2011", "sales": 91152.15, "profit": 12417.90, "margin": 13.62, "growth": 49.22 },
    { "period": "Mar 2011", "sales": 145729.36, "profit": 15303.56, "margin": 10.50, "growth": 23.23 },
    { "period": "Apr 2011", "sales": 116915.76, "profit": 12902.32, "margin": 11.03, "growth": -15.69 },
    { "period": "May 2011", "sales": 146747.83, "profit": 12183.82, "margin": 8.30, "growth": -5.56 },
    { "period": "Jun 2011", "sales": 215207.38, "profit": 23415.24, "margin": 10.88, "growth": 92.18 },
    { "period": "Jul 2011", "sales": 115510.41, "profit": 5585.00, "margin": 4.83, "growth": -76.14 },
    { "period": "Aug 2011", "sales": 207581.49, "profit": 23713.66, "margin": 11.42, "growth": 324.59 },
    { "period": "Sep 2011", "sales": 290214.45, "profit": 35776.88, "margin": 12.32, "growth": 50.87 },
    { "period": "Oct 2011", "sales": 199071.26, "profit": 25963.41, "margin": 13.04, "growth": -27.42 },
    { "period": "Nov 2011", "sales": 298496.53, "profit": 32709.17, "margin": 10.95, "growth": 25.98 },
    { "period": "Dec 2011", "sales": 333925.73, "profit": 40647.98, "margin": 12.17, "growth": 24.27 },
    { "period": "Jan 2012", "sales": 135780.72, "profit": 10401.63, "margin": 7.66, "growth": -74.41 },
    { "period": "Feb 2012", "sales": 100510.21, "profit": 15000.09, "margin": 14.92, "growth": 44.20 },
    { "period": "Mar 2012", "sales": 163076.77, "profit": 17992.91, "margin": 11.03, "growth": 19.95 },
    { "period": "Apr 2012", "sales": 161052.26, "profit": 17366.96, "margin": 10.78, "growth": -3.47 },
    { "period": "May 2012", "sales": 208364.89, "profit": 29876.70, "margin": 14.33, "growth": 72.03 },
    { "period": "Jun 2012", "sales": 256175.69, "profit": 34407.15, "margin": 13.43, "growth": 15.16 },
    { "period": "Jul 2012", "sales": 145236.78, "profit": 15585.38, "margin": 10.73, "growth": -54.70 },
    { "period": "Aug 2012", "sales": 303142.94, "profit": 43573.87, "margin": 14.37, "growth": 179.58 },
    { "period": "Sep 2012", "sales": 289389.16, "profit": 27776.18, "margin": 9.59, "growth": -36.25 },
    { "period": "Oct 2012", "sales": 252939.85, "profit": 30662.88, "margin": 12.12, "growth": 10.39 },
    { "period": "Nov 2012", "sales": 323512.41, "profit": 31820.72, "margin": 9.83, "growth": 3.77 },
    { "period": "Dec 2012", "sales": 338256.96, "profit": 32950.75, "margin": 9.74, "growth": 3.55 },
    { "period": "Jan 2013", "sales": 199185.90, "profit": 26810.55, "margin": 13.46, "growth": -18.63 },
    { "period": "Feb 2013", "sales": 167239.65, "profit": 23762.49, "margin": 14.20, "growth": -11.36 },
    { "period": "Mar 2013", "sales": 198594.03, "profit": 23433.77, "margin": 11.79, "growth": -1.38 },
    { "period": "Apr 2013", "sales": 177821.31, "profit": 19462.03, "margin": 10.94, "growth": -16.94 },
    { "period": "May 2013", "sales": 260498.56, "profit": 28495.69, "margin": 10.93, "growth": 46.41 },
    { "period": "Jun 2013", "sales": 396519.61, "profit": 45478.41, "margin": 11.46, "growth": 59.59 },
    { "period": "Jul 2013", "sales": 229928.95, "profit": 28863.82, "margin": 12.55, "growth": -36.53 },
    { "period": "Aug 2013", "sales": 326488.78, "profit": 31023.66, "margin": 9.50, "growth": 7.48 },
    { "period": "Sep 2013", "sales": 376619.24, "profit": 38905.66, "margin": 10.33, "growth": 25.40 },
    { "period": "Oct 2013", "sales": 293406.64, "profit": 42433.22, "margin": 14.46, "growth": 9.06 },
    { "period": "Nov 2013", "sales": 373989.36, "profit": 48062.99, "margin": 12.85, "growth": 13.26 },
    { "period": "Dec 2013", "sales": 405454.37, "profit": 50202.87, "margin": 12.38, "growth": 4.45 },
    { "period": "Jan 2014", "sales": 241268.55, "profit": 28001.38, "margin": 11.60, "growth": -44.22 },
    { "period": "Feb 2014", "sales": 184837.35, "profit": 19751.69, "margin": 10.68, "growth": -29.46 },
    { "period": "Mar 2014", "sales": 263100.77, "profit": 37357.26, "margin": 14.19, "growth": 89.13 },
    { "period": "Apr 2014", "sales": 242771.86, "profit": 23782.30, "margin": 9.79, "growth": -36.33 },
    { "period": "May 2014", "sales": 288401.04, "profit": 33953.55, "margin": 11.77, "growth": 42.76 },
    { "period": "Jun 2014", "sales": 401814.06, "profit": 43778.60, "margin": 10.89, "growth": 28.93 },
    { "period": "Jul 2014", "sales": 258705.68, "profit": 28035.87, "margin": 10.83, "growth": -35.95 },
    { "period": "Aug 2014", "sales": 456619.94, "profit": 53542.89, "margin": 11.72, "growth": 90.97 },
    { "period": "Sep 2014", "sales": 481157.24, "profit": 67979.45, "margin": 14.12, "growth": 26.96 },
    { "period": "Oct 2014", "sales": 422766.62, "profit": 58209.83, "margin": 13.76, "growth": -14.37 },
    { "period": "Nov 2014", "sales": 555279.02, "profit": 62856.58, "margin": 11.31, "growth": 7.98 },
    { "period": "Dec 2014", "sales": 503143.69, "profit": 46916.52, "margin": 9.32, "growth": -25.35 }
];
const categoryData = [
    { "name": "Technology", "sales": 4744557.49, "profit": 663778.73, "margin": 13.99, "orders": 8354 },
    { "name": "Furniture", "sales": 4110874.18, "profit": 285204.72, "margin": 6.93, "orders": 8195 },
    { "name": "Office Supplies", "sales": 3787070.22, "profit": 518473.83, "margin": 13.69, "orders": 19003 }
];
const subCategoryData = [
    { "name": "Phones", "sales": 1706824.13, "profit": 216717.00, "margin": 12.7, "segment": "High Volume, Low Efficiency", "orders": 3133 },
    { "name": "Copiers", "sales": 1509436.27, "profit": 258567.54, "margin": 17.13, "segment": "Core Winners", "orders": 2120 },
    { "name": "Chairs", "sales": 1501681.76, "profit": 140396.26, "margin": 9.35, "segment": "High Volume, Low Efficiency", "orders": 3187 },
    { "name": "Bookcases", "sales": 1466572.24, "profit": 161924.41, "margin": 11.04, "segment": "High Volume, Low Efficiency", "orders": 2284 },
    { "name": "Storage", "sales": 1127085.86, "profit": 108461.48, "margin": 9.62, "segment": "High Volume, Low Efficiency", "orders": 4534 },
    { "name": "Appliances", "sales": 1011064.30, "profit": 141680.58, "margin": 14.01, "segment": "Core Winners", "orders": 1686 },
    { "name": "Machines", "sales": 779060.06, "profit": 58867.87, "margin": 7.56, "segment": "High Volume, Low Efficiency", "orders": 1422 },
    { "name": "Tables", "sales": 757041.92, "profit": -64083.38, "margin": -8.46, "segment": "Loss Makers", "orders": 836 },
    { "name": "Accessories", "sales": 749237.01, "profit": 129626.30, "margin": 17.3, "segment": "Core Winners", "orders": 2889 },
    { "name": "Binders", "sales": 461911.50, "profit": 72449.84, "margin": 15.68, "segment": "Hidden Gems", "orders": 5392 },
    { "name": "Furnishings", "sales": 385578.25, "profit": 46967.42, "margin": 12.18, "segment": "Weak Performer", "orders": 2965 },
    { "name": "Art", "sales": 372091.96, "profit": 57953.91, "margin": 15.58, "segment": "Hidden Gems", "orders": 4366 },
    { "name": "Paper", "sales": 244291.71, "profit": 59207.68, "margin": 24.24, "segment": "Hidden Gems", "orders": 3234 },
    { "name": "Supplies", "sales": 243074.22, "profit": 22583.26, "margin": 9.29, "segment": "Weak Performer", "orders": 2281 },
    { "name": "Envelopes", "sales": 170904.30, "profit": 29601.11, "margin": 17.32, "segment": "Hidden Gems", "orders": 2310 },
    { "name": "Fasteners", "sales": 83242.31, "profit": 11525.42, "margin": 13.85, "segment": "Hidden Gems", "orders": 2304 },
    { "name": "Labels", "sales": 73404.03, "profit": 15010.51, "margin": 20.45, "segment": "Hidden Gems", "orders": 2460 }
];
const discountData = [
    { "band": "0-5%", "sales": 7253806.57, "profit": 1828671.85, "margin": 25.21 },
    { "band": "5-10%", "sales": 1701223.22, "profit": 280212.68, "margin": 16.47 },
    { "band": "10-20%", "sales": 1757261.33, "profit": 173254.84, "margin": 9.86 },
    { "band": "20-30%", "sales": 382554.68, "profit": -21155.61, "margin": -5.53 },
    { "band": "30-50%", "sales": 1176031.42, "profit": -380944.81, "margin": -32.39 },
    { "band": "50%+", "sales": 371624.66, "profit": -412581.65, "margin": -111.02 }
];
const profitLossDist = [
    { "name": "Profit Making Orders", "value": 38746 },
    { "name": "Loss Making Orders", "value": 12544 }
];
// Re-engineered strategic business notes based directly on the dataset
const profitNotes = [
    "Tables account for the largest absolute categorical loss (-$64,083) despite driving $757k in sales. Immediate bundling strategies or rationalization are required to halt margin erosion.",
    "Discounts exceeding 20% obliterate profit margins. 50%+ discount bands are operating at a fatal -111% margin. Limit aggressive discounting exclusively to dead stock clearance.",
    "Technology generates 45.2% of total net profits while comprising only 16.6% of total order volume. Emphasize up-selling hardware components.",
    "Copiers and Accessories are the ultimate profit engines (Core Winners). Divert marketing spend toward these high-efficiency SKUs to disproportionately lift bottom-line revenue.",
    "Paper operates as a 'Hidden Gem' with the highest organizational margin at 24.24%. It requires modest promotional scaling to transition into a High-Volume Core Winner.",
    "Nearly 24.4% of all orders are executed at a net loss (12.5k out of 51k total lines). Implementing strict discount governance per order minimums will immediately recapture leaked cash flow."
];
// --- Theme Config ---
const piePalette = ["#34d399", "#fb7185"]; // Profit vs Loss Colors
const catPalette = ["#60a5fa", "#a78bfa", "#f59e0b"]; // Donut Colors
const segmentColors = {
    "High Volume, Low Efficiency": "#f59e0b",
    "Core Winners": "#34d399",
    "Loss Makers": "#fb7185",
    "Hidden Gems": "#60a5fa",
    "Weak Performer": "#a78bfa"
};
// --- Formatters ---
function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
function moneyExact(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value); }
function formatNumber(value) { return new Intl.NumberFormat("en-US").format(value); }
function pct(value) { return `${value.toFixed(2)}%`; }
// --- CUSTOM TOOLTIPS ---
const CustomMarginTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const color = data.margin >= 10 ? "text-emerald-400" : data.margin >= 5 ? "text-amber-400" : "text-rose-400";
        return (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl", children: [_jsx("p", { className: "font-semibold text-white mb-2", children: data.period }), _jsxs("p", { className: "text-sm text-sky-400 mb-1", children: ["Sales: ", moneyExact(data.sales)] }), _jsxs("p", { className: `text-sm mb-1 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: ["Profit: ", moneyExact(data.profit)] }), _jsxs("p", { className: `text-sm font-medium pt-1 border-t border-slate-800 ${color}`, children: ["Margin: ", pct(data.margin)] })] }));
    }
    return null;
};
const GrowthTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const color = data.growth >= 0 ? "text-emerald-400" : "text-rose-400";
        return (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl", children: [_jsx("p", { className: "font-semibold text-white mb-2", children: data.period }), _jsxs("p", { className: `text-sm font-medium ${color}`, children: ["MoM Profit Growth: ", pct(data.growth)] })] }));
    }
    return null;
};
const CustomCategoryProfitTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const profitPct = (data.profit / TOTAL_PROFIT) * 100;
        return (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl", children: [_jsx("p", { className: "font-semibold text-white mb-2", children: data.name }), _jsxs("p", { className: "text-sm text-amber-400 mb-1", children: ["Orders: ", formatNumber(data.orders)] }), _jsxs("p", { className: "text-sm text-sky-400 mb-1", children: ["Sales: ", moneyExact(data.sales)] }), _jsxs("p", { className: "text-sm text-emerald-400 mb-1", children: ["Net Profit: ", moneyExact(data.profit)] }), _jsxs("p", { className: "text-sm text-purple-400 font-medium pt-1 border-t border-slate-800", children: ["Profit Share: ", pct(profitPct)] })] }));
    }
    return null;
};
const CustomSubCategoryProfitTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const profitPct = (data.profit / TOTAL_PROFIT) * 100;
        return (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl", children: [_jsx("p", { className: "font-semibold text-white mb-2", children: data.name }), _jsxs("p", { className: "text-sm text-amber-400 mb-1", children: ["Orders: ", formatNumber(data.orders)] }), _jsxs("p", { className: `text-sm mb-1 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: ["Net Profit: ", moneyExact(data.profit)] }), _jsxs("p", { className: `text-sm font-medium pt-1 border-t border-slate-800 ${profitPct >= 0 ? "text-purple-400" : "text-rose-400"}`, children: ["Profit Share: ", pct(profitPct)] })] }));
    }
    return null;
};
// --- UI Components ---
function SectionTitle({ title, subtitle }) {
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: title }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: subtitle })] }));
}
function MetricCard({ title, value, detail, trend, icon: Icon }) {
    const up = trend !== "down";
    return (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, className: "h-full", children: _jsx(Card, { className: "min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 h-full flex flex-col justify-between", children: _jsxs(CardContent, { className: "p-5 flex flex-col h-full justify-between", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400", children: title }), _jsx("h3", { className: "mt-2 text-2xl font-semibold text-white", children: value }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: detail })] }), _jsx("div", { className: "rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-200 shrink-0", children: _jsx(Icon, { className: "h-5 w-5" }) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsxs("div", { className: `flex items-center gap-1 text-sm font-medium ${up ? "text-emerald-400" : "text-rose-400"}`, children: [up ? _jsx(ArrowUpRight, { className: "h-4 w-4" }) : _jsx(ArrowDownRight, { className: "h-4 w-4" }), _jsxs("span", { children: [up ? "Positive" : "Negative", " Status"] })] }) })] }) }) }));
}
export default function Profitability() {
    const activeControls = useOutletContext();
    // Determine peak and lowest performance dynamically from data
    const sortedByMargin = [...monthlyData].sort((a, b) => b.margin - a.margin);
    const peakMonth = sortedByMargin[0];
    const lowestMonth = sortedByMargin[sortedByMargin.length - 1];
    return (_jsxs("div", { className: "mx-auto mt-6 flex flex-col min-w-0 max-w-[1600px] gap-6 w-full", children: [_jsx(Card, { className: "min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: _jsx(CardContent, { className: "flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 shrink-0", children: _jsx(TrendingUp, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-slate-500", children: "Business Diagnostics" }), _jsx("h2", { className: "text-xl font-semibold text-white", children: "Profitability Overview" }), _jsx("p", { className: "mt-1 max-w-3xl text-sm text-slate-400", children: "End-to-End full width analysis of profit margins, loss distribution, categorical efficiency, and root cause leakage." })] })] }) }) }), _jsxs("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full items-stretch", children: [_jsx(MetricCard, { title: "Total Profit", value: "$1.47M", detail: "All-time retained earnings", trend: "up", icon: Wallet }), _jsx(MetricCard, { title: "Profit Margin", value: "11.61%", detail: "Overall net profitability", trend: "up", icon: Percent }), _jsx(MetricCard, { title: "Profit Orders", value: formatNumber(38746), detail: "Orders making positive money", trend: "up", icon: BadgeDollarSign }), _jsx(MetricCard, { title: "Loss Orders", value: formatNumber(12544), detail: "Orders executed at a loss", trend: "down", icon: AlertOctagon }), _jsx(MetricCard, { title: "Top Sub-Category", value: "24.24%", detail: "Paper (Highest Margin)", trend: "up", icon: Activity }), _jsx(MetricCard, { title: "Worst Discount", value: "-111%", detail: "Margin on 50%+ clearance", trend: "down", icon: ShieldAlert })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Profit vs Loss Distribution", subtitle: "Proportion of orders generating profit versus operating at a loss" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: profitLossDist, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: 90, outerRadius: 140, paddingAngle: 4, label: ({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`, labelLine: false, children: profitLossDist.map((entry, index) => (_jsx(Cell, { fill: piePalette[index % piePalette.length] }, entry.name))) }), _jsx(Tooltip, { formatter: (value, name) => [formatNumber(Number(value)), name], contentStyle: { background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" } }), _jsx(Legend, { verticalAlign: "bottom", height: 36 })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Monthly Profit Trend", subtitle: "Net profit fluctuation over the multi-year tracking period" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: monthlyData, margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937" }), _jsx(XAxis, { dataKey: "period", stroke: "#94a3b8", tickLine: false, axisLine: false, minTickGap: 30 }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => money(val) }), _jsx(Tooltip, { contentStyle: { background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }, formatter: (val) => moneyExact(val) }), _jsx(Area, { type: "monotone", dataKey: "profit", name: "Net Profit", stroke: "#34d399", fill: "#34d399", fillOpacity: 0.15, strokeWidth: 2 })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Sales & Profit Dual Trend", subtitle: "Mapping topline revenue against bottom-line profitability" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(ComposedChart, { data: monthlyData, margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937" }), _jsx(XAxis, { dataKey: "period", stroke: "#94a3b8", tickLine: false, axisLine: false, minTickGap: 30 }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => money(val) }), _jsx(Tooltip, { contentStyle: { background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }, formatter: (val) => moneyExact(val) }), _jsx(Legend, { verticalAlign: "top", height: 36 }), _jsx(Line, { type: "monotone", dataKey: "sales", name: "Sales Revenue", stroke: "#60a5fa", strokeWidth: 3, dot: false, activeDot: { r: 6 } }), _jsx(Bar, { dataKey: "profit", name: "Net Profit", barSize: 12, fill: "#34d399", opacity: 0.6 })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Monthly Profit Margin (%)", subtitle: "Efficiency health tracking representing margin percent scaling" }) }), _jsx(CardContent, { className: "h-[350px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: monthlyData, margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937", vertical: false }), _jsx(XAxis, { dataKey: "period", stroke: "#94a3b8", tickLine: false, axisLine: false, minTickGap: 30 }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => `${val}%` }), _jsx(Tooltip, { cursor: { fill: "#1e293b" }, content: _jsx(CustomMarginTooltip, {}) }), _jsx(ReferenceLine, { y: 10, stroke: "#cbd5e1", strokeDasharray: "3 3", label: { position: 'insideTopLeft', value: '10% Benchmark', fill: '#cbd5e1', fontSize: 12 } }), _jsx(Line, { type: "monotone", dataKey: "margin", name: "Profit Margin", stroke: "#f59e0b", strokeWidth: 3, dot: false, activeDot: { r: 6 } })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Profit Growth (Month-over-Month %)", subtitle: "Relative percentage change in net profit compared to the immediate prior month" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: monthlyData.slice(1), margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937", vertical: false }), _jsx(XAxis, { dataKey: "period", stroke: "#94a3b8", tickLine: false, axisLine: false, minTickGap: 30 }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => `${val}%` }), _jsx(Tooltip, { cursor: { fill: "#1e293b" }, content: _jsx(GrowthTooltip, {}) }), _jsx(ReferenceLine, { y: 0, stroke: "#cbd5e1", strokeWidth: 2 }), _jsx(Bar, { dataKey: "growth", name: "MoM Profit Growth", radius: [2, 2, 0, 0], children: monthlyData.slice(1).map((entry, index) => (_jsx(Cell, { fill: entry.growth >= 0 ? "#34d399" : "#fb7185" }, `cell-${index}`))) })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Discount Impact on Profitability", subtitle: "Profit margins collapse exponentially at discounts of 20% or higher" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(ComposedChart, { data: discountData, margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937" }), _jsx(XAxis, { dataKey: "band", stroke: "#94a3b8", tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => money(val) }), _jsx(Tooltip, { contentStyle: { background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }, formatter: (val, name) => name === "Margin %" ? pct(val) : moneyExact(val) }), _jsx(ReferenceLine, { y: 0, stroke: "#cbd5e1", strokeWidth: 2 }), _jsx(Bar, { dataKey: "profit", name: "Net Profit", radius: [4, 4, 4, 4], children: discountData.map((entry, index) => (_jsx(Cell, { fill: entry.profit >= 0 ? "#34d399" : "#fb7185", opacity: 0.7 }, `cell-${index}`))) }), _jsx(Line, { type: "monotone", dataKey: "margin", name: "Margin %", stroke: "#f59e0b", strokeWidth: 3, dot: false })] }) }) })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 w-full", children: [_jsx(Card, { className: "rounded-3xl border border-emerald-500/20 bg-emerald-500/10 shadow-2xl shadow-slate-950/40", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-emerald-400", children: "Peak Performance" }), _jsx("h3", { className: "mt-2 text-2xl font-semibold text-white", children: "Best Profit Margin Month" }), _jsx("p", { className: "mt-2 text-xl text-emerald-300 font-medium", children: peakMonth.period }), _jsxs("div", { className: "mt-2 flex gap-4 text-sm text-slate-300", children: [_jsxs("p", { children: ["Margin: ", _jsx("span", { className: "font-semibold text-emerald-400", children: pct(peakMonth.margin) })] }), _jsxs("p", { children: ["Profit: ", _jsx("span", { className: "font-semibold text-white", children: moneyExact(peakMonth.profit) })] })] })] }) }), _jsx(Card, { className: "rounded-3xl border border-rose-500/20 bg-rose-500/10 shadow-2xl shadow-slate-950/40", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-rose-400", children: "Lowest Performance" }), _jsx("h3", { className: "mt-2 text-2xl font-semibold text-white", children: "Worst Profit Margin Month" }), _jsx("p", { className: "mt-2 text-xl text-rose-300 font-medium", children: lowestMonth.period }), _jsxs("div", { className: "mt-2 flex gap-4 text-sm text-slate-300", children: [_jsxs("p", { children: ["Margin: ", _jsx("span", { className: "font-semibold text-rose-400", children: pct(lowestMonth.margin) })] }), _jsxs("p", { children: ["Profit: ", _jsx("span", { className: "font-semibold text-white", children: moneyExact(lowestMonth.profit) })] })] })] }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Profit by Primary Category", subtitle: "Total absolute profitability mapped across core verticals" }) }), _jsx(CardContent, { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: categoryData, dataKey: "profit", nameKey: "name", cx: "50%", cy: "50%", innerRadius: 90, outerRadius: 140, paddingAngle: 3, label: ({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`, labelLine: false, children: categoryData.map((entry, index) => (_jsx(Cell, { fill: catPalette[index % catPalette.length] }, entry.name))) }), _jsx(Tooltip, { content: _jsx(CustomCategoryProfitTooltip, {}) }), _jsx(Legend, { verticalAlign: "bottom", height: 36 })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Profit by Sub-Category", subtitle: "A granular breakdown of profitability across all product segments" }) }), _jsx(CardContent, { className: "h-[450px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: subCategoryData, margin: { top: 20, right: 20, bottom: 60, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937", vertical: false }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8", tickLine: false, axisLine: false, angle: -45, textAnchor: "end" }), _jsx(YAxis, { stroke: "#94a3b8", tickLine: false, axisLine: false, tickFormatter: (val) => money(val) }), _jsx(Tooltip, { cursor: { fill: "#1e293b" }, content: _jsx(CustomSubCategoryProfitTooltip, {}) }), _jsx(ReferenceLine, { y: 0, stroke: "#cbd5e1", strokeWidth: 2 }), _jsx(Bar, { dataKey: "profit", name: "Net Profit", radius: [4, 4, 4, 4], children: subCategoryData.map((entry, index) => (_jsx(Cell, { fill: entry.profit >= 0 ? "#34d399" : "#fb7185" }, `cell-${index}`))) })] }) }) })] }), _jsxs(Card, { className: "min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Profitability Efficiency Matrix", subtitle: "Sub-Categories mapped into 5 diagnostic segments based on absolute sales vs margin percentage" }) }), _jsx(CardContent, { className: "h-[500px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(ScatterChart, { margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1f2937" }), _jsx(XAxis, { type: "number", dataKey: "sales", name: "Sales", stroke: "#94a3b8", tickFormatter: (val) => money(val) }), _jsx(YAxis, { type: "number", dataKey: "margin", name: "Profit Margin (%)", stroke: "#94a3b8", tickFormatter: (val) => `${val}%` }), _jsx(ZAxis, { type: "number", dataKey: "orders", range: [150, 600], name: "Orders" }), _jsx(Tooltip, { cursor: { strokeDasharray: '3 3', stroke: '#cbd5e1' }, content: ({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl", children: [_jsx("p", { className: "font-semibold text-white mb-1", children: data.name }), _jsx("p", { className: "text-sm", style: { color: segmentColors[data.segment] }, children: data.segment }), _jsxs("p", { className: "text-sm text-sky-400 mt-1", children: ["Sales: ", moneyExact(data.sales)] }), _jsxs("p", { className: `text-sm mt-0.5 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: ["Profit Margin: ", pct(data.margin)] })] }));
                                            }
                                            return null;
                                        } }), _jsx(ReferenceLine, { y: 0, stroke: "#cbd5e1" }), _jsx(Scatter, { name: "Segments", data: subCategoryData, children: subCategoryData.map((entry, index) => (_jsx(Cell, { fill: segmentColors[entry.segment], opacity: 0.85 }, `cell-${index}`))) })] }) }) }), _jsx("div", { className: "flex flex-wrap items-center justify-center gap-4 pb-6 border-t border-slate-800/60 mt-4 pt-4", children: Object.entries(segmentColors).map(([name, color]) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: color } }), _jsx("span", { className: "text-sm text-slate-400", children: name })] }, name))) })] }), _jsxs(Card, { className: "min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(SectionTitle, { title: "Strategic Margin Observations", subtitle: "Actionable diagnostic notes generated from the profitability root-cause analysis" }) }), _jsx(CardContent, { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3", children: profitNotes.map((text, idx) => (_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm leading-6 text-slate-300 flex items-start gap-3", children: [_jsx("span", { className: "mt-1 text-emerald-400", children: _jsx(ArrowUpRight, { className: "h-4 w-4" }) }), _jsx("p", { children: text })] }, `note-${idx}`))) })] })] }));
}
