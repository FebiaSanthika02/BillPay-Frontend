const BASE = (import.meta.env.VITE_API_URL || "https://billpay-backend-production.up.railway.app") + "/api";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
}

export interface Summary {
  income: number;
  incomeCount: number;
  expense: number;
  expenseCount: number;
  balance: number;
  byCategory: Array<{
    category: string;
    type: "income" | "expense";
    total: number;
    count: number;
  }>;
  monthly: Array<{
    month: string;
    income: number;
    expense: number;
  }>;
}

export type NewTransaction = Omit<Transaction, "id" | "created_at">;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getTransactions(params?: {
  limit?: number;
  type?: "income" | "expense";
}): Promise<Transaction[]> {
  const q = new URLSearchParams();
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.type) q.set("type", params.type);
  return handle(await fetch(`${BASE}/transactions?${q}`));
}

export async function getSummary(): Promise<Summary> {
  return handle(await fetch(`${BASE}/summary`));
}

export async function createTransaction(data: NewTransaction): Promise<Transaction> {
  return handle(
    await fetch(`${BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

export async function updateTransaction(
  id: number,
  data: NewTransaction
): Promise<Transaction> {
  return handle(
    await fetch(`${BASE}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

export async function deleteTransaction(id: number): Promise<void> {
  await handle(await fetch(`${BASE}/transactions/${id}`, { method: "DELETE" }));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
