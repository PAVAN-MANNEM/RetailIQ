import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
export default function ComingSoonPage({ title }) {
    return (_jsx(Card, { className: "rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-slate-500", children: "Coming soon" }), _jsx("h2", { className: "mt-2 text-2xl font-semibold text-white", children: title }), _jsx("p", { className: "mt-3 text-sm text-slate-400", children: "This page is wired into routing already. We will build its analytics view next." })] }) }));
}
