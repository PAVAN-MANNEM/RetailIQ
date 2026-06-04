import { jsx as _jsx } from "react/jsx-runtime";
import { useOutletContext } from "react-router-dom";
import ExecutiveDashboard from "./ExecutiveDashboard";
export default function ExecutiveDashboardPage() {
    const { role, controls } = useOutletContext();
    return _jsx(ExecutiveDashboard, { role: role, controls: controls });
}
