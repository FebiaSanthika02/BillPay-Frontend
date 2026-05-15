import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransactions,
  updateTransaction,
  formatRupiah,
  type NewTransaction,
  type Summary,
  type Transaction,
} from "../../lib/api";
import { SectionHeader, SectionShell } from "../Navbar";
import { useReveal } from "../../hooks/useReveal";

const CATEGORIES_INCOME = ["Penjualan", "Jasa", "Afiliasi", "Investasi", "Lainnya"];
const CATEGORIES_EXPENSE = [
  "Infrastruktur",
  "SaaS",
  "Marketing",
  "Payroll",
  "Transportasi",
  "Utilitas",
  "Lainnya",
];

const TODAY = new Date().toISOString().slice(0, 10);

const EMPTY_FORM: NewTransaction = {
  type: "income",
  amount: 0,
  description: "",
  category: "Penjualan",
  date: TODAY,
};

function SummaryCard({
  label,
  value,
  sub,
  icon: Icon,
  variant,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  variant: "blue" | "green" | "red";
}) {
  const colors = {
    blue: "bg-blue-600 text-white",
    green: "bg-emerald-500 text-white",
    red: "bg-rose-500 text-white",
  };
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-2 truncate text-xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{sub}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[variant]}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
    </div>
  );
}

function TransactionRow({
  tx,
  onDelete,
  onEdit,
}: {
  tx: Transaction;
  onDelete: (id: number) => void;
  onEdit: (tx: Transaction) => void;
}) {
  const isIncome = tx.type === "income";
  return (
    <tr className="group transition hover:bg-slate-50 dark:hover:bg-white/[0.03]">
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isIncome
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
          }`}
        >
          {isIncome ? (
            <ArrowDownLeft className="h-3 w-3" strokeWidth={2} />
          ) : (
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          )}
          {isIncome ? "Pemasukan" : "Pengeluaran"}
        </span>
      </td>
      <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{tx.description}</td>
      <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">{tx.category}</td>
      <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">
        {new Date(tx.date + "T00:00:00").toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td
        className={`px-5 py-3.5 text-right font-semibold tabular-nums ${
          isIncome ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-400"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatRupiah(tx.amount)}
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(tx)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.07] dark:hover:text-white"
            aria-label="Edit"
          >
            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(tx.id)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
            aria-label="Hapus"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function TransactionModal({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: NewTransaction & { id?: number };
  onClose: () => void;
  onSave: (data: NewTransaction & { id?: number }) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(initial);
    setError("");
  }, [initial, open]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      const t = setTimeout(
        () => amountRef.current?.focus({ preventScroll: true }),
        120
      );
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [open, onClose]);

  const categories =
    form.type === "income" ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Deskripsi wajib diisi.");
    if (!form.amount || form.amount <= 0) return setError("Jumlah harus lebih dari 0.");
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const isIncome = form.type === "income";
  const accentBg   = isIncome ? "bg-emerald-500" : "bg-rose-500";
  const accentText = isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";

  const fieldCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-white/[0.07]";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#1A2535]">

        {/* Accent bar top */}
        <div className={`h-1 w-full ${accentBg}`} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentBg}`}>
              {isIncome
                ? <TrendingUp  className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
                : <TrendingDown className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />}
            </span>
            <div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                {form.id ? "Edit Transaksi" : "Tambah Transaksi"}
              </p>
              <p className={`text-xs font-medium ${accentText}`}>
                {isIncome ? "Pemasukan" : "Pengeluaran"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.08] dark:hover:text-white"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">

          {/* Tipe toggle */}
          <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/[0.07] dark:bg-white/[0.03]">
            {(["income", "expense"] as const).map((t) => {
              const active = form.type === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({
                    ...f, type: t,
                    category: t === "income" ? "Penjualan" : "Infrastruktur",
                  }))}
                  className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? t === "income"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-rose-500 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                  }`}
                >
                  {t === "income"
                    ? <TrendingUp  className="h-4 w-4" strokeWidth={2} />
                    : <TrendingDown className="h-4 w-4" strokeWidth={2} />}
                  {t === "income" ? "Pemasukan" : "Pengeluaran"}
                </button>
              );
            })}
          </div>

          {/* Jumlah */}
          <div>
            <label className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Jumlah (Rp)</span>
              {form.amount > 0 && (
                <span className={`text-xs font-semibold ${accentText}`}>{formatRupiah(form.amount)}</span>
              )}
            </label>
            <input
              ref={amountRef}
              type="number"
              min="1"
              step="any"
              required
              value={form.amount || ""}
              onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
              placeholder="Contoh: 1999888"
              className={`${fieldCls} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Deskripsi
            </label>
            <input
              type="text"
              required
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Contoh: Stripe Payout Mei"
              className={fieldCls}
            />
          </div>

          {/* Kategori & Tanggal — 2 kolom */}
          <div className="grid grid-cols-2 gap-3">
            {/* Kategori — custom arrow */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className={`${fieldCls} appearance-none pr-9`}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
              </div>
            </div>
            {/* Tanggal — color-scheme agar icon kalender ikut tema */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Tanggal
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className={`${fieldCls} [color-scheme:light] dark:[color-scheme:dark]`}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-white/[0.06]" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/[0.08] dark:text-slate-300 dark:hover:bg-white/[0.04]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 ${accentBg}`}
            >
              {saving ? (
                "Menyimpan…"
              ) : form.id ? (
                "Simpan Perubahan"
              ) : (
                <>
                  {isIncome
                    ? <TrendingUp  className="h-4 w-4" strokeWidth={2} />
                    : <TrendingDown className="h-4 w-4" strokeWidth={2} />}
                  {isIncome ? "Tambah Pemasukan" : "Tambah Pengeluaran"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export function TransactionSection() {
  const { ref, visible } = useReveal();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<(NewTransaction & { id?: number }) | null>(null);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const [s, t] = await Promise.all([
        getSummary(),
        getTransactions(filter !== "all" ? { type: filter } : undefined),
      ]);
      setSummary(s);
      setTransactions(t);
    } catch {
      setError("Tidak dapat terhubung ke backend. Pastikan server berjalan di port 3001.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  const handleSave = async (data: NewTransaction & { id?: number }) => {
    if (data.id) {
      await updateTransaction(data.id, data);
    } else {
      await createTransaction(data);
    }
    await load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus transaksi ini?")) return;
    setDeleting(id);
    try {
      await deleteTransaction(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (tx: Transaction) => {
    setEditTarget({ id: tx.id, type: tx.type, amount: tx.amount, description: tx.description, category: tx.category, date: tx.date });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditTarget({ ...EMPTY_FORM });
    setModalOpen(true);
  };

  const filtered = filter === "all"
    ? transactions
    : transactions.filter((t) => t.type === filter);

  return (
    <SectionShell id="transaksi" className="border-y border-slate-200 bg-slate-50 py-14 dark:border-white/[0.06] dark:bg-[#162032] sm:py-16">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${visible ? "reveal-visible" : ""}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Keuangan Real"
            title="Catat pemasukan & pengeluaran"
            description="Data tersimpan di database lokal. Tambah, edit, atau hapus transaksi secara langsung."
          />
          <button
            type="button"
            onClick={openAdd}
            className="btn-gradient-animated mb-8 inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm sm:self-auto"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Tambah transaksi
          </button>
        </div>

        {/* Error state */}
        {error ? (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-500/20 dark:bg-rose-500/10">
            <div className="flex-1 text-sm text-rose-700 dark:text-rose-300">{error}</div>
            <button
              type="button"
              onClick={() => { setLoading(true); load(); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
            >
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
              Coba lagi
            </button>
          </div>
        ) : null}

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Saldo Bersih"
            value={summary ? formatRupiah(summary.balance) : "—"}
            sub={summary ? `${summary.incomeCount + summary.expenseCount} total transaksi` : "Memuat…"}
            icon={Wallet}
            variant="blue"
          />
          <SummaryCard
            label="Total Pemasukan"
            value={summary ? formatRupiah(summary.income) : "—"}
            sub={summary ? `${summary.incomeCount} transaksi` : "Memuat…"}
            icon={TrendingUp}
            variant="green"
          />
          <SummaryCard
            label="Total Pengeluaran"
            value={summary ? formatRupiah(summary.expense) : "—"}
            sub={summary ? `${summary.expenseCount} transaksi` : "Memuat…"}
            icon={TrendingDown}
            variant="red"
          />
        </div>

        {/* Transaction table */}
        <div className="glass-panel overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Riwayat Transaksi</p>
              <p className="text-xs text-slate-500">{filtered.length} transaksi ditampilkan</p>
            </div>
            <div className="flex gap-1.5">
              {(["all", "income", "expense"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    filter === f
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300"
                  }`}
                >
                  {f === "all" ? "Semua" : f === "income" ? "Pemasukan" : "Pengeluaran"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col gap-3 p-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-12 w-full rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-14 text-center">
                <p className="text-sm text-slate-500">Belum ada transaksi. Klik "+ Tambah transaksi" untuk mulai.</p>
              </div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3">Tipe</th>
                    <th className="px-5 py-3">Deskripsi</th>
                    <th className="hidden px-5 py-3 sm:table-cell">Kategori</th>
                    <th className="hidden px-5 py-3 md:table-cell">Tanggal</th>
                    <th className="px-5 py-3 text-right">Jumlah</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
                  {filtered.map((tx) => (
                    <TransactionRow
                      key={tx.id}
                      tx={deleting === tx.id ? { ...tx, description: "Menghapus…" } : tx}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Category breakdown */}
        {summary && summary.byCategory.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {(["income", "expense"] as const).map((t) => {
              const cats = summary.byCategory.filter((c) => c.type === t);
              if (cats.length === 0) return null;
              const max = Math.max(...cats.map((c) => c.total));
              return (
                <div key={t} className="glass-panel rounded-2xl p-6">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t === "income" ? "Pemasukan per kategori" : "Pengeluaran per kategori"}
                  </p>
                  <div className="mt-5 space-y-4">
                    {cats.map((c) => (
                      <div key={c.category}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{c.category}</span>
                          <span className="tabular-nums text-slate-500">{formatRupiah(c.total)}</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.06]">
                          <div
                            className={`h-full rounded-full transition-all ${
                              t === "income" ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${(c.total / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <TransactionModal
        open={modalOpen}
        initial={editTarget ?? { ...EMPTY_FORM }}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </SectionShell>
  );
}
