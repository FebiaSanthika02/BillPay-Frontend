export function Footer() {
  return (
    <footer id="footer-cta" className="border-t border-slate-200 bg-white pb-36 pt-14 dark:border-white/[0.06] dark:bg-[#0F172A] sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/[0.08] dark:bg-[#1E293B] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-display-sm text-balance text-slate-900 dark:text-white">Siap tampil seperti produk global?</h2>
              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                BillPay adalah demo front-end. Hubungkan ke backend Anda untuk alur KYC, ledger, dan compliance sungguhan.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="work@company.com"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none ring-blue-500/25 placeholder:text-slate-400 focus:ring-2 dark:border-white/[0.1] dark:bg-[#0F172A] dark:text-white"
              />
              <button
                type="submit"
                className="btn-gradient-animated min-h-12 shrink-0 rounded-xl px-8 text-sm font-semibold text-white shadow-sm"
              >
                Minta akses
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-slate-200 pt-10 text-sm text-slate-600 dark:border-white/[0.06] dark:text-slate-400 md:flex-row">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">BillPay</p>
            <p className="mt-2 max-w-sm">Platform pembayaran modern — terinspirasi dari Stripe, Revolut, Brex, dan Wise.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a className="hover:text-slate-900 dark:hover:text-white" href="#dashboard">
              Dashboard
            </a>
            <a className="hover:text-slate-900 dark:hover:text-white" href="#harga">
              Harga
            </a>
            <a className="hover:text-slate-900 dark:hover:text-white" href="#">
              Privasi
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} BillPay demo.</p>
      </div>
    </footer>
  );
}
