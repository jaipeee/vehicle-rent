"use client";

import { useEffect, useState } from "react";
import { adminLogin, clearToken, getToken } from "@/lib/admin-api";
import { RESOURCES } from "@/features/admin/resources";
import { ResourceManager } from "@/features/admin/resource-manager";

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState(RESOURCES[0].id);

  useEffect(() => {
    setAuthed(!!getToken());
    setReady(true);
  }, []);

  const logout = () => {
    clearToken();
    setAuthed(false);
  };

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    try {
      await adminLogin(password);
      setPassword("");
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  if (!ready) return null;

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-xl font-extrabold text-slate-900">Admin login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loggingIn || !password}
            className="w-full rounded-lg bg-[#ea7236] py-2.5 font-bold text-white disabled:opacity-50"
          >
            {loggingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  const def = RESOURCES.find((r) => r.id === tab) ?? RESOURCES[0];

  return (
    <main className="min-h-screen bg-slate-50 pt-30">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-8">
          <h1 className="text-lg font-extrabold text-slate-900">Indiventra Admin</h1>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm font-semibold text-emerald-700 hover:underline">
              View site ↗
            </a>
            <button onClick={logout} className="text-sm font-semibold text-slate-600 hover:text-red-600">
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 lg:px-8">
          {RESOURCES.map((r) => (
            <button
              key={r.id}
              onClick={() => setTab(r.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold ${
                tab === r.id ? "border-[#ea7236] text-[#ea7236]" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {r.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <ResourceManager key={def.id} def={def} onAuthError={logout} />
      </div>
    </main>
  );
}