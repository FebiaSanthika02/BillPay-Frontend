import { TrendingUp } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

export function InvestmentExpenseSection() {
  const { ref, visible } = useReveal();

  return (
    <SectionShell id="invest" className="border-y border-slate-200 bg-slate-50 py-14 dark:border-white/[0.06] dark:bg-[#162032] sm:py-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="Portofolio & pengeluaran"
          title="Investasi terukur. Pengeluaran terbaca."
          description="Visual ringkas untuk user awam: alokasi aset jelas, kategori pengeluaran tidak membingungkan."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Investment tracking</p>
                <p className="mt-1 text-sm text-slate-500">Rebalancing otomatis mingguan (demo).</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
                +4.2%
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: "Pas obligasi", p: "42%", c: "bg-blue-600" },
                { n: "Saham global", p: "28%", c: "bg-violet-600" },
                { n: "Crypto (hedge)", p: "12%", c: "bg-amber-500" },
                { n: "Kas & MMF", p: "18%", c: "bg-emerald-600" },
              ].map((x) => (
                <div key={x.n} className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <div className={`h-1.5 rounded-full ${x.c}`} />
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">{x.n}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{x.p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Expense analytics</p>
            <p className="mt-1 text-sm text-slate-500">Batang halus + label singkat — hindari grafik ramai.</p>
            <div className="mt-8 space-y-5">
              {[
                { l: "SaaS", v: 72, amt: "$18.2k" },
                { l: "Payroll", v: 88, amt: "$112k" },
                { l: "Iklan", v: 54, amt: "$9.4k" },
                { l: "Utilitas", v: 36, amt: "$2.1k" },
              ].map((b) => (
                <div key={b.l}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{b.l}</span>
                    <span className="tabular-nums text-slate-500">{b.amt}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${b.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
