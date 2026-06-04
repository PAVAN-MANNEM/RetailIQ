import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./layout/ScrollToTop";
import DashboardShell from "./layout/DashboardShell";
import ExecutiveDashboardPage from "./pages/ExecutiveDashboardPage";
import SalesPerformance from "./pages/SalesPerformance";
import Profitability from "./pages/Profitability";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Geography from "./pages/Geography";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(ScrollToTop, {}), _jsx(Routes, { children: _jsxs(Route, { element: _jsx(DashboardShell, {}), children: [_jsx(Route, { index: true, element: _jsx(ExecutiveDashboardPage, {}) }), _jsx(Route, { path: "sales", element: _jsx(SalesPerformance, {}) }), _jsx(Route, { path: "profitability", element: _jsx(Profitability, {}) }), _jsx(Route, { path: "customers", element: _jsx(Customers, {}) }), _jsx(Route, { path: "products", element: _jsx(Products, {}) }), _jsx(Route, { path: "geography", element: _jsx(Geography, {}) }), _jsx(Route, { path: "reports", element: _jsx(Reports, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) })] }) })] }));
}
