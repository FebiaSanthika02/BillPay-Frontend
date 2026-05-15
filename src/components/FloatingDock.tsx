import { ArrowRight, MessageCircle } from "lucide-react";

export function FloatingDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-0 sm:px-5 sm:pb-4">
      <div className="pointer-events-auto flex w-full max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pl-3 shadow-glass-light dark:border-white/[0.08] dark:bg-[#1E293B] dark:shadow-glass sm:gap-3 sm:pl-4">
        <p className="hidden min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">
          Aktifkan workspace tim — onboarding &lt; 10 menit.
        </p>
        <a
          href="#harga"
          className="btn-gradient-animated inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          Mulai gratis
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export function FloatingAiButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pointer-events-auto fixed bottom-28 right-3 z-[45] flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-[1.05rem] bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.97] sm:bottom-32 sm:right-5 sm:h-[3.75rem] sm:w-[3.75rem] sm:rounded-[1.15rem]"
      aria-label="Buka asisten AI"
    >
      <MessageCircle className="h-[1.35rem] w-[1.35rem] text-white sm:h-6 sm:w-6" strokeWidth={1.65} />
      <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-300 ring-2 ring-white dark:ring-[#0F172A]" />
      </span>
    </button>
  );
}
