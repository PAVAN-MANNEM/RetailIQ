import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Percent,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardControls, DashboardRole } from "@/layout/DashboardShell";

type Props = {
  role?: DashboardRole;
  controls?: Pick<DashboardControls, "searchQuery" | "timeRange" | "lastUpdated" | "refresh">;
};

type Metric = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  note: string;
};

// --- REAL DATA ARRAYS GENERATED FROM CSVS ---
const monthlyData = [
  { period: 'Jan 2011', sales: 98898.49, profit: 8321.80, orders: 216, margin: 8.41 },
  { period: 'Feb 2011', sales: 91152.16, profit: 12417.91, orders: 183, margin: 13.62 },
  { period: 'Mar 2011', sales: 145729.37, profit: 15303.57, orders: 277, margin: 10.50 },
  { period: 'Apr 2011', sales: 116915.76, profit: 12902.32, orders: 267, margin: 11.04 },
  { period: 'May 2011', sales: 146747.84, profit: 12183.83, orders: 295, margin: 8.30 },
  { period: 'Jun 2011', sales: 215207.38, profit: 23415.25, orders: 468, margin: 10.88 },
  { period: 'Jul 2011', sales: 115510.42, profit: 5585.00, orders: 250, margin: 4.84 },
  { period: 'Aug 2011', sales: 207581.49, profit: 23713.67, orders: 443, margin: 11.42 },
  { period: 'Sep 2011', sales: 290214.46, profit: 35776.88, orders: 527, margin: 12.33 },
  { period: 'Oct 2011', sales: 199071.26, profit: 25963.42, orders: 401, margin: 13.04 },
  { period: 'Nov 2011', sales: 298496.54, profit: 32709.18, orders: 563, margin: 10.96 },
  { period: 'Dec 2011', sales: 333925.73, profit: 40647.98, orders: 620, margin: 12.17 },
  { period: 'Jan 2012', sales: 135780.72, profit: 10401.64, orders: 260, margin: 7.66 },
  { period: 'Feb 2012', sales: 100510.22, profit: 15000.10, orders: 230, margin: 14.92 },
  { period: 'Mar 2012', sales: 163076.77, profit: 17992.92, orders: 337, margin: 11.03 },
  { period: 'Apr 2012', sales: 161052.27, profit: 17366.97, orders: 322, margin: 10.78 },
  { period: 'May 2012', sales: 208364.89, profit: 29876.70, orders: 413, margin: 14.34 },
  { period: 'Jun 2012', sales: 256175.70, profit: 34407.15, orders: 571, margin: 13.43 },
  { period: 'Jul 2012', sales: 145236.79, profit: 15585.39, orders: 324, margin: 10.73 },
  { period: 'Aug 2012', sales: 303142.94, profit: 43573.88, orders: 522, margin: 14.37 },
  { period: 'Sep 2012', sales: 289389.17, profit: 27776.18, orders: 641, margin: 9.60 },
  { period: 'Oct 2012', sales: 252939.85, profit: 30662.88, orders: 499, margin: 12.12 },
  { period: 'Nov 2012', sales: 323512.42, profit: 31820.72, orders: 716, margin: 9.84 },
  { period: 'Dec 2012', sales: 338256.97, profit: 32950.75, orders: 628, margin: 9.74 },
  { period: 'Jan 2013', sales: 199185.91, profit: 26810.56, orders: 345, margin: 13.46 },
  { period: 'Feb 2013', sales: 167239.65, profit: 23762.50, orders: 306, margin: 14.21 },
  { period: 'Mar 2013', sales: 198594.03, profit: 23433.77, orders: 411, margin: 11.80 },
  { period: 'Apr 2013', sales: 177821.32, profit: 19462.04, orders: 394, margin: 10.94 },
  { period: 'May 2013', sales: 260498.56, profit: 28495.69, orders: 522, margin: 10.94 },
  { period: 'Jun 2013', sales: 396519.61, profit: 45478.41, orders: 724, margin: 11.47 },
  { period: 'Jul 2013', sales: 229928.95, profit: 28863.83, orders: 447, margin: 12.55 },
  { period: 'Aug 2013', sales: 326488.79, profit: 31023.67, orders: 692, margin: 9.50 },
  { period: 'Sep 2013', sales: 376619.25, profit: 38905.67, orders: 836, margin: 10.33 },
  { period: 'Oct 2013', sales: 293406.64, profit: 42433.22, orders: 580, margin: 14.46 },
  { period: 'Nov 2013', sales: 373989.36, profit: 48063.00, orders: 789, margin: 12.85 },
  { period: 'Dec 2013', sales: 405454.38, profit: 50202.87, orders: 825, margin: 12.38 },
  { period: 'Jan 2014', sales: 241268.56, profit: 28001.39, orders: 450, margin: 11.61 },
  { period: 'Feb 2014', sales: 184837.36, profit: 19751.70, orders: 385, margin: 10.69 },
  { period: 'Mar 2014', sales: 263100.77, profit: 37357.26, orders: 530, margin: 14.20 },
  { period: 'Apr 2014', sales: 242771.86, profit: 23782.30, orders: 523, margin: 9.80 },
  { period: 'May 2014', sales: 288401.05, profit: 33953.56, orders: 667, margin: 11.77 },
  { period: 'Jun 2014', sales: 401814.06, profit: 43778.60, orders: 899, margin: 10.90 },
  { period: 'Jul 2014', sales: 258705.68, profit: 28035.87, orders: 540, margin: 10.84 },
  { period: 'Aug 2014', sales: 456619.94, profit: 53542.89, orders: 843, margin: 11.73 },
  { period: 'Sep 2014', sales: 481157.24, profit: 67979.45, orders: 1017, margin: 14.13 },
  { period: 'Oct 2014', sales: 422766.63, profit: 58209.83, orders: 810, margin: 13.77 },
  { period: 'Nov 2014', sales: 555279.03, profit: 62856.59, orders: 1077, margin: 11.32 },
  { period: 'Dec 2014', sales: 503143.69, profit: 46916.52, orders: 1093, margin: 9.32 },
];

const discountData = [
  { band: '0-5%', sales: 7253806.57, profit: 1828671.85, margin: 25.21 },
  { band: '5-10%', sales: 1701223.22, profit: 280212.68, margin: 16.47 },
  { band: '10-20%', sales: 1757261.34, profit: 173254.84, margin: 9.86 },
  { band: '20-30%', sales: 382554.69, profit: -21155.61, margin: -5.53 },
  { band: '30-50%', sales: 1176031.43, profit: -380944.82, margin: -32.39 },
  { band: '50%+', sales: 371624.66, profit: -412581.66, margin: -111.02 },
];

const categoryData = [
  { name: 'Technology', sales: 4744557.50, profit: 663778.73, margin: 13.99, orders: 8354 },
  { name: 'Furniture', sales: 4110874.19, profit: 285204.72, margin: 6.94, orders: 8195 },
  { name: 'Office Supplies', sales: 3787070.23, profit: 518473.83, margin: 13.69, orders: 19003 },
];

const subCategoryData = [
  { name: 'Phones', category: 'Technology', sales: 1706824.14, profit: 216717.01, margin: 12.70, segment: 'High Volume, Low Efficiency', cumPercent: 13.50, sharePercent: 13.50 },
  { name: 'Copiers', category: 'Technology', sales: 1509436.27, profit: 258567.55, margin: 17.13, segment: 'Core Winners', cumPercent: 25.44, sharePercent: 11.94 },
  { name: 'Chairs', category: 'Furniture', sales: 1501681.76, profit: 140396.27, margin: 9.35, segment: 'High Volume, Low Efficiency', cumPercent: 37.32, sharePercent: 11.88 },
  { name: 'Bookcases', category: 'Furniture', sales: 1466572.24, profit: 161924.42, margin: 11.04, segment: 'High Volume, Low Efficiency', cumPercent: 48.92, sharePercent: 11.60 },
  { name: 'Storage', category: 'Office Supplies', sales: 1127085.86, profit: 108461.49, margin: 9.62, segment: 'High Volume, Low Efficiency', cumPercent: 57.83, sharePercent: 8.91 },
  { name: 'Appliances', category: 'Office Supplies', sales: 1011064.31, profit: 141680.59, margin: 14.01, segment: 'Core Winners', cumPercent: 65.83, sharePercent: 8.00 },
  { name: 'Machines', category: 'Technology', sales: 779060.07, profit: 58867.87, margin: 7.56, segment: 'High Volume, Low Efficiency', cumPercent: 71.99, sharePercent: 6.16 },
  { name: 'Tables', category: 'Furniture', sales: 757041.92, profit: -64083.39, margin: -8.46, segment: 'Loss Makers', cumPercent: 77.98, sharePercent: 5.99 },
  { name: 'Accessories', category: 'Technology', sales: 749237.02, profit: 129626.31, margin: 17.30, segment: 'Core Winners', cumPercent: 83.91, sharePercent: 5.93 },
  { name: 'Binders', category: 'Office Supplies', sales: 461911.51, profit: 72449.85, margin: 15.68, segment: 'Hidden Gems', cumPercent: 87.56, sharePercent: 3.65 },
  { name: 'Furnishings', category: 'Furniture', sales: 385578.26, profit: 46967.43, margin: 12.18, segment: 'Weak Performer', cumPercent: 90.61, sharePercent: 3.05 },
  { name: 'Art', category: 'Office Supplies', sales: 372091.97, profit: 57953.91, margin: 15.58, segment: 'Hidden Gems', cumPercent: 93.55, sharePercent: 2.94 },
  { name: 'Paper', category: 'Office Supplies', sales: 244291.72, profit: 59207.68, margin: 24.24, segment: 'Hidden Gems', cumPercent: 95.49, sharePercent: 1.94 },
  { name: 'Supplies', category: 'Office Supplies', sales: 243074.22, profit: 22583.26, margin: 9.29, segment: 'Weak Performer', cumPercent: 97.41, sharePercent: 1.92 },
  { name: 'Envelopes', category: 'Office Supplies', sales: 170904.30, profit: 29601.12, margin: 17.32, segment: 'Hidden Gems', cumPercent: 98.76, sharePercent: 1.35 },
  { name: 'Fasteners', category: 'Office Supplies', sales: 83242.32, profit: 11525.42, margin: 13.85, segment: 'Hidden Gems', cumPercent: 99.42, sharePercent: 0.66 },
  { name: 'Labels', category: 'Office Supplies', sales: 73404.03, profit: 15010.51, margin: 20.45, segment: 'Hidden Gems', cumPercent: 100.00, sharePercent: 0.58 },
];

const profitVsLossRaw = [
  { name: 'Profit Making Orders', value: 38746 },
  { name: 'Loss Making Orders', value: 12544 },
];
const totalDist = profitVsLossRaw.reduce((acc, curr) => acc + curr.value, 0);
const profitVsLossDist = profitVsLossRaw.map(d => ({
  ...d,
  percent: (d.value / totalDist) * 100
}));

const topProducts = [
  { name: 'Apple Smart Phone, Full Size', sales: 86935.78, profit: 5921.58, quantity: 171 },
  { name: 'Cisco Smart Phone, Full Size', sales: 76441.53, profit: 17238.52, quantity: 139 },
  { name: 'Motorola Smart Phone, Full Size', sales: 73156.30, profit: 17027.11, quantity: 134 },
  { name: 'Nokia Smart Phone, Full Size', sales: 71904.56, profit: 9938.20, quantity: 147 },
  { name: 'Canon imageCLASS 2200 Advanced Copier', sales: 61599.82, profit: 25199.93, quantity: 20 },
  { name: 'Hon Executive Leather Armchair, Adjustable', sales: 58193.48, profit: 5997.25, quantity: 169 },
  { name: 'Office Star Executive Leather Armchair', sales: 50661.68, profit: 4710.98, quantity: 141 },
  { name: 'Harbour Creations Executive Leather Armchair', sales: 50121.52, profit: 10427.33, quantity: 142 },
  { name: 'Samsung Smart Phone, Cordless', sales: 48653.46, profit: -198.09, quantity: 108 },
  { name: 'Nokia Smart Phone, with Caller ID', sales: 47877.79, profit: 9465.33, quantity: 96 },
];

const riskProducts = [
  { name: 'Cubify CubeX 3D Printer Double Head Print', sales: 11099.96, profit: -8879.97, quantity: 9 },
  { name: 'Lexmark MX611dhe Monochrome Laser Printer', sales: 16829.90, profit: -4589.97, quantity: 18 },
  { name: 'Motorola Smart Phone, Cordless', sales: 38931.04, profit: -4447.04, quantity: 74 },
  { name: 'Cubify CubeX 3D Printer Triple Head Print', sales: 7999.98, profit: -3839.99, quantity: 4 },
  { name: 'Bevis Round Table, Adjustable Height', sales: 5654.80, profit: -3649.89, quantity: 22 },
  { name: 'Bevis Computer Table, Fully Assembled', sales: 11177.90, profit: -3509.56, quantity: 43 },
  { name: 'Rogers Lockers, Blue', sales: 28214.59, profit: -2893.49, quantity: 167 },
  { name: 'Chromcraft Oval Conference Tables', sales: 9917.64, profit: -2876.12, quantity: 27 },
  { name: 'Bevis Wood Table, with Bottom Storage', sales: 11134.66, profit: -2782.59, quantity: 34 },
  { name: 'Lesro Training Table, Rectangular', sales: 2711.65, profit: -2581.28, quantity: 25 },
];

const topCustomers = [
  { id: 'TA-21385', name: 'Tom Ashbrook', sales: 35668.12, profit: 6274.99, margin: 17.59, orders: 25 },
  { id: 'GT-14710', name: 'Greg Tran', sales: 34471.89, profit: 5164.85, margin: 14.98, orders: 30 },
  { id: 'TC-20980', name: 'Tamara Chand', sales: 34218.27, profit: 8787.47, margin: 25.68, orders: 28 },
  { id: 'SM-20320', name: 'Sean Miller', sales: 31125.29, profit: -1083.67, margin: -3.48, orders: 21 },
  { id: 'BW-11110', name: 'Bart Watters', sales: 30613.62, profit: 3337.47, margin: 10.90, orders: 35 },
  { id: 'HL-15040', name: 'Hunter Lopez', sales: 29664.23, profit: 7657.50, margin: 25.81, orders: 20 },
];

const riskCustomers = [
  { id: 'CS-12505', name: 'Cindy Stewart', sales: 11535.25, profit: -6437.37, margin: -55.81, orders: 16 },
  { id: 'DM-3345', name: 'Denise Monton', sales: 4998.42, profit: -5474.61, margin: -109.53, orders: 6 },
  { id: 'GT-14635', name: 'Grant Thornton', sales: 19080.35, profit: -3790.08, margin: -19.86, orders: 20 },
  { id: 'LF-17185', name: 'Luke Foster', sales: 12864.72, profit: -3700.20, margin: -28.76, orders: 22 },
  { id: 'MT-8070', name: 'Michelle Tran', sales: 6851.92, profit: -2991.62, margin: -43.66, orders: 7 },
  { id: 'JF-5355', name: 'Jay Fein', sales: 3475.76, profit: -2891.35, margin: -83.19, orders: 9 },
];

const kpis: Metric[] = [
  { title: "Total Sales", value: "$12.64M", change: "All-time revenue", trend: "up", icon: Wallet, note: "25,035 orders" },
  { title: "Total Profit", value: "$1.47M", change: "Overall profit", trend: "up", icon: TrendingUp, note: "11.61% margin" },
  { title: "Profit Margin", value: "11.61%", change: "Healthy margin", trend: "up", icon: Percent, note: "Impacted by discounts" },
  { title: "Total Orders", value: "25,035", change: "Transaction volume", trend: "up", icon: ShoppingCart, note: "Total processed" },
  { title: "Customers", value: "1,590", change: "Active base", trend: "up", icon: Users, note: "Total unique buyers" },
  { title: "Avg Order Value", value: "$504.99", change: "Per basket", trend: "up", icon: BarChart3, note: "Average spend" },
];

const palette = ["#34d399", "#fb7185"]; // Profit Making (Green), Loss Making (Red)
const catPalette = ["#60a5fa", "#a78bfa", "#f59e0b"]; // Categories Donut Colors

const segmentColors: Record<string, string> = {
  "High Volume, Low Efficiency": "#f59e0b",
  "Core Winners": "#34d399",
  "Loss Makers": "#fb7185",
  "Hidden Gems": "#60a5fa",
  "Weak Performer": "#a78bfa"
};

// --- FORMATTERS ---
function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatCurrencyExact(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

// --- COMPONENTS ---
function StatPill({ label, value, tone = "slate" }: { label: string; value: string; tone?: "slate" | "emerald" | "amber" | "rose" }) {
  const toneClass = {
    slate: "border-slate-800 bg-slate-950 text-slate-200",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    rose: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  }[tone];

  return (
    <div className={`rounded-2xl border px-4 py-3 h-full flex flex-col justify-center ${toneClass}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon: Icon, note }: Metric) {
  const up = trend === "up";
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full h-full flex flex-col justify-between">
        <CardContent className="p-5 flex flex-col h-full justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{value}</h3>
              <p className="mt-1 text-sm text-slate-400">{note}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-200 shrink-0">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className={`flex items-center gap-1 text-sm font-medium ${up ? "text-emerald-400" : "text-rose-400"}`}>
              {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{change}</span>
            </div>
            <Badge variant="secondary" className="rounded-full border border-slate-800 bg-slate-900 text-slate-300">Live</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

// --- CUSTOM TOOLTIPS ---
const CustomSalesTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.period}</p>
        <p className="text-sm text-amber-400">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-sky-400 mt-0.5">Sales: {formatCurrencyExact(data.sales)}</p>
      </div>
    );
  }
  return null;
};

const CustomSalesProfitTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.period}</p>
        <p className="text-sm text-amber-400">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-sky-400 mt-0.5">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className={`text-sm mt-0.5 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>Profit: {formatCurrencyExact(data.profit)}</p>
      </div>
    );
  }
  return null;
};

const CustomMarginTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = data.margin >= 10 ? "text-emerald-400" : data.margin >= 5 ? "text-amber-400" : "text-rose-400";
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.period}</p>
        <p className={`text-sm font-medium ${color}`}>Margin: {formatPercent(data.margin)}</p>
      </div>
    );
  }
  return null;
};

const CustomDiscountTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">Discount Band: {data.band}</p>
        <p className="text-sm text-sky-400">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className={`text-sm mt-0.5 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>Profit: {formatCurrencyExact(data.profit)}</p>
        <p className={`text-sm mt-0.5 font-medium ${data.margin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>Margin: {formatPercent(data.margin)}</p>
      </div>
    );
  }
  return null;
};

const CustomCategoryTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percent = (payload[0].value / categoryData.reduce((a, c) => a + c.sales, 0)) * 100;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-sm text-sky-400">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className="text-sm text-amber-400 mt-0.5">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-emerald-400 mt-0.5">Share: {percent.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const CustomMatrixTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-sm" style={{ color: segmentColors[data.segment] }}>{data.segment}</p>
        <p className="text-sm text-sky-400 mt-1">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className={`text-sm mt-0.5 ${data.margin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>Margin: {formatPercent(data.margin)}</p>
      </div>
    );
  }
  return null;
};

const CustomParetoTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((item: any) => {
          if (item.dataKey === 'sales') {
            return (
              <div key={item.dataKey}>
                <p className="text-sm text-sky-400">Sales: {formatCurrencyExact(item.value)}</p>
                <p className="text-sm text-sky-400 mt-0.5">Share of Total: {formatPercent(data.sharePercent)}</p>
              </div>
            );
          }
          if (item.dataKey === 'cumPercent') {
            return <p key={item.dataKey} className="text-sm text-amber-400 mt-1 font-medium">Cumulative Share: {formatPercent(item.value)}</p>;
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

export default function ExecutiveDashboard() {

  return (
    <div className="mx-auto mt-6 grid max-w-[1600px] gap-6 grid-cols-1">
      {/* 1. Header Block */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-lg shadow-sky-500/20 shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Realtime overview</p>
              <h2 className="text-xl font-semibold text-white">Executive Dashboard</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                End-to-End full width strategic view from January 2011 to December 2014.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. KPIs List */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full items-stretch">
        {kpis.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </section>

      {/* 3. Sales Trend */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Sales Trend (Jan 2011 - Dec 2014)" subtitle="Total revenue timeline tracked month-over-month" />
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip content={<CustomSalesTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="sales" name="Sales" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4. Sales & Profit Trend */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Sales & Profit Dual Trend" subtitle="Observing profit fluctuations scaled alongside top-line sales volume" />
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatNumber(val)} />
              <Tooltip content={<CustomSalesProfitTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#cbd5e1" }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="sales" name="Sales Revenue" stroke="#60a5fa" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="profit" name="Net Profit" stroke="#34d399" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Profit vs Loss Distribution */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Profit vs Loss Order Distribution" subtitle="Share of transaction volume operating under a loss" />
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={profitVsLossDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={140} paddingAngle={4}>
                {profitVsLossDist.map((entry, index) => (
                  <Cell key={entry.name} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${formatNumber(Number(value))} orders`, String(name) ]}
                contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Monthly Profit Margin */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Monthly Profit Margin (%)" subtitle="Efficiency health tracking over time (Green: >10%, Orange: 5-10%, Red: <5%)" />
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<CustomMarginTooltip />} />
              <Bar dataKey="margin" name="Profit Margin (%)" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, index) => {
                  let color = "#ef4444"; // Red
                  if (entry.margin >= 10) color = "#34d399"; // Green
                  else if (entry.margin >= 5) color = "#f59e0b"; // Orange
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 7. Discount Vs Profit Graph */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Discount Impact on Profitability" subtitle="Profit heavily cascades negatively in high-discount bands" />
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={discountData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="band" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<CustomDiscountTooltip />} />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
              <Bar dataKey="profit" name="Net Profit" radius={[4, 4, 4, 4]}>
                {discountData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? "#34d399" : "#fb7185"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 8. Sales by Category (Donut Chart) */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales by Primary Category" subtitle="Top-level categorical revenue distribution" />
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="sales" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                innerRadius={90} 
                outerRadius={140} 
                paddingAngle={3}
                label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={catPalette[index % catPalette.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomCategoryTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 9. Profitability Efficiency Matrix */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Profitability Efficiency Matrix" subtitle="Sub-Categories mapped by 5 tactical segments based on sales volume and profit margin" />
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" dataKey="sales" name="Sales" stroke="#94a3b8" tickFormatter={(val) => formatCurrency(val)} />
              <YAxis type="number" dataKey="margin" name="Profit Margin (%)" stroke="#94a3b8" tickFormatter={(val) => `${val}%`} />
              {/* Expanding ZAxis scales the bubbles drastically dependent on volume */}
              <ZAxis type="number" dataKey="sales" range={[200, 1000]} /> 
              <Tooltip content={<CustomMatrixTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} />
              <ReferenceLine y={0} stroke="#cbd5e1" />
              <Scatter name="Sub-Categories" data={subCategoryData}>
                {subCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={segmentColors[entry.segment]} opacity={0.85} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
        {/* Matrix Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 pb-6 border-t border-slate-800/60 mt-4 pt-4">
          {Object.entries(segmentColors).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-slate-400">{name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 10. Pareto Analysis */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Pareto Analysis (Sub-Category)" subtitle="Top-down contribution to 100% of revenue pipeline. Top 80% contributors are highlighted." />
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={subCategoryData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} angle={-30} textAnchor="end" height={60} />
              <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<CustomParetoTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Bar yAxisId="left" dataKey="sales" name="Sales Revenue" radius={[4, 4, 0, 0]}>
                {subCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cumPercent <= 80 ? "#60a5fa" : "#334155"} />
                ))}
              </Bar>
              <Line yAxisId="right" dataKey="cumPercent" name="Cumulative %" type="monotone" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              <ReferenceLine yAxisId="right" y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: '80% Threshold', fill: '#ef4444', fontSize: 12 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 11. Top Products */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Top Products" subtitle="Highest grossing SKUs across the network" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topProducts.map((item, index) => (
            <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-400">Top Revenue Contributor</p>
                </div>
                <Badge variant="secondary" className="rounded-full border border-slate-800 bg-slate-950 text-slate-300">#{index + 1}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                <StatPill label="Sales" value={formatCurrency(item.sales)} />
                <StatPill label="Profit" value={formatCurrency(item.profit)} tone="emerald" />
                <StatPill label="Orders" value={formatNumber(item.quantity)} tone="amber" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 12. At-risk Products */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="At-Risk Products" subtitle="Underperformers suffering from deepest overall losses" />
        </CardHeader>
        <CardContent className="space-y-3">
          {riskProducts.map((item) => (
            <div key={item.name} className="rounded-2xl border border-rose-500/15 bg-rose-500/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-rose-200/70">Needs strict attention & pricing review</p>
                </div>
                <Badge className="rounded-full bg-rose-500/15 text-rose-300 hover:bg-rose-500/15">Risk Alert</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                <StatPill label="Sales" value={formatCurrency(item.sales)} />
                <StatPill label="Profit" value={formatCurrency(item.profit)} tone="rose" />
                <StatPill label="Orders" value={formatNumber(item.quantity)} tone="amber" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 13. Top Customers */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Top Customers" subtitle="Core champions contributing massive lifetime value" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topCustomers.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-400">Account ID: {item.id}</p>
                </div>
                <Badge variant="secondary" className="rounded-full border border-slate-800 bg-slate-950 text-slate-300">Top {index + 1}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
                <StatPill label="Sales" value={formatCurrency(item.sales)} />
                <StatPill label="Profit" value={formatCurrency(item.profit)} tone={item.profit > 0 ? "emerald" : "rose"} />
                <StatPill label="Margin %" value={formatPercent(item.margin)} tone={item.profit > 0 ? "emerald" : "rose"} />
                <StatPill label="Orders" value={formatNumber(item.orders)} tone="amber" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 14. At-risk Customers */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="At-Risk Customers" subtitle="Major loss centers due to high discounts & structural issues" />
        </CardHeader>
        <CardContent className="space-y-3">
          {riskCustomers.map((item) => (
            <div key={item.id} className="rounded-2xl border border-rose-500/15 bg-rose-500/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-rose-200/70">Account ID: {item.id}</p>
                </div>
                <Badge className="rounded-full bg-rose-500/15 text-rose-300 hover:bg-rose-500/15">Negative Margin</Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
                <StatPill label="Sales" value={formatCurrency(item.sales)} />
                <StatPill label="Profit" value={formatCurrency(item.profit)} tone="rose" />
                <StatPill label="Margin %" value={formatPercent(item.margin)} tone="rose" />
                <StatPill label="Orders" value={formatNumber(item.orders)} tone="amber" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
    </div>
  );
}