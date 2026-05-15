import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, Trash2, X } from "lucide-react";
import { fetchAssistantReply, type ChatTurn } from "../lib/chatFinance";

const suggestions = ["Ringkas pengeluaran minggu ini", "Prediksi saldo 30 hari", "Cek anomali transaksi"];

type Msg = { id: string; role: "user" | "assistant"; text: string };

const welcome: Msg = {
  id: "welcome",
  role: "assistant",
  text: "Halo — saya BillPay AI, asisten keuangan Anda. Tanyakan soal arus kas, pengeluaran, saldo, runway, atau anomali transaksi.",
};

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 dark:bg-slate-500"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}

export function AIChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([welcome]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, loading, open, scrollBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const priorHistory: ChatTurn[] = messages.map((m) => ({ role: m.role, content: m.text }));
      const userMsg: Msg = { id: id(), role: "user", text };

      setInput("");
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const reply = await fetchAssistantReply(text, priorHistory);
        setMessages((prev) => [...prev, { id: id(), role: "assistant", text: reply }]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Gagal menghubungi server.";
        setMessages((prev) => [
          ...prev,
          {
            id: id(),
            role: "assistant",
            text: `Maaf, terjadi kesalahan: ${msg}. Periksa URL API atau coba lagi.`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  const clearChat = useCallback(() => {
    setMessages([welcome]);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-[3px] transition-opacity duration-300 dark:bg-black/55 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={onClose}
      />
      <aside
        className={`fixed bottom-0 right-0 z-[60] flex w-full max-w-[400px] flex-col border-l border-slate-200 bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.10)] transition-transform duration-300 ease-out dark:border-white/[0.08] dark:bg-[#1E293B] dark:shadow-[0_-12px_48px_rgba(0,0,0,0.4)] sm:bottom-5 sm:right-5 sm:top-[4.5rem] sm:h-[min(640px,calc(100dvh-5.5rem))] sm:max-h-[640px] sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl dark:sm:border-white/[0.08] ${
          open ? "translate-x-0" : "translate-x-full sm:translate-x-[calc(100%+1rem)]"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Asisten keuangan AI"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-3.5 dark:border-white/[0.06] dark:bg-[#1E293B] sm:rounded-t-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <Bot className="h-5 w-5 text-white" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">BillPay AI</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {import.meta.env.VITE_CHAT_API_URL ? "Terhubung ke API" : "Mode demo · balasan lokal"}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-white/[0.06] dark:hover:text-white"
                aria-label="Hapus percakapan"
                title="Hapus percakapan"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 text-slate-600 transition hover:bg-slate-50 dark:border-white/[0.1] dark:text-slate-300 dark:hover:bg-white/[0.06]"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </header>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" ? (
                <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-slate-200/80 bg-slate-50/90 px-3.5 py-3 text-sm leading-relaxed text-slate-800 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.05] dark:text-slate-100">
                  {m.id === "welcome" ? (
                    <div className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-sky-300" strokeWidth={1.75} />
                      <span>{m.text}</span>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              ) : (
                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-blue-600 px-3.5 py-3 text-sm leading-relaxed text-white shadow-sm dark:bg-blue-500 dark:text-white">
                  {m.text}
                </div>
              )}
            </div>
          ))}
          {loading ? (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-slate-200/80 bg-slate-50/90 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.05]">
                <TypingDots />
              </div>
            </div>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 dark:border-white/[0.06] dark:bg-[#1E293B] sm:rounded-b-2xl">
          <div className="mb-2.5 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                className="rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07]"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan…"
              disabled={loading}
              className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none ring-blue-500/25 placeholder:text-slate-400 focus:border-blue-500/40 focus:bg-white focus:ring-2 disabled:opacity-60 dark:border-white/[0.1] dark:bg-[#0F172A] dark:text-white dark:focus:border-blue-500/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40"
              aria-label="Kirim"
            >
              <Send className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
