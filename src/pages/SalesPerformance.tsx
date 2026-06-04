import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Percent,
  Sparkles,
  TrendingUp,
  Wallet,
  BarChart3,
  ShoppingCart,
  Package,
  ArrowDownUp,
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardControls, DashboardRole } from "@/layout/DashboardShell";

// --- TOTALS FOR CALCULATIONS ---
const TOTAL_SALES = 12642501.91;

// --- DATA ARRAYS FROM CSVS ---
const orderValueDist = [
  {"band": "0-100", "orders": 8388, "sales": 364602.73, "aov": 43.47, "orderShare": 33.51, "salesShare": 2.88}, 
  {"band": "101-250", "orders": 5186, "sales": 855064.81, "aov": 164.88, "orderShare": 20.71, "salesShare": 6.76}, 
  {"band": "251-500", "orders": 4038, "sales": 1449157.89, "aov": 358.88, "orderShare": 16.13, "salesShare": 11.46}, 
  {"band": "501-1000", "orders": 3752, "sales": 2676237.67, "aov": 713.28, "orderShare": 14.99, "salesShare": 21.17}, 
  {"band": "1000+", "orders": 3671, "sales": 7297438.79, "aov": 1987.86, "orderShare": 14.66, "salesShare": 57.72}
];

const purchaseQtyDist = [
  {"band": "1", "orders": 2149, "sales": 167850.70, "quantity": 2149, "avgQty": 1.0, "orderShare": 8.58, "qtyShare": 1.21}, 
  {"band": "2", "orders": 3461, "sales": 523369.59, "quantity": 6922, "avgQty": 2.0, "orderShare": 13.82, "qtyShare": 3.88}, 
  {"band": "3", "orders": 2957, "sales": 612325.68, "quantity": 8871, "avgQty": 3.0, "orderShare": 11.81, "qtyShare": 4.97}, 
  {"band": "4-5", "orders": 4401, "sales": 1405247.84, "quantity": 19715, "avgQty": 4.48, "orderShare": 17.58, "qtyShare": 11.06}, 
  {"band": "6-10", "orders": 6766, "sales": 3678656.90, "quantity": 52195, "avgQty": 7.71, "orderShare": 27.03, "qtyShare": 29.27}, 
  {"band": "10+", "orders": 5301, "sales": 6255051.17, "quantity": 88460, "avgQty": 16.69, "orderShare": 21.17, "qtyShare": 49.61}
];

const monthlyData = [
  {"period": "Jan 2011", "date": "2011-01", "sales": 98898.48, "orders": 216, "profit": 8321.80, "margin": 8.41, "growth": 0}, 
  {"period": "Feb 2011", "date": "2011-02", "sales": 91152.15, "orders": 183, "profit": 12417.90, "margin": 13.62, "growth": -7.83}, 
  {"period": "Mar 2011", "date": "2011-03", "sales": 145729.36, "orders": 277, "profit": 15303.56, "margin": 10.50, "growth": 59.87}, 
  {"period": "Apr 2011", "date": "2011-04", "sales": 116915.76, "orders": 267, "profit": 12902.32, "margin": 11.03, "growth": -19.77}, 
  {"period": "May 2011", "date": "2011-05", "sales": 146747.83, "orders": 295, "profit": 12183.82, "margin": 8.30, "growth": 25.52}, 
  {"period": "Jun 2011", "date": "2011-06", "sales": 215207.38, "orders": 468, "profit": 23415.24, "margin": 10.88, "growth": 46.65}, 
  {"period": "Jul 2011", "date": "2011-07", "sales": 115510.41, "orders": 250, "profit": 5585.00, "margin": 4.83, "growth": -46.33}, 
  {"period": "Aug 2011", "date": "2011-08", "sales": 207581.49, "orders": 443, "profit": 23713.66, "margin": 11.42, "growth": 79.71}, 
  {"period": "Sep 2011", "date": "2011-09", "sales": 290214.45, "orders": 527, "profit": 35776.88, "margin": 12.32, "growth": 39.81}, 
  {"period": "Oct 2011", "date": "2011-10", "sales": 199071.26, "orders": 401, "profit": 25963.41, "margin": 13.04, "growth": -31.41}, 
  {"period": "Nov 2011", "date": "2011-11", "sales": 298496.53, "orders": 563, "profit": 32709.17, "margin": 10.95, "growth": 49.94}, 
  {"period": "Dec 2011", "date": "2011-12", "sales": 333925.73, "orders": 620, "profit": 40647.98, "margin": 12.17, "growth": 11.87}, 
  {"period": "Jan 2012", "date": "2012-01", "sales": 135780.72, "orders": 260, "profit": 10401.63, "margin": 7.66, "growth": -59.34}, 
  {"period": "Feb 2012", "date": "2012-02", "sales": 100510.21, "orders": 230, "profit": 15000.09, "margin": 14.92, "growth": -25.98}, 
  {"period": "Mar 2012", "date": "2012-03", "sales": 163076.77, "orders": 337, "profit": 17992.91, "margin": 11.03, "growth": 62.25}, 
  {"period": "Apr 2012", "date": "2012-04", "sales": 161052.26, "orders": 322, "profit": 17366.96, "margin": 10.78, "growth": -1.24}, 
  {"period": "May 2012", "date": "2012-05", "sales": 208364.89, "orders": 413, "profit": 29876.70, "margin": 14.33, "growth": 29.38}, 
  {"period": "Jun 2012", "date": "2012-06", "sales": 256175.69, "orders": 571, "profit": 34407.15, "margin": 13.43, "growth": 22.95}, 
  {"period": "Jul 2012", "date": "2012-07", "sales": 145236.78, "orders": 324, "profit": 15585.38, "margin": 10.73, "growth": -43.31}, 
  {"period": "Aug 2012", "date": "2012-08", "sales": 303142.94, "orders": 522, "profit": 43573.87, "margin": 14.37, "growth": 108.72}, 
  {"period": "Sep 2012", "date": "2012-09", "sales": 289389.16, "orders": 641, "profit": 27776.18, "margin": 9.59, "growth": -4.54}, 
  {"period": "Oct 2012", "date": "2012-10", "sales": 252939.85, "orders": 499, "profit": 30662.88, "margin": 12.12, "growth": -12.6}, 
  {"period": "Nov 2012", "date": "2012-11", "sales": 323512.41, "orders": 716, "profit": 31820.72, "margin": 9.83, "growth": 27.9}, 
  {"period": "Dec 2012", "date": "2012-12", "sales": 338256.96, "orders": 628, "profit": 32950.75, "margin": 9.74, "growth": 4.56}, 
  {"period": "Jan 2013", "date": "2013-01", "sales": 199185.90, "orders": 345, "profit": 26810.55, "margin": 13.46, "growth": -41.11}, 
  {"period": "Feb 2013", "date": "2013-02", "sales": 167239.65, "orders": 306, "profit": 23762.49, "margin": 14.20, "growth": -16.04}, 
  {"period": "Mar 2013", "date": "2013-03", "sales": 198594.03, "orders": 411, "profit": 23433.77, "margin": 11.79, "growth": 18.75}, 
  {"period": "Apr 2013", "date": "2013-04", "sales": 177821.31, "orders": 394, "profit": 19462.03, "margin": 10.94, "growth": -10.46}, 
  {"period": "May 2013", "date": "2013-05", "sales": 260498.56, "orders": 522, "profit": 28495.69, "margin": 10.93, "growth": 46.49}, 
  {"period": "Jun 2013", "date": "2013-06", "sales": 396519.61, "orders": 724, "profit": 45478.41, "margin": 11.46, "growth": 52.22}, 
  {"period": "Jul 2013", "date": "2013-07", "sales": 229928.95, "orders": 447, "profit": 28863.82, "margin": 12.55, "growth": -42.01}, 
  {"period": "Aug 2013", "date": "2013-08", "sales": 326488.78, "orders": 692, "profit": 31023.66, "margin": 9.50, "growth": 42.0}, 
  {"period": "Sep 2013", "date": "2013-09", "sales": 376619.24, "orders": 836, "profit": 38905.66, "margin": 10.33, "growth": 15.35}, 
  {"period": "Oct 2013", "date": "2013-10", "sales": 293406.64, "orders": 580, "profit": 42433.22, "margin": 14.46, "growth": -22.09}, 
  {"period": "Nov 2013", "date": "2013-11", "sales": 373989.36, "orders": 789, "profit": 48062.99, "margin": 12.85, "growth": 27.46}, 
  {"period": "Dec 2013", "date": "2013-12", "sales": 405454.37, "orders": 825, "profit": 50202.87, "margin": 12.38, "growth": 8.41}, 
  {"period": "Jan 2014", "date": "2014-01", "sales": 241268.55, "orders": 450, "profit": 28001.38, "margin": 11.60, "growth": -40.49}, 
  {"period": "Feb 2014", "date": "2014-02", "sales": 184837.35, "orders": 385, "profit": 19751.69, "margin": 10.68, "growth": -23.39}, 
  {"period": "Mar 2014", "date": "2014-03", "sales": 263100.77, "orders": 530, "profit": 37357.26, "margin": 14.19, "growth": 42.34}, 
  {"period": "Apr 2014", "date": "2014-04", "sales": 242771.86, "orders": 523, "profit": 23782.30, "margin": 9.79, "growth": -7.73}, 
  {"period": "May 2014", "date": "2014-05", "sales": 288401.04, "orders": 667, "profit": 33953.55, "margin": 11.77, "growth": 18.8}, 
  {"period": "Jun 2014", "date": "2014-06", "sales": 401814.06, "orders": 899, "profit": 43778.60, "margin": 10.89, "growth": 39.32}, 
  {"period": "Jul 2014", "date": "2014-07", "sales": 258705.68, "orders": 540, "profit": 28035.87, "margin": 10.83, "growth": -35.62}, 
  {"period": "Aug 2014", "date": "2014-08", "sales": 456619.94, "orders": 843, "profit": 53542.89, "margin": 11.72, "growth": 76.5}, 
  {"period": "Sep 2014", "date": "2014-09", "sales": 481157.24, "orders": 1017, "profit": 67979.45, "margin": 14.12, "growth": 5.37}, 
  {"period": "Oct 2014", "date": "2014-10", "sales": 422766.62, "orders": 810, "profit": 58209.83, "margin": 13.76, "growth": -12.14}, 
  {"period": "Nov 2014", "date": "2014-11", "sales": 555279.02, "orders": 1077, "profit": 62856.58, "margin": 11.31, "growth": 31.34}, 
  {"period": "Dec 2014", "date": "2014-12", "sales": 503143.69, "orders": 1093, "profit": 46916.52, "margin": 9.32, "growth": -9.39}
];

const seasonalityData = [
  {"month": "Jan", "avgSales": 168783.41}, {"month": "Feb", "avgSales": 135934.84}, 
  {"month": "Mar", "avgSales": 192625.23}, {"month": "Apr", "avgSales": 174640.30}, 
  {"month": "May", "avgSales": 226003.08}, {"month": "Jun", "avgSales": 317429.18}, 
  {"month": "Jul", "avgSales": 187345.45}, {"month": "Aug", "avgSales": 323458.29}, 
  {"month": "Sep", "avgSales": 359345.02}, {"month": "Oct", "avgSales": 292046.09}, 
  {"month": "Nov", "avgSales": 387819.33}, {"month": "Dec", "avgSales": 395195.19}
];

const yearlyData = [
  {"year": "2011", "sales": 2259450.89, "growth": 0}, 
  {"year": "2012", "sales": 2677438.69, "growth": 18.49}, 
  {"year": "2013", "sales": 3405746.44, "growth": 27.20}, 
  {"year": "2014", "sales": 4299865.87, "growth": 26.25}
];

const heatmapData = [
  {"year": "2011", "month": "Jan", "sales": 98898.48}, {"year": "2011", "month": "Feb", "sales": 91152.15}, {"year": "2011", "month": "Mar", "sales": 145729.36}, {"year": "2011", "month": "Apr", "sales": 116915.76}, {"year": "2011", "month": "May", "sales": 146747.83}, {"year": "2011", "month": "Jun", "sales": 215207.38}, {"year": "2011", "month": "Jul", "sales": 115510.41}, {"year": "2011", "month": "Aug", "sales": 207581.49}, {"year": "2011", "month": "Sep", "sales": 290214.45}, {"year": "2011", "month": "Oct", "sales": 199071.26}, {"year": "2011", "month": "Nov", "sales": 298496.53}, {"year": "2011", "month": "Dec", "sales": 333925.73}, 
  {"year": "2012", "month": "Jan", "sales": 135780.72}, {"year": "2012", "month": "Feb", "sales": 100510.21}, {"year": "2012", "month": "Mar", "sales": 163076.77}, {"year": "2012", "month": "Apr", "sales": 161052.26}, {"year": "2012", "month": "May", "sales": 208364.89}, {"year": "2012", "month": "Jun", "sales": 256175.69}, {"year": "2012", "month": "Jul", "sales": 145236.78}, {"year": "2012", "month": "Aug", "sales": 303142.94}, {"year": "2012", "month": "Sep", "sales": 289389.16}, {"year": "2012", "month": "Oct", "sales": 252939.85}, {"year": "2012", "month": "Nov", "sales": 323512.41}, {"year": "2012", "month": "Dec", "sales": 338256.96}, 
  {"year": "2013", "month": "Jan", "sales": 199185.90}, {"year": "2013", "month": "Feb", "sales": 167239.65}, {"year": "2013", "month": "Mar", "sales": 198594.03}, {"year": "2013", "month": "Apr", "sales": 177821.31}, {"year": "2013", "month": "May", "sales": 260498.56}, {"year": "2013", "month": "Jun", "sales": 396519.61}, {"year": "2013", "month": "Jul", "sales": 229928.95}, {"year": "2013", "month": "Aug", "sales": 326488.78}, {"year": "2013", "month": "Sep", "sales": 376619.24}, {"year": "2013", "month": "Oct", "sales": 293406.64}, {"year": "2013", "month": "Nov", "sales": 373989.36}, {"year": "2013", "month": "Dec", "sales": 405454.37}, 
  {"year": "2014", "month": "Jan", "sales": 241268.55}, {"year": "2014", "month": "Feb", "sales": 184837.35}, {"year": "2014", "month": "Mar", "sales": 263100.77}, {"year": "2014", "month": "Apr", "sales": 242771.86}, {"year": "2014", "month": "May", "sales": 288401.04}, {"year": "2014", "month": "Jun", "sales": 401814.06}, {"year": "2014", "month": "Jul", "sales": 258705.68}, {"year": "2014", "month": "Aug", "sales": 456619.94}, {"year": "2014", "month": "Sep", "sales": 481157.24}, {"year": "2014", "month": "Oct", "sales": 422766.62}, {"year": "2014", "month": "Nov", "sales": 555279.02}, {"year": "2014", "month": "Dec", "sales": 503143.69}
];

const weekdayData = [
  {"day": "Monday", "sales": 2235913.41, "orders": 4614, "aov": 484.59, "share": 17.69}, 
  {"day": "Tuesday", "sales": 2268417.17, "orders": 4632, "aov": 489.73, "share": 17.94}, 
  {"day": "Wednesday", "sales": 2169218.45, "orders": 4537, "aov": 478.12, "share": 17.16}, 
  {"day": "Thursday", "sales": 2245836.63, "orders": 4433, "aov": 506.62, "share": 17.76}, 
  {"day": "Friday", "sales": 2322847.86, "orders": 4608, "aov": 504.09, "share": 18.37}, 
  {"day": "Saturday", "sales": 1177963.89, "orders": 2323, "aov": 507.09, "share": 9.32}, 
  {"day": "Sunday", "sales": 222304.46, "orders": 482, "aov": 461.21, "share": 1.76}
];

const categoryData = [
  {"name": "Technology", "sales": 4744557.49, "profit": 663778.73, "orders": 8354, "margin": 13.99}, 
  {"name": "Furniture", "sales": 4110874.18, "profit": 285204.72, "orders": 8195, "margin": 6.93}, 
  {"name": "Office Supplies", "sales": 3787070.22, "profit": 518473.83, "orders": 19003, "margin": 13.69}
];

const subCategoryData = [
  {"name": "Phones", "sales": 1706824.13, "profit": 216717.00, "orders": 3133, "margin": 12.7}, 
  {"name": "Copiers", "sales": 1509436.27, "profit": 258567.54, "orders": 2120, "margin": 17.13}, 
  {"name": "Chairs", "sales": 1501681.76, "profit": 140396.26, "orders": 3187, "margin": 9.35}, 
  {"name": "Bookcases", "sales": 1466572.24, "profit": 161924.41, "orders": 2284, "margin": 11.04}, 
  {"name": "Storage", "sales": 1127085.86, "profit": 108461.48, "orders": 4534, "margin": 9.62}, 
  {"name": "Appliances", "sales": 1011064.30, "profit": 141680.58, "orders": 1686, "margin": 14.01}, 
  {"name": "Machines", "sales": 779060.06, "profit": 58867.87, "orders": 1422, "margin": 7.56}, 
  {"name": "Tables", "sales": 757041.92, "profit": -64083.38, "orders": 836, "margin": -8.46}, 
  {"name": "Accessories", "sales": 749237.01, "profit": 129626.30, "orders": 2889, "margin": 17.3}, 
  {"name": "Binders", "sales": 461911.50, "profit": 72449.84, "orders": 5392, "margin": 15.68}, 
  {"name": "Furnishings", "sales": 385578.25, "profit": 46967.42, "orders": 2965, "margin": 12.18}, 
  {"name": "Art", "sales": 372091.96, "profit": 57953.91, "orders": 4366, "margin": 15.58}, 
  {"name": "Paper", "sales": 244291.71, "profit": 59207.68, "orders": 3234, "margin": 24.24}, 
  {"name": "Supplies", "sales": 243074.22, "profit": 22583.26, "orders": 2281, "margin": 9.29}, 
  {"name": "Envelopes", "sales": 170904.30, "profit": 29601.11, "orders": 2310, "margin": 17.32}, 
  {"name": "Fasteners", "sales": 83242.31, "profit": 11525.42, "orders": 2304, "margin": 13.85}, 
  {"name": "Labels", "sales": 73404.03, "profit": 15010.51, "orders": 2460, "margin": 20.45}
];

const shipModeData = [
  {"mode": "Standard Class", "sales": 7578652.10, "profit": 890596.02, "orders": 15154, "margin": 11.75}, 
  {"mode": "Second Class", "sales": 2565671.68, "profit": 292583.52, "orders": 5119, "margin": 11.40}, 
  {"mode": "First Class", "sales": 1830976.13, "profit": 208104.67, "orders": 3821, "margin": 11.36}, 
  {"mode": "Same Day", "sales": 667201.98, "profit": 76173.06, "orders": 1347, "margin": 11.41}
];

const notesList = [
  "Total sales reached $12.64M over the tracking period, with a robust 11.61% overall profit margin.",
  "December marks the strongest and most profitable month across the calendar consistently, driving heavy Q4 revenue.",
  "Standard Class shipping handles roughly 60% of volume, suggesting customers prioritize free/cheap delivery over speed.",
  "Orders exceeding $1000 generate 57% of total sales despite only accounting for 14.6% of order volume.",
  "Heavy discounts (30%+) drive traffic but inflict deep negative margins. Profitability cascades drastically past 20% discounts.",
  "Sub-Categories like Tables and Machines are underperforming and suppressing total organizational margins."
];

const catPalette = ["#60a5fa", "#a78bfa", "#f59e0b"]; // Donut Colors
const shipPalette = ["#34d399", "#f472b6", "#fbbf24", "#38bdf8"]; // Ship Mode Colors

// --- FORMATTERS ---
function formatCurrency(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
function formatCurrencyExact(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value); }
function formatNumber(value: number) { return new Intl.NumberFormat("en-US").format(value); }
function formatPercent(value: number) { return `${value.toFixed(2)}%`; }

type Props = {
  role?: DashboardRole;
  controls?: Pick<DashboardControls, "searchQuery" | "timeRange" | "lastUpdated" | "refresh">;
};

// --- CUSTOM TOOLTIPS ---
const BasicSalesTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{label || data.band || data.period || data.day || data.month}</p>
        {data.orders && <p className="text-sm text-amber-400">Orders: {formatNumber(data.orders)}</p>}
        {data.sales && <p className="text-sm text-sky-400">Sales: {formatCurrencyExact(data.sales)}</p>}
      </div>
    );
  }
  return null;
};

const GrowthTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = data.growth >= 0 ? "text-emerald-400" : "text-rose-400";
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{label || data.year || data.period}</p>
        <p className="text-sm text-sky-400">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className={`text-sm mt-0.5 font-medium ${color}`}>Growth: {formatPercent(data.growth)}</p>
      </div>
    );
  }
  return null;
};

const CustomCategoryTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pct = (data.sales / TOTAL_SALES) * 100;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-sm text-amber-400 mt-1">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-sky-400 mt-0.5">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className="text-sm text-emerald-400 mt-0.5">Share: {formatPercent(pct)}</p>
      </div>
    );
  }
  return null;
};

const CustomSubCategoryTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pct = (data.sales / TOTAL_SALES) * 100;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-sm text-amber-400 mt-1">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-sky-400 mt-0.5">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className="text-sm text-emerald-400 mt-0.5">Share: {formatPercent(pct)}</p>
      </div>
    );
  }
  return null;
};

const CustomShipModeTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pct = (data.sales / TOTAL_SALES) * 100;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.mode}</p>
        <p className="text-sm text-amber-400 mt-1">Orders: {formatNumber(data.orders)}</p>
        <p className="text-sm text-sky-400 mt-0.5">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className="text-sm text-emerald-400 mt-0.5">Share: {formatPercent(pct)}</p>
      </div>
    );
  }
  return null;
};

const SubCatScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-sm text-sky-400 mt-1">Sales: {formatCurrencyExact(data.sales)}</p>
        <p className={`text-sm mt-0.5 ${data.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>Profit: {formatCurrencyExact(data.profit)}</p>
        <p className="text-sm text-slate-400 mt-0.5">Orders: {formatNumber(data.orders)}</p>
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
              <h3 className="mt-2 text-xl font-semibold text-white">{value}</h3>
              <p className="mt-1 text-sm text-slate-400">{detail}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-200 shrink-0">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className={`flex items-center gap-1 text-sm font-medium ${up ? "text-emerald-400" : "text-rose-400"}`}>
              {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{up ? "Positive" : "Negative"} Trend</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SalesPerformance(props: Props) {

  // State & Data hooks for Month Rankings
  const [sortDesc, setSortDesc] = useState(true);
  const bestMonth = [...monthlyData].sort((a, b) => b.sales - a.sales)[0];
  const worstMonth = [...monthlyData].sort((a, b) => a.sales - b.sales)[0];

  const sortedMonthsList = useMemo(() => {
    return [...monthlyData].sort((a, b) => sortDesc ? b.sales - a.sales : a.sales - b.sales);
  }, [sortDesc]);

  return (
    <div className="mx-auto mt-6 flex flex-col min-w-0 max-w-[1600px] gap-6 w-full">
      
      {/* 1. Header Block */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-lg shadow-sky-500/20 shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Sales Overview</p>
              <h2 className="text-xl font-semibold text-white">Sales Performance Dashboard</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                End-to-end full-width breakdown of sales trends, seasonality, category behavior, and logistics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Sales KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full items-stretch">
        <MetricCard title="Total Sales" value="$12.64M" detail="All-time accumulated" trend="up" icon={Wallet} />
        <MetricCard title="Total Orders" value="25,035" detail="Total lifetime volume" trend="up" icon={ShoppingCart} />
        <MetricCard title="Avg Order Value" value="$504.99" detail="Average spent per cart" trend="up" icon={BarChart3} />
        <MetricCard title="Total Profit" value="$1.47M" detail="Net retained earnings" trend="up" icon={TrendingUp} />
        <MetricCard title="Profit Margin" value="11.61%" detail="Overall profitability" trend="up" icon={Percent} />
        <MetricCard title="Total Quantity" value="178,312" detail="Items fulfilled" trend="up" icon={Package} />
      </section>

      {/* 3. Distribution by Sales Value */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Order Volume by Sales Bracket" subtitle="How most orders are distributed by absolute sales value" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderValueDist} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="band" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatNumber(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<BasicSalesTooltip />} />
              <Bar dataKey="orders" name="Order Count" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4. Common Purchase Quantities */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Common Purchase Quantities" subtitle="Distribution of orders based on the number of units bought" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={purchaseQtyDist} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="band" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatNumber(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<BasicSalesTooltip />} />
              <Bar dataKey="orders" name="Order Count" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Sales Trend Timeline */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Monthly Sales Trend (Jan 2011 - Dec 2014)" subtitle="Macro view of total revenue captured across the available timeline" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip content={<BasicSalesTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="sales" name="Sales" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Sales by Week of Day */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Sales by Day of the Week" subtitle="Identifying busiest days for traffic and transactions" />
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdayData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<BasicSalesTooltip />} />
              <Bar dataKey="sales" name="Sales" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 7. Monthly Growth Bar Chart */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Monthly Growth (MoM)" subtitle="Month-over-month relative percentage change from Jan 2011 to Dec 2014" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData.slice(1)} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<GrowthTooltip />} />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
              <Bar dataKey="growth" name="MoM Growth %" radius={[2, 2, 0, 0]}>
                {monthlyData.slice(1).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? "#34d399" : "#fb7185"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 8. Seasonality */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Seasonality (Average Calendar Month)" subtitle="Average historical sales smoothed across 12 months" />
        </CardHeader>
        <CardContent className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={seasonalityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }} formatter={(value) => formatCurrencyExact(Number(value)) } />
              <Area type="monotone" dataKey="avgSales" name="Avg Sales" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.16} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 9. Best / Worst Month Highlight */}
      <div className="grid gap-6 md:grid-cols-2 w-full">
        <Card className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 shadow-2xl shadow-slate-950/40">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">Peak Performance</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Best Revenue Month</h3>
            <p className="mt-2 text-xl text-emerald-300 font-medium">{bestMonth.period}</p>
            <p className="mt-1 text-sm text-slate-300">Total Sales: <span className="font-semibold text-white">{formatCurrencyExact(bestMonth.sales)}</span></p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-rose-500/20 bg-rose-500/10 shadow-2xl shadow-slate-950/40">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-rose-400">Lowest Performance</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Worst Revenue Month</h3>
            <p className="mt-2 text-xl text-rose-300 font-medium">{worstMonth.period}</p>
            <p className="mt-1 text-sm text-slate-300">Total Sales: <span className="font-semibold text-white">{formatCurrencyExact(worstMonth.sales)}</span></p>
          </CardContent>
        </Card>
      </div>

      {/* 10. Complete Monthly Rankings with Toggle */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-4">
          <SectionTitle title="Complete Monthly Rankings" subtitle={`All 48 months sorted by performance (${sortDesc ? 'Highest to Lowest' : 'Lowest to Highest'})`} />
          <Button variant="outline" className="rounded-2xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 w-fit" onClick={() => setSortDesc(!sortDesc)}>
            <ArrowDownUp className="mr-2 h-4 w-4" />
            {sortDesc ? 'Sort Ascending' : 'Sort Descending'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800">
            {sortedMonthsList.map((item, index) => (
              <div key={item.period} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{item.period}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full border border-slate-800 bg-slate-950 text-slate-300">
                    Rank #{index + 1}
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400">Sales</p>
                    <p className="font-semibold text-sky-400">{formatCurrencyExact(item.sales)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Profit</p>
                    <p className={`font-semibold ${item.profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{formatCurrencyExact(item.profit)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Orders</p>
                    <p className="font-semibold text-amber-400">{formatNumber(item.orders)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Profit Margin</p>
                    <p className={`font-semibold ${item.margin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{formatPercent(item.margin)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 11. Yearly Growth */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <SectionTitle title="Yearly Growth (YoY)" subtitle="Total yearly sales and percent growth over previous year" />
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<GrowthTooltip />} />
              <Bar dataKey="sales" name="Sales" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 12. Seasonal Heatmap */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Seasonal Heatmap" subtitle="A multi-year visual grid mapping out highest density sales periods" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-13 gap-1 w-full overflow-x-auto">
            {/* Empty top-left cell */}
            <div className="w-16 h-8 flex items-center justify-center"></div>
            {/* Month Headers */}
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
               <div key={m} className="h-8 flex items-center justify-center text-xs font-medium text-slate-400 uppercase tracking-widest">{m}</div>
            ))}

            {/* Matrix Data */}
            {['2011', '2012', '2013', '2014'].map((year) => (
               <React.Fragment key={year}>
                 {/* Row Header (Year) */}
                 <div className="w-16 h-12 flex items-center justify-end pr-3 text-sm font-semibold text-slate-300 border-r border-slate-800">
                   {year}
                 </div>
                 {/* Data Cells */}
                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => {
                    const match = heatmapData.find(d => d.year === year && d.month === month);
                    const sales = match ? match.sales : 0;
                    // Compute heat: max roughly 600k
                    const intensity = Math.min(100, Math.max(10, (sales / 600000) * 100));
                    return (
                      <div key={`${year}-${month}`} className="group relative h-12 rounded-sm bg-sky-500 transition-all hover:scale-105" style={{ opacity: intensity / 100 + 0.1 }}>
                        {/* Tooltip on Hover */}
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-xl">
                           <span className="font-semibold">{month} {year}</span><br />
                           <span className="text-sky-400">{formatCurrencyExact(sales)}</span>
                        </div>
                      </div>
                    )
                 })}
               </React.Fragment>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-400">
             <span>Lower Sales</span>
             <div className="h-3 w-16 rounded bg-gradient-to-r from-sky-500/20 to-sky-500"></div>
             <span>Higher Sales</span>
          </div>
        </CardContent>
      </Card>

      {/* 13. Sales by Primary Category (Donut Chart) */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales by Primary Category" subtitle="Top-level categorical revenue distribution" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
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

      {/* 14. Sales by Sub-Category */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales by Sub-Category" subtitle="Revenue sorted descending across product types" />
        </CardHeader>
        <CardContent className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subCategoryData} margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} angle={-45} textAnchor="end" />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
              <Tooltip cursor={{ fill: "#1e293b" }} content={<CustomSubCategoryTooltip />} />
              <Bar dataKey="sales" name="Sales Revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 15. Sales vs Profit by Sub-Category (Optimized Scatter) */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales vs Profit (Sub-Category Scatter)" subtitle="Mapping absolute volume against absolute returns. Bubble size indicates Sales Volume." />
        </CardHeader>
        <CardContent className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" dataKey="sales" name="Sales" stroke="#94a3b8" tickFormatter={(val) => formatCurrency(val)} />
              <YAxis type="number" dataKey="profit" name="Profit" stroke="#94a3b8" tickFormatter={(val) => formatCurrency(val)} />
              {/* Dynamic Bubble Size mapping to Sales Volume */}
              <ZAxis type="number" dataKey="sales" range={[150, 1200]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<SubCatScatterTooltip />} />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
              <Scatter name="Sub-Categories" data={subCategoryData}>
                 {subCategoryData.map((entry, index) => (
                   <Cell 
                     key={`cell-${index}`} 
                     fill={entry.profit >= 0 ? "#10b981" : "#f43f5e"} 
                     fillOpacity={0.7} 
                     stroke={entry.profit >= 0 ? "#059669" : "#e11d48"} 
                     strokeWidth={2} 
                   />
                 ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="flex flex-wrap items-center justify-center gap-4 pb-6 border-t border-slate-800/60 mt-4 pt-4">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-600" />
              <span className="text-sm text-slate-400">Positive Profit</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-rose-600" />
              <span className="text-sm text-slate-400">Negative Profit</span>
           </div>
        </div>
      </Card>

      {/* 16. Sales Distribution by Ship Mode */}
      <Card className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales Distribution by Ship Mode" subtitle="Logistical share of revenue flow" />
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={shipModeData} 
                dataKey="sales" 
                nameKey="mode" 
                cx="50%" 
                cy="50%" 
                innerRadius={90} 
                outerRadius={140} 
                paddingAngle={3}
                label={({ mode, percent }) => `${mode} (${((percent ?? 0) * 100).toFixed(1)}%)`}
                labelLine={false}
              >
                {shipModeData.map((entry, index) => (
                  <Cell key={entry.mode} fill={shipPalette[index % shipPalette.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomShipModeTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 17. Sales Notes */}
      <Card className="min-w-0 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardHeader className="pb-2">
          <SectionTitle title="Sales Notes & Observations" subtitle="Key strategic takeaways derived from the overarching sales metrics" />
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {notesList.map((text, idx) => (
            <div key={`note-${idx}`} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm leading-6 text-slate-300 flex items-start gap-3">
              <span className="mt-1 text-emerald-400"><ArrowUpRight className="h-4 w-4" /></span>
              <p>{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      
    </div>
  );
}