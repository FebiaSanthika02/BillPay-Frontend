import { ArrowRight, BadgeCheck, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200">
              <Shield className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
              Enterprise-grade security
              <span className="mx-1 h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <BadgeCheck className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
              SOC 2 ready
            </div>

            <h1 className="mt-6 text-display-sm text-balance sm:text-display lg:text-display-lg">
              <span className="text-slate-900 dark:text-white">Platform pembayaran </span>
              <span className="text-gradient">untuk tim modern.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Satu platform untuk arus kas, kartu, investasi, dan insight AI — cepat dibaca, aman dipakai, siap skala global.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                className="btn-gradient-animated inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-sm"
              >
                Lihat dashboard live
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#onboarding"
                className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
              >
                Alur onboarding
              </a>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200 pt-10 dark:border-white/[0.08]">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Settlement</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">&lt; 200ms</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Uptime</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">99.99%</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Negara</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">42+</dd>
              </div>
            </dl>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      <div className="relative animate-float rounded-3xl glass-panel p-1">
        <div className="rounded-[1.35rem] bg-white p-5 dark:bg-[#1E293B] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Net runway</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">18.4 bulan</p>
            </div>
            <span className="rounded-full border border-emerald-500/25 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Stabil
            </span>
          </div>
          <div className="mt-6 h-28 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/[0.06] dark:bg-[#0F172A]">
            <svg viewBox="0 0 320 96" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
              <path
                d="M0 72 C40 64 60 40 100 48 C140 56 160 24 200 32 C240 40 260 16 320 20"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="640"
                className="animate-chart-line"
              />
              <path
                d="M0 72 C40 64 60 40 100 48 C140 56 160 24 200 32 C240 40 260 16 320 20 L320 96 L0 96 Z"
                fill="#2563EB"
                opacity="0.08"
              />
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.06] dark:bg-[#0F172A]">
              <p className="text-xs text-slate-500">Inflow</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Rp 2,84 M</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.06] dark:bg-[#0F172A]">
              <p className="text-xs text-slate-500">Outflow</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Rp 1,92 M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
