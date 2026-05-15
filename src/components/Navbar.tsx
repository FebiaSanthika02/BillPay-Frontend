import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

const nav = [
  { href: "#transaksi", label: "Transaksi" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#invest", label: "Investasi" },
  { href: "#ai", label: "AI" },
  { href: "#kartu", label: "Kartu" },
  { href: "#harga", label: "Harga" },
];

export function Navbar({ onOpenAi }: { onOpenAi?: () => void }) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-[#0F172A]"
          : "border-b border-transparent bg-white/80 backdrop-blur-md dark:bg-[#0F172A]/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            BP
          </span>
          <span className="hidden sm:inline">BillPay</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Utama">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {onOpenAi ? (
            <button
              type="button"
              onClick={onOpenAi}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
              aria-label="Buka BillPay AI"
            >
              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />
              <span>BillPay AI</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-700 shadow-sm transition hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07]"
            aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />}
          </button>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
          >
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />
            Demo
          </a>
          <a
            href="#harga"
            className="btn-gradient-animated inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20"
          >
            Mulai
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {onOpenAi ? (
            <button
              type="button"
              onClick={onOpenAi}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 shadow-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
              aria-label="Buka BillPay AI"
            >
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-800 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white"
            aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white"
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobilePanel open={open} onClose={() => setOpen(false)} onOpenAi={onOpenAi} />
    </header>
  );
}

function MobilePanel({
  open,
  onClose,
  onOpenAi,
}: {
  open: boolean;
  onClose: () => void;
  onOpenAi?: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 top-16 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity dark:bg-black/50 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Tutup overlay"
      />
      <div
        className={`relative ml-auto flex h-[calc(100dvh-4rem)] w-[min(100%,20rem)] flex-col border-l border-slate-200 bg-white p-4 shadow-xl transition-transform dark:border-white/[0.08] dark:bg-[#1E293B] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 pt-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/[0.06]"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/80 pt-4 dark:border-white/[0.08]">
          {onOpenAi ? (
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200/80 py-3 text-sm font-semibold text-slate-800 dark:border-white/[0.1] dark:text-white"
              onClick={() => {
                onClose();
                onOpenAi();
              }}
            >
              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />
              BillPay AI
            </button>
          ) : null}
          <a
            href="#harga"
            className="btn-gradient-animated flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
            onClick={onClose}
          >
            Mulai sekarang
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <div className={`mb-8 sm:mb-10 ${wrap}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-display-sm sm:text-display text-balance text-slate-900 dark:text-white">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}

export function SectionShell({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-[5.25rem] ${className}`}>
      {children}
    </section>
  );
}
