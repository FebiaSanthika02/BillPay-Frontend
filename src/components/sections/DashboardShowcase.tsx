import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CreditCard,
  LayoutDashboard,
  PieChart,
  Settings2,
  Wallet,
} from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

const sidebar = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Wallet, label: "Treasury" },
  { icon: CreditCard, label: "Cards" },
  { icon: PieChart, label: "Analytics" },
  { icon: Settings2, label: "Settings" },
];

const rows = [
  { id: "TX-9021", merchant: "AWS", cat: "Infrastructure", date: "15 Mei", amount: "-$12.420", status: "Posted" },
  { id: "TX-9020", merchant: "Slack", cat: "SaaS", date: "15 Mei", amount: "-$480", status: "Posted" },
  { id: "TX-9018", merchant: "Stripe Payout", cat: "Inflow", date: "14 Mei", amount: "+$84.200", status: "Settled" },
  { id: "TX-9015", merchant: "Uber Business", cat: "Travel", date: "14 Mei", amount: "-$126", status: "Pending" },
];

export function DashboardShowcase() {
  const { ref, visible } = useReveal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SectionShell id="dashboard" className="pt-10 pb-14 sm:pt-11 sm:pb-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="Dashboard"
          title="Satu layar untuk keputusan keuangan harian"
          description="Hierarki visual yang tenang: angka besar, konteks kecil, aksi yang jelas — mirip kedisiplinan produk Stripe & Linear."
        />

        <div
          id="demo"
          className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start"
        >
          <aside className="glass-panel hidden self-start rounded-2xl lg:block">
            <div className="border-b border-slate-200/80 px-4 py-4 dark:border-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">BillPay HQ</p>
            </div>
            <nav className="p-2">
              {sidebar.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    i === 0
                      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="m-3 rounded-xl border border-dashed border-slate-200/90 p-3 text-xs text-slate-500 dark:border-white/[0.08] dark:text-slate-400">
              Sidebar ringkas agar fokus tetap pada data utama.
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {sidebar.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                    i === 0
                      ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                      : "border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { k: "Saldo operasional", v: "$1.24M", d: "+3.1% vs 30 hari" },
                { k: "Burn (net)", v: "$182k", d: "Di bawah budget" },
                { k: "Vendor aktif", v: "128", d: "12 baru minggu ini" },
              ].map((s) => (
                <div key={s.k} className="glass-panel rounded-2xl p-5 transition hover:-translate-y-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{s.k}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{s.v}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-300">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="glass-panel rounded-2xl p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Arus kas real-time</p>
                    <p className="mt-1 text-sm text-slate-500">Kurva halus, label minimal, fokus tren.</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Live
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </span>
                </div>

                <div className="mt-6 h-56 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.06] dark:bg-[#0F172A]">
                  {loading ? (
                    <div className="flex h-full flex-col gap-4 p-2">
                      <div className="skeleton h-6 w-40" />
                      <div className="skeleton mt-auto h-36 w-full" />
                    </div>
                  ) : (
                    <svg viewBox="0 0 520 200" className="h-full w-full" role="img" aria-label="Grafik arus kas">
                      {[0, 50, 100, 150].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y + 24}
                          x2="520"
                          y2={y + 24}
                          stroke="currentColor"
                          className="text-slate-200 dark:text-white/[0.06]"
                          strokeWidth="1"
                        />
                      ))}
                      <path
                        d="M0 150 C60 140 90 90 150 100 C210 110 240 60 300 70 C360 80 400 40 520 30"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="620"
                        className="animate-chart-line"
                      />
                      <path
                        d="M0 150 C60 140 90 90 150 100 C210 110 240 60 300 70 C360 80 400 40 520 30 L520 200 L0 200 Z"
                        fill="#2563EB"
                        opacity="0.08"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-white/[0.08] dark:bg-[#1E293B] dark:shadow-none">
                <div className="neo-surface-light rounded-2xl bg-white p-5 dark:neo-surface dark:bg-[#1E293B]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Balance card</p>
                    <ArrowUpRight className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                  </div>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">$482.920</p>
                  <p className="mt-1 text-sm text-slate-500">USD · Primary operating</p>
                  <div className="mt-6 flex gap-2">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                      Virtual
                    </span>
                    <span className="rounded-full border border-slate-200/90 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/[0.1] dark:text-slate-200">
                      Chip + PIN
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  Neumorphism halus pada kartu finansial: kedalaman tanpa noise visual.
                </p>
              </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="flex flex-col gap-2 border-b border-slate-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Riwayat transaksi</p>
                  <p className="text-xs text-slate-500">Tabel enterprise — ringkas, scan cepat.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.07]"
                >
                  Ekspor CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-3">ID</th>
                      <th className="px-5 py-3">Merchant</th>
                      <th className="hidden px-5 py-3 sm:table-cell">Kategori</th>
                      <th className="px-5 py-3">Tanggal</th>
                      <th className="px-5 py-3 text-right">Jumlah</th>
                      <th className="hidden px-5 py-3 md:table-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
                    {rows.map((r) => (
                      <tr key={r.id} className="transition hover:bg-slate-50/70 dark:hover:bg-white/[0.03]">
                        <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{r.id}</td>
                        <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{r.merchant}</td>
                        <td className="hidden px-5 py-3.5 text-slate-600 dark:text-slate-300 sm:table-cell">{r.cat}</td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{r.date}</td>
                        <td
                          className={`px-5 py-3.5 text-right font-semibold tabular-nums ${
                            r.amount.startsWith("+") ? "text-emerald-600 dark:text-emerald-300" : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {r.amount}
                        </td>
                        <td className="hidden px-5 py-3.5 md:table-cell">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              r.status === "Pending"
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
