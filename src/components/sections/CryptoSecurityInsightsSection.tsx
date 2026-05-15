import { Cpu, LineChart, LockKeyhole, Shield } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

export function CryptoSecurityInsightsSection() {
  const { ref, visible } = useReveal();

  return (
    <SectionShell className="py-14 sm:py-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="Crypto · Keamanan · AI insight"
          title="Eksposur digital modern tanpa gimmick visual"
          description="Gaya cyber-minimal: garis tipis, glow halus pada node penting, angka tetap protagonis."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Alokasi digital (demo)</p>
            <p className="mt-1 text-sm text-slate-500">Gaya portofolio kripto modern — tetap enterprise.</p>
            <div className="mt-8 flex items-center gap-8">
              <div className="relative mx-auto h-40 w-40">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/[0.08]" strokeWidth="14" />
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="14"
                    strokeDasharray="276"
                    strokeDashoffset="70"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">12%</p>
                </div>
              </div>
              <ul className="flex-1 space-y-3 text-sm">
                {[
                  { l: "BTC", v: "5.2%" },
                  { l: "ETH", v: "4.1%" },
                  { l: "Stable", v: "2.7%" },
                ].map((x) => (
                  <li key={x.l} className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{x.l}</span>
                    <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{x.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/[0.08] dark:bg-[#1E293B]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Shield className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
                  Security / trust
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["SOC 2 Type II", "PCI DSS", "ISO 27001", "GDPR-ready"].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-blue-500/15 bg-blue-500/5 p-3 text-xs text-slate-600 dark:text-slate-300">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" strokeWidth={1.75} />
                  Enkripsi end-to-end untuk pesan sensitif antar anggota tim — visual trust tanpa noise.
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/[0.08] dark:bg-[#1E293B]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <LineChart className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                  Real-time chart aesthetic
                </div>
                <div className="mt-4 h-28 rounded-xl border border-slate-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[#0F172A]">
                  <svg viewBox="0 0 280 80" className="h-full w-full">
                    <path
                      d="M0 60 L40 52 L80 58 L120 30 L160 38 L200 22 L240 28 L280 18"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="400"
                      className="animate-chart-line"
                    />
                  </svg>
                </div>
                <p className="mt-3 text-xs text-slate-500">Kurva tipis + glow lembut pada titik infleksi.</p>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">AI-powered finance insights</p>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-200">
                  <Cpu className="h-3.5 w-3.5" strokeWidth={2} />
                  Model guardrails on
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { t: "Likuiditas", d: "Buffer 21 hari di atas minimum policy." },
                  { t: "Vendor risk", d: "2 vendor naik skor risiko minggu ini." },
                  { t: "Hemat biaya", d: "Rekomendasi konsolidasi SaaS ~$4.1k/bulan." },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[0.08] dark:bg-[#1E293B] dark:shadow-none"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
