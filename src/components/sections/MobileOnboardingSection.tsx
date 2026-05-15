import { CheckCircle2, Smartphone, UploadCloud } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

const steps = [
  { t: "Buat workspace", d: "Undang tim & set peran" },
  { t: "Hubungkan sumber dana", d: "Bank / processor mitra" },
  { t: "Aktifkan kartu", d: "Policy default aman" },
  { t: "Go live", d: "Monitoring 24/7" },
];

export function MobileOnboardingSection() {
  const { ref, visible } = useReveal();

  return (
    <SectionShell id="onboarding" className="border-y border-slate-200 bg-slate-50 py-14 dark:border-white/[0.06] dark:bg-[#162032] sm:py-16">
      <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
        <SectionHeader
          eyebrow="Mobile & onboarding"
          title="Onboarding cepat, KYC yang jelas, aplikasi mobile tenang"
          description="Alur linear seperti produk unicorn: sedikit langkah, banyak konteks visual."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-[280px] sm:w-[320px]">
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-glass-light dark:border-white/[0.1] dark:bg-[#1E293B] dark:shadow-glass">
                <div className="rounded-[2rem] bg-slate-950 p-4 text-white dark:bg-black">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>9:41</span>
                    <Smartphone className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="mt-6 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <p className="text-xs text-slate-400">Saldo</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">$128.400</p>
                    <div className="mt-4 h-24 rounded-xl bg-blue-500/10" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Kirim", "Kartu", "Insight"].map((x) => (
                      <div key={x} className="rounded-xl bg-white/[0.05] px-2 py-3 text-center text-[11px] font-semibold text-slate-200">
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">Mobile app preview (mock)</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Modern onboarding flow</p>
              <ol className="mt-6 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-900 dark:border-white/[0.1] dark:bg-[#1E293B] dark:text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.t}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <UploadCloud className="mt-0.5 h-5 w-5 text-blue-500 dark:text-blue-300" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">KYC verification UI</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Upload dokumen dengan status progres yang jelas.</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300/90 bg-slate-50/80 px-4 py-10 text-center text-sm text-slate-600 dark:border-white/[0.12] dark:bg-white/[0.03] dark:text-slate-300">
                Seret KTP / paspor ke sini
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                OCR + liveness check (ilustrasi)
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
