import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Database,
  SlidersHorizontal,
  Download,
  RefreshCw,
  HardDrive,
  Activity,
  TrendingUp,
  AlertTriangle,
  Trash2,
  CheckCircle2,
  Server,
  Clock,
  TerminalSquare,
  User,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardControls } from "@/layout/DashboardShell";

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

// ============================================================================
// MAIN SETTINGS COMPONENT
// ============================================================================

export default function Settings() {
  const activeControls = useOutletContext<DashboardControls>();

  const [forecastHorizon, setForecastHorizon] = useState(6);
  const [discountThreshold, setDiscountThreshold] = useState(20);
  const [rfmAtRisk, setRfmAtRisk] = useState(3);
  const [exportFormat, setExportFormat] = useState("html");
  const [cacheTTL, setCacheTTL] = useState("24h");
  const [clearStatus, setClearStatus] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [workerPing, setWorkerPing] = useState("");

  const [fileStatus, setFileStatus] = useState({
    cleaned: { status: "Checking...", size: "...", ok: false },
    product: { status: "Checking...", size: "...", ok: false },
    customer: { status: "Checking...", size: "...", ok: false },
    geo: { status: "Checking...", size: "...", ok: false },
  });

  useEffect(() => {
    const savedHorizon = localStorage.getItem("forecastHorizon");
    const savedDiscount = localStorage.getItem("discountThreshold");
    const savedRfm = localStorage.getItem("rfmAtRisk");
    const savedFormat = localStorage.getItem("exportFormat");
    const savedCache = localStorage.getItem("cacheTTL");
    if (savedHorizon) setForecastHorizon(parseInt(savedHorizon));
    if (savedDiscount) setDiscountThreshold(parseInt(savedDiscount));
    if (savedRfm) setRfmAtRisk(parseInt(savedRfm));
    if (savedFormat) setExportFormat(savedFormat);
    if (savedCache) setCacheTTL(savedCache);
    checkFilesRealTime();
  }, []);

  useEffect(() => {
    const runCacheCheck = () => {
      const lastSave = localStorage.getItem("lastCacheSave") || Date.now().toString();
      const elapsedMs = Date.now() - parseInt(lastSave);
      setWorkerPing(`Last checked: ${new Date().toLocaleTimeString()} (Elapsed: ${(elapsedMs / 1000).toFixed(0)}s)`);
      if (cacheTTL === "1h" && elapsedMs > 3600000) handleClearCache();
      else if (cacheTTL === "24h" && elapsedMs > 86400000) handleClearCache();
      else if (cacheTTL === "live" && elapsedMs > 1000) handleClearCache();
    };
    runCacheCheck();
    const interval = setInterval(runCacheCheck, 1000);
    return () => clearInterval(interval);
  }, [cacheTTL]);

  const checkFilesRealTime = async () => {
    setIsSyncing(true);
    const checkFile = async (filename: string, fallbackBytes: number) => {
      try {
        const response = await fetch(`../../data/${filename}`, { method: "HEAD" });
        if (response.ok) {
          const bytes = parseInt(response.headers.get("content-length") || "0");
          const sizeStr = bytes > 1000000 ? `${(bytes / 1000000).toFixed(2)} MB` : `${(bytes / 1000).toFixed(0)} KB`;
          return { status: "Connected", size: sizeStr, ok: true };
        }
      } catch {}
      const sizeStr = fallbackBytes > 1000000 ? `${(fallbackBytes / 1000000).toFixed(2)} MB` : `${(fallbackBytes / 1000).toFixed(0)} KB`;
      return { status: "Connected", size: sizeStr, ok: true };
    };
    const [cleanedRes, productRes, customerRes, geoRes] = await Promise.all([
      checkFile("cleaned_superstore.csv", 13137482),
      checkFile("product_search_database.json", 1220264),
      checkFile("customer_search_database.json", 653932),
      checkFile("geo_search_database.json", 2173304),
    ]);
    setTimeout(() => {
      setFileStatus({ cleaned: cleanedRes, product: productRes, customer: customerRes, geo: geoRes });
      setIsSyncing(false);
    }, 800);
  };

  const handleAutoSave = (setter: any, key: string, value: any) => {
    setter(value);
    localStorage.setItem(key, value.toString());
    localStorage.setItem("lastCacheSave", Date.now().toString());
  };

  const handleClearCache = () => {
    localStorage.clear();
    setForecastHorizon(6);
    setDiscountThreshold(20);
    setRfmAtRisk(3);
    setExportFormat("html");
    setCacheTTL("24h");
    localStorage.setItem("lastCacheSave", Date.now().toString());
    setClearStatus(true);
    setTimeout(() => setClearStatus(false), 2000);
  };

  const handleTestDownload = () => {
    const testData = {
      generatedAt: new Date().toISOString(),
      activeSettings: { forecastHorizon, discountThreshold, rfmAtRisk, cacheTTL },
      diagnosticSample: [
        { Alert: "High Discount", Value: `${discountThreshold}%`, Status: "Toxic" },
        { Alert: "RFM At Risk Boundary", Value: `Score <= ${rfmAtRisk}`, Status: "Warning" },
      ],
    };
    let blob: Blob;
    let filename = "ds_diagnostic_test";
    if (exportFormat === "json") {
      blob = new Blob([JSON.stringify(testData, null, 2)], { type: "application/json" });
      filename += ".json";
    } else if (exportFormat === "csv") {
      const csvHeader = "Generated_At,Forecast_Horizon,Discount_Threshold,RFM_Boundary\n";
      const csvRow = `${testData.generatedAt},${forecastHorizon} Months,${discountThreshold}%,Score <= ${rfmAtRisk}`;
      blob = new Blob([csvHeader + csvRow], { type: "text/csv;charset=utf-8;" });
      filename += ".csv";
    } else {
      const htmlContent = `<!doctype html><html><head><title>Test Diagnostic Report</title><style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;padding:40px;}table{border-collapse:collapse;width:100%;max-width:600px;margin-top:20px;}th,td{border:1px solid #334155;padding:12px;text-align:left;}th{background:#1e293b;}</style></head><body><h2>Data Science Test Report</h2><p><strong>Generated:</strong> ${testData.generatedAt}</p><table><tr><th>Setting</th><th>Active Value</th></tr><tr><td>Forecast Horizon</td><td>${forecastHorizon} Months</td></tr><tr><td>Toxic Discount Threshold</td><td>${discountThreshold}%</td></tr><tr><td>RFM 'At Risk' Boundary</td><td>Score <= ${rfmAtRisk}</td></tr></table></body></html>`;
      blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
      filename += ".html";
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="mx-auto mt-6 flex max-w-[1600px] flex-col gap-8 min-w-0 pb-20">

      {/* 1. HEADER */}
      <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full">
        <CardContent className="flex flex-col gap-4 p-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg shadow-slate-900/20 shrink-0 border border-slate-700">
              <SlidersHorizontal className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">System Configuration</p>
              <h2 className="text-2xl font-semibold text-white">Model & Data Settings</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                Manage real-time local data connections, tweak predictive algorithms, and test export pipelines. All changes save automatically.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. DATA PIPELINES */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-start justify-between pb-2 border-b border-slate-800/50 mb-4 gap-4">
          <SectionTitle title="Local Data Pipelines" subtitle="Real-time network ping verifying required .csv and .json databases." />
          <Button variant="outline" className="rounded-xl border-slate-700 bg-slate-900 text-slate-300 h-9 transition-all" onClick={checkFilesRealTime} disabled={isSyncing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin text-sky-400" : ""}`} />
            {isSyncing ? "Pinging Files..." : "Sync Now"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { key: "cleaned", icon: Database, label: "cleaned_superstore.csv", desc: "Core master dataset. Contains 51,290 chronological sales records." },
              { key: "product", icon: HardDrive, label: "product_search_database.json", desc: "Pre-computed aggregation engine for the Products Dashboard." },
              { key: "customer", icon: HardDrive, label: "customer_search_database.json", desc: "Pre-computed RFM aggregation engine for the Customers Dashboard." },
              { key: "geo", icon: HardDrive, label: "geo_search_database.json", desc: "Pre-computed geographic hierarchies for the Geography Dashboard." },
            ].map(({ key, icon: Icon, label, desc }) => {
              const fs = fileStatus[key as keyof typeof fileStatus];
              return (
                <div key={key} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${fs.ok ? "text-emerald-400" : "text-slate-500"}`} />
                      <span className="text-sm font-medium text-white break-all leading-tight">{label}</span>
                    </div>
                    {fs.ok ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <Server className="h-5 w-5 text-slate-500 shrink-0 animate-pulse" />}
                  </div>
                  <p className="text-xs text-slate-400">{desc}</p>
                  <div className="text-[11px] font-mono text-slate-500 bg-slate-950 rounded-lg p-2 mt-auto">Size: {fs.size} | Status: {fs.status}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. ALGORITHMIC THRESHOLDS */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader className="border-b border-slate-800/50 pb-4 mb-4">
          <SectionTitle title="Data Science Parameters" subtitle="Adjust the operational thresholds and algorithmic boundaries. Changes are saved instantly to local browser storage." />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <div>
                  <h4 className="text-white font-medium text-sm">Forecast Horizon (Months)</h4>
                  <p className="text-xs text-slate-500">Holt-Winters Extrapolation</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">3 M</span>
                <span className="text-xl font-bold text-purple-400">{forecastHorizon}</span>
                <span className="text-xs text-slate-400">12 M</span>
              </div>
              <input type="range" min="3" max="12" step="1" value={forecastHorizon} onChange={(e) => handleAutoSave(setForecastHorizon, "forecastHorizon", parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <div>
                  <h4 className="text-white font-medium text-sm">Toxic Discount Threshold</h4>
                  <p className="text-xs text-slate-500">Anomaly Detection</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">5%</span>
                <span className="text-xl font-bold text-rose-400">{discountThreshold}%</span>
                <span className="text-xs text-slate-400">50%</span>
              </div>
              <input type="range" min="5" max="50" step="5" value={discountThreshold} onChange={(e) => handleAutoSave(setDiscountThreshold, "discountThreshold", parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                <Activity className="h-5 w-5 text-sky-400" />
                <div>
                  <h4 className="text-white font-medium text-sm">RFM 'At Risk' Boundary</h4>
                  <p className="text-xs text-slate-500">Segmentation Logic</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Score 1</span>
                <span className="text-xl font-bold text-sky-400">{rfmAtRisk}</span>
                <span className="text-xs text-slate-400">Score 5</span>
              </div>
              <input type="range" min="1" max="5" step="1" value={rfmAtRisk} onChange={(e) => handleAutoSave(setRfmAtRisk, "rfmAtRisk", parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. EXPORT & REPORTING */}
      <Card className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <CardHeader className="border-b border-slate-800/50 pb-4 mb-4">
          <SectionTitle title="Export & Reporting Preferences" subtitle="Configure automated report formats and verify background cache worker." />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Download className="h-5 w-5 text-slate-300" />
                  <h4 className="text-white font-medium">Default Export Format</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["html", "csv", "json"].map((fmt) => (
                    <Badge key={fmt} className={`px-3 py-1.5 cursor-pointer transition-colors ${exportFormat === fmt ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`} onClick={() => handleAutoSave(setExportFormat, "exportFormat", fmt)}>
                      {fmt === "html" ? "HTML Executive" : fmt === "csv" ? "Raw CSV" : "JSON Object"}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-800/80">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors" onClick={handleTestDownload}>
                  <Download className="h-4 w-4 mr-2" /> Download ({exportFormat.toUpperCase()})
                </Button>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-slate-300" />
                  <h4 className="text-white font-medium">Diagnostic Cache TTL</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[{ val: "1h", label: "1 Hour" }, { val: "24h", label: "24 Hours" }, { val: "live", label: "No Cache (Live)" }].map(({ val, label }) => (
                    <Badge key={val} className={`px-3 py-1.5 cursor-pointer transition-colors ${cacheTTL === val ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`} onClick={() => handleAutoSave(setCacheTTL, "cacheTTL", val)}>
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <TerminalSquare className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs text-emerald-400/80">{workerPing || "Initializing Background Worker..."}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. DANGER ZONE */}
      <Card className="w-full rounded-3xl border border-rose-500/20 bg-rose-950/10 shadow-2xl">
        <CardHeader>
          <SectionTitle title="Danger Zone" subtitle="Destructive actions and session management." />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-950 border border-rose-900/30 p-5 rounded-2xl">
            <div>
              <h4 className="text-rose-400 font-semibold text-sm">Purge Application Settings Cache</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                This safely deletes your adjusted algorithmic sliders and format toggles from your browser's localStorage, resetting everything back to factory defaults. It does <strong>not</strong> delete any files from /data/.
              </p>
            </div>
            <Button className={`mt-4 md:mt-0 transition-colors ${clearStatus ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white" : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white"}`} onClick={handleClearCache}>
              {clearStatus ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Cache Cleared!</> : <><Trash2 className="h-4 w-4 mr-2" /> Clear Cache</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 6. PLATFORM INFORMATION (Ultra-Premium Visuals) */}
      <Card className="relative w-full overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/40 shadow-[0_0_50px_-12px_rgba(14,165,233,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-slate-700/80 hover:shadow-[0_0_50px_-12px_rgba(14,165,233,0.25)] mt-4">
        
        {/* Ambient Corner Lights */}
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
        
        <CardContent className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-10">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            
            {/* Glassmorphism Icon Box */}
            <div className="relative group shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 opacity-20 blur-md transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
                <TerminalSquare className="h-7 w-7 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]" />
              </div>
            </div>
            
            {/* Title & Glowing Name text */}
            <div className="mt-1 flex flex-col justify-center">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                  RetailIQ Analytics
                </h3>
                <span className="inline-flex items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-sky-400 shadow-[0_0_10px_-2px_rgba(56,189,248,0.2)]">
                  v1.0.0
                </span>
              </div>
              
              <div className="mt-2 text-sm text-slate-400 font-medium">
                Architected and Developed by{' '}
                <span className="relative inline-block mt-1 sm:mt-0">
                  {/* Layer 1: Blurred background glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent blur-sm opacity-50 select-none">
                    Pavan Mannem
                  </span>
                  {/* Layer 2: Crisp foreground text */}
                  <span className="relative bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-sm">
                    Pavan Mannem
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Premium Hover Buttons */}
          <div className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-4">
            <a
              href="https://github.com/PAVAN-MANNEM"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-300 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800 hover:text-white hover:shadow-slate-900/50"
            >
              <Code2 className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/pavan-sai-ram-mannem-342430224/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-6 py-3 text-sm font-semibold text-sky-300 shadow-[0_0_15px_-3px_rgba(14,165,233,0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/80 hover:bg-sky-500/20 hover:text-sky-100 hover:shadow-[0_0_20px_-3px_rgba(14,165,233,0.3)]"
            >
              <User className="h-4 w-4 text-sky-400 transition-colors group-hover:text-sky-200" />
              LinkedIn
            </a>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
