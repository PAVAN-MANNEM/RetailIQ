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
  return (
    <BrowserRouter>
      <ScrollToTop />
        <Routes>
        <Route element={<DashboardShell />}>
          <Route index element={<ExecutiveDashboardPage />} />
          <Route path="sales" element={<SalesPerformance />} />
          <Route path="profitability" element={<Profitability />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="geography" element={<Geography />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}