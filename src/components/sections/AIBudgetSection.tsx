import { CalendarDays, Sparkles, Wallet2 } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

export function AIBudgetSection() {
  const { ref, visible } = useReveal();

  return (
    <SectionShell id="ai" className="py-14 sm:py-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="AI & perencanaan"
          title="Asisten finansial yang menjelaskan, bukan membingungkan"
          description="Ringkasan otomatis, peringatan anomali, dan rencana anggaran yang bisa diedit tanpa spreadsheet."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Sparkles className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">AI financial assistant</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Bahasa natural untuk tim non-finansial. Setiap insight punya sumber data yang bisa dilacak.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              {["Deteksi duplikasi vendor", "Forecast runway 13 minggu", "Rekomendasi alokasi kas"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Budgeting planner</p>
                  <CalendarDays className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { k: "R&D", cur: 62, max: 100 },
                    { k: "GTM", cur: 44, max: 100 },
                    { k: "Ops", cur: 28, max: 100 },
                  ].map((b) => (
                    <div key={b.k}>
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <span>{b.k}</span>
                        <span className="tabular-nums text-slate-500">{b.cur}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-200/80 dark:bg-white/[0.06]">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${b.cur}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Transfer money</p>
                  <Wallet2 className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                </div>
                <div className="mt-5 space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Ke rekening</label>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-white/[0.08] dark:bg-[#0F172A] dark:text-white">
                    BillPay Treasury · **** 8210
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Jumlah</p>
                      <p className="mt-2 text-lg font-semibold tabular-nums text-slate-900 dark:text-white">$25.000</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Biaya</p>
                      <p className="mt-2 text-lg font-semibold tabular-nums text-emerald-600 dark:text-emerald-300">$0</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-gradient-animated mt-2 w-full rounded-xl py-3 text-sm font-semibold text-white shadow-md"
                  >
                    Konfirmasi transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
