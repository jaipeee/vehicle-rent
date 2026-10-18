const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const KEY = "admin_token";

export class AdminAuthError extends Error {}

export const getToken = () => (typeof window === "undefined" ? null : localStorage.getItem(KEY));
export const setToken = (t: string) => localStorage.setItem(KEY, t);
export const clearToken = () => localStorage.removeItem(KEY);

export async function adminLogin(password: string) {
  const res = await fetch(`${BASE}/2906/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message ?? "Login failed");
  setToken(json.data.token);
}

export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isForm = options.body instanceof FormData;
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${getToken() ?? ""}`,
      ...options.headers,
    },
  });
  const json = await res.json().catch(() => null);
  if (res.status === 401) {
    clearToken();
    throw new AdminAuthError("Session expired");
  }
  if (!res.ok) throw new Error(json?.message ?? `Request failed (${res.status})`);
  return json?.data as T;
}

// Clears the Next.js page cache so edits show immediately.
export async function revalidateSite() {
  await fetch("/api/revalidate", {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken() ?? ""}` },
  }).catch(() => {});
}