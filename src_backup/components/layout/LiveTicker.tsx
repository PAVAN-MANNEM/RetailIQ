import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const messages = [
  "Revenue is up 12.4% month-over-month",
  "Technology category leads weekly sales",
  "Discount-heavy orders are pressuring margins",
  "West region shows the fastest profit growth",
  "Premium products drive the highest AOV",
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-950/70">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Live executive pulse</p>
          <p className="truncate text-sm text-slate-200">{messages[index]}</p>
        </div>
        <Badge className="rounded-full bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15">
          Active
        </Badge>
      </CardContent>
    </Card>
  );
}