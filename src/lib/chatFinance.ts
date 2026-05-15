/**
 * Balasan chat: mode demo (mock) atau API Anda.
 *
 * **Aktifkan API backend (disarankan)**
 * 1. Buat endpoint POST yang menerima JSON: `{ "messages": [{ "role": "user"|"assistant", "content": string }] }`
 * 2. Di server, panggil OpenAI/Anthropic/dll dengan API key **hanya di server** (jangan expose key di browser).
 * 3. Kembalikan JSON: `{ "reply": string }`
 * 4. Set di `.env`: `VITE_CHAT_API_URL=https://domain-anda.com/api/chat`
 * 5. Pastikan CORS mengizinkan origin dev (localhost) jika API terpisah.
 *
 * Tanpa env: balasan mock otomatis (cukup untuk demo UI).
 */

export type ChatTurn = { role: "user" | "assistant"; content: string };

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function mockAssistantReply(userText: string): string {
  const t = userText.toLowerCase();

  if (t.includes("ringkas") || t.includes("pengeluaran") || t.includes("minggu"))
    return "Ringkasan (demo): pengeluaran terbesar minggu ini di kategori SaaS & infrastruktur cloud. Ada 3 invoice berulang yang naik tipis — layak ditinjau untuk negosiasi volume.";

  if (t.includes("prediksi") || t.includes("saldo") || t.includes("30 hari"))
    return "Proyeksi sederhana (demo): asumsi burn flat, buffer likuiditas cukup untuk ~18 minggu. Untuk prediksi produksi, sambungkan data arus kas aktual ke model di backend Anda.";

  if (t.includes("anomali") || t.includes("transaksi") || t.includes("mencurigakan"))
    return "Pemeriksaan cepat (demo): tidak ada lonjakan di luar pola jam kerja. Saran: aktifkan alert untuk transaksi &gt; $5.000 di akhir pekan.";

  if (t.includes("runway") || t.includes("burn"))
    return "Runway (demo): net burn mingguan stabil di bawah budget divisi R&amp;D. Jika hiring dipercepat, pertimbangkan reserve kas 10% tambahan.";

  if (t.includes("kartu") || t.includes("vendor"))
    return "Kartu virtual (demo): limit vendor marketing hampir 80%. Anda bisa menurunkan limit sementara atau meminta approval dua langkah untuk transaksi di atas ambang.";

  if (t.includes("halo") || t.includes("hai") || t.includes("hi"))
    return "Halo! Saya BillPay AI (mode demo). Tanyakan soal pengeluaran, runway, anomali transaksi, atau kartu.";

  return "Saya dalam mode demo. Pastikan backend berjalan di port 3001 dan VITE_CHAT_API_URL sudah diset di file .env.";
}

export async function fetchAssistantReply(userText: string, history: ChatTurn[]): Promise<string> {
  const url = import.meta.env.VITE_CHAT_API_URL?.trim();

  if (url) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...history, { role: "user", content: userText }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(errText || `HTTP ${res.status}`);
    }

    const data = (await res.json()) as { reply?: string; message?: string };
    const reply = data.reply ?? data.message;
    if (typeof reply === "string" && reply.trim()) return reply.trim();
    throw new Error("Format respons tidak valid: harus berisi { reply: string }.");
  }

  await delay(450 + Math.floor(Math.random() * 350));
  return mockAssistantReply(userText);
}
