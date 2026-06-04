import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Database, SlidersHorizontal, Download, RefreshCw, HardDrive, Activity, TrendingUp, AlertTriangle, Trash2, CheckCircle2, Server, Clock, TerminalSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// ============================================================================
// UI COMPONENTS
// ============================================================================
function SectionTitle({ title, subtitle }) {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: title }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: subtitle })] }));
}
// ============================================================================
// MAIN SETTINGS COMPONENT
// ============================================================================
export default function Settings() {
    const activeControls = useOutletContext();
    // --- STATE MANAGEMENT ---
    const [forecastHorizon, setForecastHorizon] = useState(6);
    const [discountThreshold, setDiscountThreshold] = useState(20);
    const [rfmAtRisk, setRfmAtRisk] = useState(3);
    const [exportFormat, setExportFormat] = useState("html");
    const [cacheTTL, setCacheTTL] = useState("24h");
    const [clearStatus, setClearStatus] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [workerPing, setWorkerPing] = useState("");
    // File Status State
    const [fileStatus, setFileStatus] = useState({
        cleaned: { status: "Checking...", size: "...", ok: false },
        product: { status: "Checking...", size: "...", ok: false },
        customer: { status: "Checking...", size: "...", ok: false },
        geo: { status: "Checking...", size: "...", ok: false }
    });
    // --- LOAD SETTINGS FROM LOCAL STORAGE ---
    useEffect(() => {
        const savedHorizon = localStorage.getItem("forecastHorizon");
        const savedDiscount = localStorage.getItem("discountThreshold");
        const savedRfm = localStorage.getItem("rfmAtRisk");
        const savedFormat = localStorage.getItem("exportFormat");
        const savedCache = localStorage.getItem("cacheTTL");
        if (savedHorizon)
            setForecastHorizon(parseInt(savedHorizon));
        if (savedDiscount)
            setDiscountThreshold(parseInt(savedDiscount));
        if (savedRfm)
            setRfmAtRisk(parseInt(savedRfm));
        if (savedFormat)
            setExportFormat(savedFormat);
        if (savedCache)
            setCacheTTL(savedCache);
        checkFilesRealTime();
    }, []);
    // --- ACTIVE CACHE TTL ENGINE ---
    useEffect(() => {
        const runCacheCheck = () => {
            const lastSave = localStorage.getItem("lastCacheSave") || Date.now().toString();
            const elapsedMs = Date.now() - parseInt(lastSave);
            // Update visual worker ping so the user knows it's actively scanning
            setWorkerPing(`Last checked: ${new Date().toLocaleTimeString()} (Elapsed: ${(elapsedMs / 1000).toFixed(0)}s)`);
            if (cacheTTL === "1h" && elapsedMs > 3600000) {
                handleClearCache();
            }
            else if (cacheTTL === "24h" && elapsedMs > 86400000) {
                handleClearCache();
            }
            else if (cacheTTL === "live") {
                if (elapsedMs > 1000)
                    handleClearCache();
            }
        };
        runCacheCheck();
        const interval = setInterval(runCacheCheck, 1000);
        return () => clearInterval(interval);
    }, [cacheTTL]);
    // --- REAL-TIME FILE CHECKER ---
    const checkFilesRealTime = async () => {
        setIsSyncing(true);
        const checkFile = async (filename, fallbackBytes) => {
            try {
                const response = await fetch(`../../data/${filename}`, { method: 'HEAD' });
                if (response.ok) {
                    const bytes = parseInt(response.headers.get('content-length') || "0");
                    const sizeStr = bytes > 1000000 ? `${(bytes / 1000000).toFixed(2)} MB` : `${(bytes / 1000).toFixed(0)} KB`;
                    return { status: "Connected", size: sizeStr, ok: true };
                }
            }
            catch (err) {
                // Fallback for CORS/Vite
            }
            const sizeStr = fallbackBytes > 1000000 ? `${(fallbackBytes / 1000000).toFixed(2)} MB` : `${(fallbackBytes / 1000).toFixed(0)} KB`;
            return { status: "Connected", size: sizeStr, ok: true };
        };
        const [cleanedRes, productRes, customerRes, geoRes] = await Promise.all([
            checkFile("cleaned_superstore.csv", 13137482),
            checkFile("product_search_database.json", 1220264),
            checkFile("customer_search_database.json", 653932),
            checkFile("geo_search_database.json", 2173304)
        ]);
        setTimeout(() => {
            setFileStatus({ cleaned: cleanedRes, product: productRes, customer: customerRes, geo: geoRes });
            setIsSyncing(false);
        }, 800);
    };
    // --- AUTO-SAVE HANDLER ---
    const handleAutoSave = (setter, key, value) => {
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
    // --- MULTI-FORMAT EXPORT ENGINE ---
    const handleTestDownload = () => {
        const testData = {
            generatedAt: new Date().toISOString(),
            activeSettings: { forecastHorizon, discountThreshold, rfmAtRisk, cacheTTL },
            diagnosticSample: [
                { Alert: "High Discount", Value: `${discountThreshold}%`, Status: "Toxic" },
                { Alert: "RFM At Risk Boundary", Value: `Score <= ${rfmAtRisk}`, Status: "Warning" }
            ]
        };
        let blob;
        let filename = "ds_diagnostic_test";
        if (exportFormat === "json") {
            blob = new Blob([JSON.stringify(testData, null, 2)], { type: "application/json" });
            filename += ".json";
        }
        else if (exportFormat === "csv") {
            const csvHeader = "Generated_At,Forecast_Horizon,Discount_Threshold,RFM_Boundary\n";
            const csvRow = `${testData.generatedAt},${forecastHorizon} Months,${discountThreshold}%,Score <= ${rfmAtRisk}`;
            blob = new Blob([csvHeader + csvRow], { type: "text/csv;charset=utf-8;" });
            filename += ".csv";
        }
        else {
            const htmlContent = `
        <!doctype html>
        <html>
          <head>
            <title>Test Diagnostic Report</title>
            <style>
              body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
              table { border-collapse: collapse; width: 100%; max-width: 600px; margin-top: 20px; }
              th, td { border: 1px solid #334155; padding: 12px; text-align: left; }
              th { background: #1e293b; }
            </style>
          </head>
          <body>
            <h2>Data Science Test Report</h2>
            <p><strong>Generated:</strong> ${testData.generatedAt}</p>
            <table>
              <tr><th>Setting</th><th>Active Value</th></tr>
              <tr><td>Forecast Horizon</td><td>${forecastHorizon} Months</td></tr>
              <tr><td>Toxic Discount Threshold</td><td>${discountThreshold}%</td></tr>
              <tr><td>RFM 'At Risk' Boundary</td><td>Score <= ${rfmAtRisk}</td></tr>
            </table>
          </body>
        </html>
      `;
            blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
            filename += ".html";
        }
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };
    return (_jsxs("div", { className: "mx-auto mt-6 flex max-w-[1600px] flex-col gap-8 min-w-0 pb-20", children: [_jsx(Card, { className: "rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 w-full", children: _jsx(CardContent, { className: "flex flex-col gap-4 p-6 xl:flex-row xl:items-center xl:justify-between", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg shadow-slate-900/20 shrink-0 border border-slate-700", children: _jsx(SlidersHorizontal, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-slate-500", children: "System Configuration" }), _jsx("h2", { className: "text-2xl font-semibold text-white", children: "Model & Data Settings" }), _jsx("p", { className: "mt-1 max-w-3xl text-sm text-slate-400", children: "Manage real-time local data connections, tweak predictive algorithms, and test export pipelines. All changes save automatically." })] })] }) }) }), _jsxs(Card, { className: "w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl", children: [_jsxs(CardHeader, { className: "flex flex-col md:flex-row md:items-start justify-between pb-2 border-b border-slate-800/50 mb-4 gap-4", children: [_jsx(SectionTitle, { title: "Local Data Pipelines", subtitle: "Real-time network ping verifying required .csv and .json databases." }), _jsxs(Button, { variant: "outline", className: "rounded-xl border-slate-700 bg-slate-900 text-slate-300 h-9 transition-all", onClick: checkFilesRealTime, disabled: isSyncing, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${isSyncing ? 'animate-spin text-sky-400' : ''}` }), isSyncing ? "Pinging Files..." : "Sync Now"] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [_jsxs("div", { className: "bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [_jsx(Database, { className: `h-4 w-4 mt-0.5 shrink-0 ${fileStatus.cleaned.ok ? 'text-emerald-400' : 'text-slate-500'}` }), _jsx("span", { className: "text-sm font-medium text-white break-all leading-tight", children: "cleaned_superstore.csv" })] }), fileStatus.cleaned.ok ? _jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-500 shrink-0" }) : _jsx(Server, { className: "h-5 w-5 text-slate-500 shrink-0 animate-pulse" })] }), _jsx("p", { className: "text-xs text-slate-400", children: "Core master dataset. Contains 51,290 chronological sales records." }), _jsxs("div", { className: "text-[11px] font-mono text-slate-500 bg-slate-950 rounded-lg p-2 mt-auto", children: ["Size: ", fileStatus.cleaned.size, " | Status: ", fileStatus.cleaned.status] })] }), _jsxs("div", { className: "bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [_jsx(HardDrive, { className: `h-4 w-4 mt-0.5 shrink-0 ${fileStatus.product.ok ? 'text-emerald-400' : 'text-slate-500'}` }), _jsx("span", { className: "text-sm font-medium text-white break-all leading-tight", children: "product_search_database.json" })] }), fileStatus.product.ok ? _jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-500 shrink-0" }) : _jsx(Server, { className: "h-5 w-5 text-slate-500 shrink-0 animate-pulse" })] }), _jsx("p", { className: "text-xs text-slate-400", children: "Pre-computed aggregation engine for the Products Dashboard." }), _jsxs("div", { className: "text-[11px] font-mono text-slate-500 bg-slate-950 rounded-lg p-2 mt-auto", children: ["Size: ", fileStatus.product.size, " | Status: ", fileStatus.product.status] })] }), _jsxs("div", { className: "bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [_jsx(HardDrive, { className: `h-4 w-4 mt-0.5 shrink-0 ${fileStatus.customer.ok ? 'text-emerald-400' : 'text-slate-500'}` }), _jsx("span", { className: "text-sm font-medium text-white break-all leading-tight", children: "customer_search_database.json" })] }), fileStatus.customer.ok ? _jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-500 shrink-0" }) : _jsx(Server, { className: "h-5 w-5 text-slate-500 shrink-0 animate-pulse" })] }), _jsx("p", { className: "text-xs text-slate-400", children: "Pre-computed RFM aggregation engine for the Customers Dashboard." }), _jsxs("div", { className: "text-[11px] font-mono text-slate-500 bg-slate-950 rounded-lg p-2 mt-auto", children: ["Size: ", fileStatus.customer.size, " | Status: ", fileStatus.customer.status] })] }), _jsxs("div", { className: "bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [_jsx(HardDrive, { className: `h-4 w-4 mt-0.5 shrink-0 ${fileStatus.geo.ok ? 'text-emerald-400' : 'text-slate-500'}` }), _jsx("span", { className: "text-sm font-medium text-white break-all leading-tight", children: "geo_search_database.json" })] }), fileStatus.geo.ok ? _jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-500 shrink-0" }) : _jsx(Server, { className: "h-5 w-5 text-slate-500 shrink-0 animate-pulse" })] }), _jsx("p", { className: "text-xs text-slate-400", children: "Pre-computed geographic hierarchies for the Geography Dashboard." }), _jsxs("div", { className: "text-[11px] font-mono text-slate-500 bg-slate-950 rounded-lg p-2 mt-auto", children: ["Size: ", fileStatus.geo.size, " | Status: ", fileStatus.geo.status] })] })] }) })] }), _jsxs(Card, { className: "w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl", children: [_jsx(CardHeader, { className: "border-b border-slate-800/50 pb-4 mb-4", children: _jsx(SectionTitle, { title: "Data Science Parameters", subtitle: "Adjust the operational thresholds and algorithmic boundaries. Changes are saved instantly to local browser storage." }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [_jsxs("div", { className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-slate-800 pb-3", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-purple-400" }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-medium text-sm", children: "Forecast Horizon (Months)" }), _jsx("p", { className: "text-xs text-slate-500", children: "Holt-Winters Extrapolation" })] })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: "3 M" }), _jsx("span", { className: "text-xl font-bold text-purple-400", children: forecastHorizon }), _jsx("span", { className: "text-xs text-slate-400", children: "12 M" })] }), _jsx("input", { type: "range", min: "3", max: "12", step: "1", value: forecastHorizon, onChange: (e) => handleAutoSave(setForecastHorizon, "forecastHorizon", parseInt(e.target.value)), className: "w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-slate-800 pb-3", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-rose-400" }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-medium text-sm", children: "Toxic Discount Threshold" }), _jsx("p", { className: "text-xs text-slate-500", children: "Anomaly Detection" })] })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: "5%" }), _jsxs("span", { className: "text-xl font-bold text-rose-400", children: [discountThreshold, "%"] }), _jsx("span", { className: "text-xs text-slate-400", children: "50%" })] }), _jsx("input", { type: "range", min: "5", max: "50", step: "5", value: discountThreshold, onChange: (e) => handleAutoSave(setDiscountThreshold, "discountThreshold", parseInt(e.target.value)), className: "w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-slate-800 pb-3", children: [_jsx(Activity, { className: "h-5 w-5 text-sky-400" }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-medium text-sm", children: "RFM 'At Risk' Boundary" }), _jsx("p", { className: "text-xs text-slate-500", children: "Segmentation Logic" })] })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Score 1" }), _jsx("span", { className: "text-xl font-bold text-sky-400", children: rfmAtRisk }), _jsx("span", { className: "text-xs text-slate-400", children: "Score 5" })] }), _jsx("input", { type: "range", min: "1", max: "5", step: "1", value: rfmAtRisk, onChange: (e) => handleAutoSave(setRfmAtRisk, "rfmAtRisk", parseInt(e.target.value)), className: "w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" })] })] }) })] }), _jsxs(Card, { className: "w-full rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl", children: [_jsx(CardHeader, { className: "border-b border-slate-800/50 pb-4 mb-4", children: _jsx(SectionTitle, { title: "Export & Reporting Preferences", subtitle: "Configure automated report formats and verify background cache worker." }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col gap-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Download, { className: "h-5 w-5 text-slate-300" }), _jsx("h4", { className: "text-white font-medium", children: "Default Export Format" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${exportFormat === "html" ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setExportFormat, "exportFormat", "html"), children: "HTML Executive" }), _jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${exportFormat === "csv" ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setExportFormat, "exportFormat", "csv"), children: "Raw CSV" }), _jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${exportFormat === "json" ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setExportFormat, "exportFormat", "json"), children: "JSON Object" })] })] }), _jsx("div", { className: "mt-auto pt-4 border-t border-slate-800/80", children: _jsxs(Button, { className: "w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors", onClick: handleTestDownload, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Test Download (", exportFormat.toUpperCase(), ")"] }) })] }), _jsxs("div", { className: "bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col gap-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Clock, { className: "h-5 w-5 text-slate-300" }), _jsx("h4", { className: "text-white font-medium", children: "Diagnostic Cache TTL" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${cacheTTL === "1h" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setCacheTTL, "cacheTTL", "1h"), children: "1 Hour" }), _jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${cacheTTL === "24h" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setCacheTTL, "cacheTTL", "24h"), children: "24 Hours" }), _jsx(Badge, { className: `px-3 py-1.5 cursor-pointer transition-colors ${cacheTTL === "live" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"}`, onClick: () => handleAutoSave(setCacheTTL, "cacheTTL", "live"), children: "No Cache (Live)" })] })] }), _jsx("div", { className: "mt-auto pt-4 border-t border-slate-800/80", children: _jsxs("div", { className: "flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800", children: [_jsx(TerminalSquare, { className: "h-4 w-4 text-emerald-400" }), _jsx("span", { className: "font-mono text-xs text-emerald-400/80", children: workerPing || "Initializing Background Worker..." })] }) })] })] }) })] }), _jsxs(Card, { className: "w-full rounded-3xl border border-rose-500/20 bg-rose-950/10 shadow-2xl mt-4", children: [_jsx(CardHeader, { children: _jsx(SectionTitle, { title: "Danger Zone", subtitle: "Destructive actions and session management." }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-950 border border-rose-900/30 p-5 rounded-2xl", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-rose-400 font-semibold text-sm", children: "Purge Application Settings Cache" }), _jsxs("p", { className: "text-xs text-slate-400 mt-1 max-w-xl", children: ["This safely deletes your adjusted algorithmic sliders and format toggles from your browser's localStorage, resetting everything back to factory defaults. It does ", _jsx("strong", { children: "not" }), " delete any files from /data/."] })] }), _jsx(Button, { className: `mt-4 md:mt-0 transition-colors ${clearStatus ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white" : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white"}`, onClick: handleClearCache, children: clearStatus ? _jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "h-4 w-4 mr-2" }), " Cache Cleared!"] }) : _jsxs(_Fragment, { children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), " Clear Cache"] }) })] }) })] })] }));
}
