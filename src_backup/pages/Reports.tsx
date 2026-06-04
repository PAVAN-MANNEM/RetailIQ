import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileBarChart2,
  AlertTriangle,
  Sparkles,
  CalendarDays,
  Target,
  TrendingUp,
  Activity,
  ShieldAlert,
  Users,
  BrainCircuit,
  Microscope,
  Crosshair,
  MapPinned,
  Truck
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  Cell
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardControls } from "@/layout/DashboardShell";

// ============================================================================
// DATA SOURCES (Extracted directly from EDA.ipynb & Advanced Analytics CSVs)
// ============================================================================

// 1. Qualitative Notebook Findings (Extracted & Optimized from Notebook Markdown)
const notebookInsights = [
  { 
    title: "Final Executive Assessment", 
    description: "A small core of sub-categories and 'Champion' customers drive the vast majority of profits. Priority actions: retain high-value accounts, curb margin-eroding discounts, and utilize trend forecasting for seasonal inventory planning.", 
    icon: Target 
  },
  { 
    title: "Customer Count Anomalies", 
    description: "The dataset has 1,590 unique Customer IDs but only 795 unique Names. This occurs because individuals are assigned separate IDs for different global regions. Example: 'Aaron Bergman' has one ID for US purchases and a different ID for APAC. Thus, RFM metrics evaluate regional accounts, not individual humans.", 
    icon: Users 
  },
  { 
    title: "RFM Dynamics (Zero Lost Customers)", 
    description: "The model shows zero 'Lost' customers. This is an algorithmic quirk: the lowest possible RFM score is 3 (R=1, F=1, M=1). Because the logic classifies all scores ≥ 3 as 'At Risk', completely dormant accounts are artificially trapped in the 'At Risk' tier.", 
    icon: Activity 
  },
  { 
    title: "RFM Statistical Validity", 
    description: "Kruskal-Wallis testing (p=0.024) proves that profit margins differ significantly across our four customer segments. This mathematically validates the need for tailored, segment-specific marketing strategies.", 
    icon: BrainCircuit 
  },
  { 
    title: "Geographic Ranking Deceptions", 
    description: "Be cautious with regional leaderboards. FDR-corrected tests show NO statistically significant difference in sales volume between several regions (e.g., East vs. West). A higher rank doesn't always guarantee demonstrably better performance.", 
    icon: MapPinned 
  },
  { 
    title: "Shipping vs. Margin Reality", 
    description: "Shipping speed does not impact profitability. The profit margin difference between overnight (0-1 days) and standard (6+ days) shipping is less than 1%. Strategy should focus on product mix, not shipping tiers.", 
    icon: Truck 
  },
  { 
    title: "Non-Normal Distributions", 
    description: "Sales and Profit data are strictly non-normal (Shapiro-Wilk test). Consequently, all insights rely on non-parametric tests (like Spearman correlation), highlighting strong behavioral associations rather than guaranteed causations.", 
    icon: Microscope 
  }
];

// 2. Section 12: Sales Forecast Data (Holt-Winters Exponential Smoothing)
const salesForecastData = [
  { Month: '2014-04', Actual_Sales: 242771.86, Forecast_Sales: null },
  { Month: '2014-05', Actual_Sales: 288401.05, Forecast_Sales: null },
  { Month: '2014-06', Actual_Sales: 401814.06, Forecast_Sales: null },
  { Month: '2014-07', Actual_Sales: 258705.68, Forecast_Sales: null },
  { Month: '2014-08', Actual_Sales: 456619.94, Forecast_Sales: null },
  { Month: '2014-09', Actual_Sales: 481157.24, Forecast_Sales: null },
  { Month: '2014-10', Actual_Sales: 422766.63, Forecast_Sales: null },
  { Month: '2014-11', Actual_Sales: 555279.03, Forecast_Sales: null },
  { Month: '2014-12', Actual_Sales: 503143.69, Forecast_Sales: null },
  { Month: '2015-01', Actual_Sales: null, Forecast_Sales: 282451.30 },
  { Month: '2015-02', Actual_Sales: null, Forecast_Sales: 226020.10 },
  { Month: '2015-03', Actual_Sales: null, Forecast_Sales: 304283.51 },
  { Month: '2015-04', Actual_Sales: null, Forecast_Sales: 283954.60 },
  { Month: '2015-05', Actual_Sales: null, Forecast_Sales: 329583.79 },
  { Month: '2015-06', Actual_Sales: null, Forecast_Sales: 442996.80 },
];

// 3. Section 15: Driver Scorecard Data (Spearman Correlation)
const driverScorecard = [
  { Driver: 'Discount Rate', Correlation: -0.5959, Strength: 'Moderate', Direction: 'Negative', Interpretation: 'Higher discounting aggressively destroys net profit margins.' },
  { Driver: 'Sales Volume', Correlation: 0.4901, Strength: 'Moderate', Direction: 'Positive', Interpretation: 'Higher sales volume naturally drives higher profit yields.' },
  { Driver: 'Shipping Cost', Correlation: 0.4494, Strength: 'Moderate', Direction: 'Positive', Interpretation: 'Higher shipping correlates to higher profit (indicates larger basket sizes).' },
  { Driver: 'Order Quantity', Correlation: 0.2014, Strength: 'Weak', Direction: 'Positive', Interpretation: 'Larger unit counts scale profit, but weakly due to mixed product margins.' },
];

// 4. Section 15: Loss Making Root Cause (Cities)
const rootCauseCities = [
  { City: 'Lagos', Profit: -25922.51, Margin: -150.84, Discount: '70.0%', Reason: 'Average discount is high (70.0%); overall profit margin is negative.' },
  { City: 'Istanbul', Profit: -19960.91, Margin: -91.17, Discount: '60.0%', Reason: 'Average discount is high (60.0%); mix is concentrated in low-margin Bookcases.' },
  { City: 'Tegucigalpa', Profit: -15007.42, Margin: -31.23, Discount: '40.6%', Reason: 'Average discount is high (40.6%); overall profit margin is negative.' },
  { City: 'Philadelphia', Profit: -13837.77, Margin: -12.68, Discount: '41.4%', Reason: 'Average discount is high (41.4%); overall profit margin is negative.' },
  { City: 'Lahore', Profit: -13626.37, Margin: -40.34, Discount: '50.0%', Reason: 'Average discount is high (50.0%); overall profit margin is negative.' }
];

// 5. Section 15: Loss Making Root Cause (Customers)
const rootCauseCustomers = [
  { Customer: 'Cindy Stewart', ID: 'CS-12505', Profit: -6437.36, Margin: -55.80, Reason: 'Mix is heavily concentrated in low-margin Technology (Cubify 3D Printers).' },
  { Customer: 'Denise Monton', ID: 'DM-3345', Profit: -5474.61, Margin: -109.52, Reason: 'Weak unit economics and extreme discounting (36.7% avg) pull profit down.' },
  { Customer: 'Grant Thornton', ID: 'GT-14635', Profit: -3790.08, Margin: -19.86, Reason: 'Overall profit margin is negative across 20 lifetime orders.' },
];

// 6. Section 14: Strategic Recommendations
const strategicRecs = [
  { Area: 'Customer Recovery', Priority: 'High', Rec: 'Run targeted win-back campaigns, proactive follow-ups, and time-bound retention offers for At Risk customers.' },
  { Area: 'Customer Strategy', Priority: 'High', Rec: 'Protect and grow Champions with loyalty rewards, upsell offers, and personalized engagement.' },
  { Area: 'Discount Strategy', Priority: 'High', Rec: 'The weakest discount band is 50%+ with margin -111.02%. Reduce discount exposure in weak bands and reserve heavy discounts for clearance or targeted acquisition only.' },
  { Area: 'Pareto Strategy', Priority: 'High', Rec: 'The top 8 sub-categories contribute roughly 80% of sales. Concentrate supplier negotiations, inventory attention, and promotional effort on these high-impact sub-categories.' },
  { Area: 'Product Portfolio', Priority: 'High', Rec: 'Prioritize Core Winners in inventory planning, merchandising, and promotional spend. Rationalize the worst-performing Loss Makers (like Tables) if losses persist.' },
  { Area: 'Forecast Strategy', Priority: 'Medium', Rec: 'The model projects approximately $2,361,615 total sales over the forecast horizon. Use the forecast to plan inventory, staffing, and campaign timing in advance.' }
];

// ============================================================================
// FORMATTERS & UTILS
// ============================================================================

function money(value: any) {
  if (value == null) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

// ============================================================================
// REAL-TIME EXPORT FUNCTIONS (Runs directly in the browser)
// ============================================================================

function downloadCSV(filename: string, rows: object[]) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]).join(",");
  const csvContent = rows.map(row => 
    Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")
  ).join("\n");
  
  const blob = new Blob([`${headers}\n${csvContent}`], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadHTMLReport() {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Advanced Analytics & Diagnostics Report</title>
        <style>
          body { font-family: -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; }
          .container { max-width: 1000px; margin: 0 auto; background: #020617; border: 1px solid #1f2937; border-radius: 12px; padding: 30px; }
          h1, h2 { color: #f8fafc; border-bottom: 1px solid #1f2937; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { text-align: left; padding: 12px; border-bottom: 1px solid #1f2937; }
          th { background: #0f172a; color: #94a3b8; text-transform: uppercase; font-size: 12px; }
          .text-red { color: #f43f5e; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Advanced Business Diagnostics & Root Cause Analysis</h1>
          <p>Generated automatically from the Data Science Dashboard.</p>
          
          <h2>1. Strategic Recommendations</h2>
          <table>
            <tr><th>Area</th><th>Priority</th><th>Action</th></tr>
            ${strategicRecs.map(r => `<tr><td>${r.Area}</td><td>${r.Priority}</td><td>${r.Rec}</td></tr>`).join('')}
          </table>

          <h2>2. Toxic Geographic Zones (Root Cause)</h2>
          <table>
            <tr><th>City</th><th>Net Profit</th><th>Discount Avg</th><th>Root Cause</th></tr>
            ${rootCauseCities.map(c => `<tr><td>${c.City}</td><td class="text-red">$${c.Profit}</td><td>${c.Discount}</td><td>${c.Reason}</td></tr>`).join('')}
          </table>

          <h2>3. Statistical Drivers</h2>
          <table>
            <tr><th>Variable</th><th>Correlation</th><th>Impact</th></tr>
            ${driverScorecard.map(d => `<tr><td>${d.Driver}</td><td>${d.Correlation}</td><td>${d.Interpretation}</td></tr>`).join('')}
          </table>
        </div>
      </body>
    </html>
  `;
  
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "advanced_diagnostics_report.html";
  link.click();
  URL.revokeObjectURL(link.href);
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function HeaderBlock() {
  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
      <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Analytics Center</p>
            <h2 className="text-xl font-semibold text-white">Business Analytics & Diagnostics</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-400">
              Direct synthesis of Jupyter Notebook notes, predictive forecasting models, and automated root cause algorithms.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Reports() {
  return (
    <div className="mx-auto mt-6 flex flex-col gap-8 w-full max-w-[1800px] min-w-0 pb-20">
      <HeaderBlock />

      {/* 1. EDA Notebook Qualitative Findings (Grid of Cards, but takes full container width) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Exploratory Data Analysis Constraints & Findings" subtitle="Crucial notebook notes explaining data inconsistencies, statistical validations, and behavioral anomalies." />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notebookInsights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                     <Icon className="text-indigo-400 h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mt-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 2. Section 14: Strategic Recommendations (Full Width List) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
         <CardHeader>
           <SectionTitle title="Strategic Recommendations" subtitle="Synthesized action plan based on overall exploratory analysis." />
         </CardHeader>
         <CardContent>
            <div className="space-y-3">
               {strategicRecs.map((rec, idx) => (
                 <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="md:w-1/4 xl:w-1/6 shrink-0">
                       <p className="font-semibold text-white text-base flex items-center gap-2"><Crosshair className="h-4 w-4 text-indigo-400" /> {rec.Area}</p>
                       <Badge className={`mt-3 ${rec.Priority === 'Critical' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : rec.Priority === 'High' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-300'}`}>{rec.Priority} Priority</Badge>
                    </div>
                    <div className="flex-1">
                       <p className="text-slate-300 text-sm leading-relaxed">{rec.Rec}</p>
                    </div>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>

      {/* 3. Section 12: Advanced Analytics & Forecasting (Full Width Graph) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <SectionTitle title="Predictive Analytics & Forecasting" subtitle="Holt-Winters Exponential Smoothing model forecasting 6 months forward. Model MAE: ±$52,019" />
          <Badge className="bg-slate-900 text-sky-400 border border-slate-700 h-8">Optimized: Additive Trend + Seasonality</Badge>
        </CardHeader>
        <CardContent className="h-[500px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="Month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={money} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ background: "#020617", border: "1px solid #1f2937", borderRadius: 16, color: "#e2e8f0" }}
                formatter={(value) => money(Number(value))}
              />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine x="2014-12" stroke="#64748b" strokeDasharray="3 3" label={{ position: "insideTopLeft", value: "Forecast Start", fill: "#94a3b8" }} />
              <Line type="monotone" dataKey="Actual_Sales" name="Historical Sales" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Forecast_Sales" name="Predicted Trajectory" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4. Section 15: Driver Scorecard (Full Width Graph) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Business Driver Scorecard" subtitle="Spearman correlation between operational vectors and net profitability." />
        </CardHeader>
        <CardContent className="h-[350px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={driverScorecard} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} domain={[-1, 1]} />
              <YAxis type="category" dataKey="Driver" stroke="#e2e8f0" tickLine={false} axisLine={false} width={100} />
              <Tooltip 
                cursor={{ fill: "#1e293b" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl max-w-[250px]">
                        <p className="mb-2 font-semibold text-white">{data.Driver}</p>
                        <p className="text-sm text-slate-300">Correlation: <span className={data.Correlation < 0 ? 'text-rose-400' : 'text-emerald-400'}>{data.Correlation}</span></p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{data.Interpretation}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine x={0} stroke="#94a3b8" />
              <Bar dataKey="Correlation" radius={4} barSize={40}>
                {driverScorecard.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.Correlation < 0 ? "#f43f5e" : "#34d399"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Section 15: Root Cause Diagnostics (Full Width Tables/Lists) */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
         <CardHeader>
           <SectionTitle title="Advanced Root Cause Diagnostics" subtitle="Automated scanning detecting exact points of severe margin failure across cities and customers." />
         </CardHeader>
         <CardContent className="space-y-6">
            
            {/* Cities Breakdown */}
            <div>
               <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-800 pb-2"><AlertTriangle className="h-4 w-4 text-rose-500" /> Toxic Geographic Zones</h3>
               <div className="grid gap-3">
                 {rootCauseCities.map((city, idx) => (
                   <div key={idx} className="bg-rose-950/10 border border-rose-900/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="md:w-1/4">
                         <p className="font-semibold text-white">{city.City}</p>
                         <p className="text-xs text-rose-400 mt-0.5">Net Profit: {money(city.Profit)}</p>
                      </div>
                      <div className="md:w-1/6">
                         <p className="text-xs text-slate-500 uppercase">Avg Discount</p>
                         <p className="font-mono text-sm text-slate-300">{city.Discount}</p>
                      </div>
                      <div className="md:w-1/2">
                         <p className="text-xs text-slate-500 uppercase">Algorithmic Root Cause</p>
                         <p className="text-sm text-slate-300 italic">"{city.Reason}"</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Customers Breakdown */}
            <div className="pt-4">
               <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-slate-800 pb-2"><ShieldAlert className="h-4 w-4 text-rose-500" /> Critical Loss-Making Customers</h3>
               <div className="grid gap-3">
                 {rootCauseCustomers.map((cust, idx) => (
                   <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="md:w-1/4">
                         <p className="font-semibold text-white">{cust.Customer}</p>
                         <p className="text-xs text-slate-500 font-mono">{cust.ID}</p>
                      </div>
                      <div className="md:w-1/6">
                         <p className="text-xs text-rose-500/70 uppercase">Net Loss</p>
                         <p className="font-mono text-sm text-rose-400">{money(cust.Profit)}</p>
                      </div>
                      <div className="md:w-1/2">
                         <p className="text-xs text-slate-500 uppercase">Algorithmic Root Cause</p>
                         <p className="text-sm text-slate-300 italic">"{cust.Reason}"</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

         </CardContent>
      </Card>

      {/* 6. Real-Time Report Downloads (Bottom Actions) */}
      <Card className="w-full rounded-3xl border border-sky-500/20 bg-sky-950/10 shadow-2xl mt-4">
        <CardHeader>
          <SectionTitle title="Export Final Deliverables" subtitle="Generate and download actual report files instantly to your local machine." />
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:border-sky-500/50 hover:bg-slate-900">
             <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-sky-400" />
             </div>
             <div>
                <h3 className="font-semibold text-white">Full HTML Executive Report</h3>
                <p className="text-xs text-slate-400 mt-1">Rendered diagnostics & strategy doc.</p>
             </div>
             <Button className="w-full rounded-xl bg-white text-slate-950 hover:bg-slate-200 mt-2" onClick={downloadHTMLReport}>
                <Download className="mr-2 h-4 w-4" /> Download HTML
             </Button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:border-emerald-500/50 hover:bg-slate-900">
             <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-emerald-400" />
             </div>
             <div>
                <h3 className="font-semibold text-white">Loss-Making Entities (CSV)</h3>
                <p className="text-xs text-slate-400 mt-1">Raw data for root-cause targets.</p>
             </div>
             <Button className="w-full rounded-xl bg-white text-slate-950 hover:bg-slate-200 mt-2" onClick={() => downloadCSV("toxic_zones_export.csv", rootCauseCities)}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
             </Button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:border-purple-500/50 hover:bg-slate-900">
             <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FileBarChart2 className="h-6 w-6 text-purple-400" />
             </div>
             <div>
                <h3 className="font-semibold text-white">Sales Forecast Pipeline (CSV)</h3>
                <p className="text-xs text-slate-400 mt-1">Projected models vs actuals.</p>
             </div>
             <Button className="w-full rounded-xl bg-white text-slate-950 hover:bg-slate-200 mt-2" onClick={() => downloadCSV("predictive_forecast_export.csv", salesForecastData)}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
             </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}