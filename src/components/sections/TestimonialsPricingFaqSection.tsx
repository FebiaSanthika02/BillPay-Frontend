import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeader, SectionShell } from "../Navbar";

const testimonials = [
  {
    q: "Board pack kami turun dari 40 halaman ke 6. Angka tetap akurat.",
    name: "Elena Park",
    role: "CFO, B2B SaaS",
  },
  {
    q: "Tim non-financial akhirnya paham runway tanpa Zoom tambahan.",
    name: "Marcus Lee",
    role: "COO, Logistics",
  },
  {
    q: "Kartu virtual + policy otomatis mengurangi leak vendor 30%+.",
    name: "Aisha Rahman",
    role: "Head of Ops, Fintech",
  },
];

const faqs = [
  {
    q: "Apakah ini layanan keuangan sungguhan?",
    a: "Tidak. Ini demo UI produksi-level untuk portofolio. Integrasi bank/KYC asli memerlukan lisensi dan mitra.",
  },
  {
    q: "Bagaimana keamanan data ditampilkan?",
    a: "Kami menonjolkan prinsip zero-trust, enkripsi transit/at-rest, dan kontrol peran — pola enterprise yang familiar.",
  },
  {
    q: "Apakah mendukung multi-mata uang?",
    a: "Ya, desain mendukung ledger multi-currency dengan settlement cepat dan audit trail.",
  },
  {
    q: "Bisakah disesuaikan untuk startup lebih kecil?",
    a: "Modul dapat diaktifkan bertahap: mulai dari kartu & pengeluaran, lalu treasury lanjutan.",
  },
];

export function TestimonialsPricingFaqSection() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState(-1);

  return (
    <>
      <SectionShell className="py-14 sm:py-16">
        <div ref={ref} className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}>
          <SectionHeader
            eyebrow="Social proof"
            title="Dipercaya tim yang ingin kecepatan tanpa kekacauan"
            description="Testimonial singkat — cukup bukti, tidak berlebihan."
            align="center"
          />
          <ul className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="glass-panel rounded-2xl p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">“{t.q}”</p>
                <div className="mt-6 border-t border-slate-200/70 pt-5 dark:border-white/[0.06]">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <SectionShell id="harga" className="border-y border-slate-200 bg-slate-50 py-14 dark:border-white/[0.06] dark:bg-[#162032] sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="Harga yang tenang, seperti produk SaaS global"
            description="Tiga tier — tidak membingungkan. Fokus pada outcome, bukan fitur panjang."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { name: "Launch", price: "$0", desc: "Starter untuk tim kecil", feat: ["5 kartu", "Export CSV", "AI ringkas"] },
              { name: "Scale", price: "$499", desc: "Untuk operasi kompleks", feat: ["Policy engine", "API treasury", "SLA"], highlight: true },
              { name: "Enterprise", price: "Custom", desc: "Kontrol penuh & SSO", feat: ["Dedicated CSM", "BYOK", "Audit pack"] },
            ].map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  p.highlight
                    ? "border-blue-500/40 bg-blue-50 dark:border-blue-500/25 dark:bg-blue-500/[0.07]"
                    : "border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]"
                }`}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                    Paling dipilih
                  </span>
                ) : null}
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">{p.price}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {p.feat.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#footer-cta"
                  className={`mt-8 inline-flex justify-center rounded-full py-3 text-sm font-semibold ${
                    p.highlight
                      ? "btn-gradient-animated text-white shadow-md"
                      : "border border-slate-200/80 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:text-white dark:hover:bg-white/[0.05]"
                  }`}
                >
                  Hubungi sales
                </a>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Jawaban singkat untuk pertanyaan umum" align="center" />
          <div className="mt-10 divide-y divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-white/70 dark:divide-white/[0.06] dark:border-white/[0.08] dark:bg-white/[0.03]">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="px-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.75}
                    />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </>
  );
}
