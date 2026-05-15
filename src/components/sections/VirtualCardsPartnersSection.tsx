import { Lock, ShieldCheck } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

const partners = ["Stripe", "Visa", "Mastercard", "Plaid", "Workday", "SAP"];

export function VirtualCardsPartnersSection() {
  const { ref, visible } = useReveal();

  return (
    <SectionShell id="kartu" className="border-y border-slate-200 bg-slate-50 py-14 dark:border-white/[0.06] dark:bg-[#162032] sm:py-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="Kartu virtual"
          title="Kartu untuk setiap tim, limit untuk setiap risiko"
          description="Pola Ramp/Brex: kartu terpisah, kebijakan otomatis, audit siap regulator."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { t: "Marketing", last: "•••• 9021", lim: "$12k/mo", accent: "border-t-2 border-t-blue-600" },
            { t: "Engineering", last: "•••• 4410", lim: "$6k/mo", accent: "border-t-2 border-t-violet-600" },
            { t: "Travel", last: "•••• 7732", lim: "$3k/mo", accent: "border-t-2 border-t-emerald-600" },
          ].map((c) => (
            <div key={c.t} className={`relative overflow-hidden rounded-2xl glass-panel p-6 transition hover:-translate-y-0.5 ${c.accent}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.t}</p>
                  <p className="mt-3 font-mono text-lg tracking-[0.2em] text-slate-900 dark:text-white">{c.last}</p>
                </div>
                <Lock className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/[0.06]">
                <p className="text-xs text-slate-500">Limit</p>
                <p className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">{c.lim}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200/80 bg-white/60 p-6 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 text-blue-500 dark:text-blue-300" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Trusted by modern finance teams</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Integrasi & jaringan yang dikenal pasar global.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {partners.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/[0.08] dark:bg-[#1E293B] dark:text-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
