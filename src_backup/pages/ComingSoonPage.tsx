import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40">
      <CardContent className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Coming soon</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-sm text-slate-400">
          This page is wired into routing already. We will build its analytics view next.
        </p>
      </CardContent>
    </Card>
  );
}