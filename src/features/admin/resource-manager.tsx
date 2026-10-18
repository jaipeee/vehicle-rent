"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminAuthError, adminFetch, revalidateSite } from "@/lib/admin-api";
import { ICON_NAMES } from "@/lib/icons";
import { ImageField } from "./image-field";
import type { Field, ResourceDef } from "./resources";

type Row = Record<string, any> & { id: string };
type Msg = { type: "ok" | "err"; text: string } | null;
type Opt = { label: string; value: string };

const input = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";
const ghostBtn = "rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50";
const removeBtn = "rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50";
const ARRAY_TYPES = ["list", "spots", "images", "amenities"];

function toForm(def: ResourceDef, row?: Row) {
  const base: Record<string, any> = { ...def.blank, ...(row ?? {}) };
  for (const f of def.fields) {
    if (base[f.key] == null) {
      base[f.key] = ARRAY_TYPES.includes(f.type) ? [] : f.type === "checkbox" ? false : "";
    }
  }
  return base;
}

export function ResourceManager({ def, onAuthError }: { def: ResourceDef; onAuthError: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [cityOptions, setCityOptions] = useState<Opt[]>([]);

  const fail = useCallback(
    (e: unknown) => {
      if (e instanceof AdminAuthError) return onAuthError();
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Something went wrong" });
    },
    [onAuthError]
  );

  const load = useCallback(async () => {
    try {
      setRows(await adminFetch<Row[]>(`/admin/${def.endpoint}`));
    } catch (e) {
      fail(e);
    } finally {
      setLoading(false);
    }
  }, [def.endpoint, fail]);

  useEffect(() => {
    load();
  }, [load]);

  // City dropdown options (only for tabs that have a city field)
  useEffect(() => {
    if (!def.fields.some((f) => f.type === "citySelect")) return;
    adminFetch<Row[]>("/admin/cities")
      .then((c) => setCityOptions(c.map((x) => ({ label: x.name, value: x.slug }))))
      .catch(() => {});
  }, [def]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return rows.filter((r) => `${def.title(r)} ${def.subtitle?.(r) ?? ""}`.toLowerCase().includes(s));
  }, [rows, search, def]);

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));
  const setAt = (key: string, arr: any[], i: number, patch: any) =>
    set(key, arr.map((x, j) => (j === i ? (typeof patch === "object" ? { ...x, ...patch } : patch) : x)));
  const removeAt = (key: string, arr: any[], i: number) => set(key, arr.filter((_, j) => j !== i));

  function pick(row: Row) {
    setSelectedId(row.id);
    setForm(toForm(def, row));
    setMsg(null);
  }

  function addNew() {
    setSelectedId("new");
    setForm(toForm(def));
    setMsg(null);
  }

  function duplicate() {
    setSelectedId("new");
    setMsg({ type: "ok", text: "Copy ready. Change the city / vehicle (or text), then Save." });
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const isNew = selectedId === "new";
      const saved = await adminFetch<Row>(
        isNew ? `/admin/${def.endpoint}` : `/admin/${def.endpoint}/${selectedId}`,
        { method: isNew ? "POST" : "PUT", body: JSON.stringify(form) }
      );
      await load();
      setSelectedId(saved.id);
      setForm(toForm(def, saved));
      await revalidateSite();
      setMsg({ type: "ok", text: "Saved. The site is updated." });
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (selectedId === "new" || !selectedId) return;
    if (!confirm("Delete this record permanently?")) return;
    setBusy(true);
    try {
      await adminFetch(`/admin/${def.endpoint}/${selectedId}`, { method: "DELETE" });
      setSelectedId(null);
      await load();
      await revalidateSite();
      setMsg({ type: "ok", text: "Deleted." });
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  }

  function renderField(f: Field) {
    const value = form[f.key];
    switch (f.type) {
      case "textarea":
        return <textarea rows={4} value={value} onChange={(e) => set(f.key, e.target.value)} className={input} />;
      case "number":
        return <input type="number" value={value} onChange={(e) => set(f.key, e.target.value)} className={input} />;
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!value} onChange={(e) => set(f.key, e.target.checked)} className="h-4 w-4" />
            Yes
          </label>
        );
      case "select":
      case "citySelect": {
        const opts: Opt[] =
          f.type === "citySelect"
            ? [
                { label: "— All cities —", value: "" },
                ...cityOptions,
                ...(value && !cityOptions.some((o) => o.value === value) ? [{ label: value, value }] : []),
              ]
            : f.options ?? [];
        return (
          <select value={value} onChange={(e) => set(f.key, e.target.value)} className={input}>
            {!opts.some((o) => o.value === "") && <option value="">— Select —</option>}
            {opts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      }
      case "image":
        return <ImageField value={value} onChange={(url) => set(f.key, url)} />;
      case "images":
        return (
          <div className="space-y-2">
            {(value as string[]).map((url, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <ImageField compact value={url} onChange={(u) => setAt(f.key, value, i, u)} />
                </div>
                <button type="button" onClick={() => removeAt(f.key, value, i)} className={removeBtn}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set(f.key, [...(value as string[]), ""])} className={ghostBtn}>
              + Add photo
            </button>
          </div>
        );
      case "amenities":
        return (
          <div className="space-y-2">
            {(value as { label: string; icon: string }[]).map((a, i) => (
              <div key={i} className="flex gap-2">
                <select
                  value={a.icon || "Sparkles"}
                  onChange={(e) => setAt(f.key, value, i, { icon: e.target.value })}
                  className="w-40 rounded-lg border border-slate-300 px-2 py-2 text-sm"
                >
                  {ICON_NAMES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <input
                  value={a.label}
                  placeholder="e.g. AC Cabin"
                  onChange={(e) => setAt(f.key, value, i, { label: e.target.value })}
                  className={input}
                />
                <button type="button" onClick={() => removeAt(f.key, value, i)} className={removeBtn}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set(f.key, [...(value as any[]), { label: "", icon: "Sparkles" }])} className={ghostBtn}>
              + Add amenity
            </button>
          </div>
        );
      case "list":
        return (
          <div className="space-y-2">
            {(value as string[]).map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea rows={3} value={p} onChange={(e) => setAt(f.key, value, i, e.target.value)} className={input} />
                <button type="button" onClick={() => removeAt(f.key, value, i)} className={`self-start ${removeBtn}`}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set(f.key, [...(value as string[]), ""])} className={ghostBtn}>
              + Add paragraph
            </button>
          </div>
        );
      case "spots":
        return (
          <div className="space-y-3">
            {(value as { name: string; imageUrl: string }[]).map((s, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-slate-200 p-3">
                <div className="flex gap-2">
                  <input
                    value={s.name}
                    placeholder="Spot name"
                    onChange={(e) => setAt(f.key, value, i, { name: e.target.value })}
                    className={input}
                  />
                  <button type="button" onClick={() => removeAt(f.key, value, i)} className={removeBtn}>
                    Remove
                  </button>
                </div>
                <ImageField compact value={s.imageUrl} onChange={(url) => setAt(f.key, value, i, { imageUrl: url })} />
              </div>
            ))}
            <button type="button" onClick={() => set(f.key, [...(value as any[]), { name: "", imageUrl: "" }])} className={ghostBtn}>
              + Add spot
            </button>
          </div>
        );
      default:
        return <input value={value} onChange={(e) => set(f.key, e.target.value)} className={input} />;
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* List */}
      <aside className="space-y-3">
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${def.label.toLowerCase()}…`}
            className={input}
          />
          <button
            type="button"
            onClick={addNew}
            className="whitespace-nowrap rounded-lg bg-[#ea7236] px-3 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            + New
          </button>
        </div>
        <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {loading && <p className="text-sm text-slate-500">Loading…</p>}
          {!loading && filtered.length === 0 && <p className="text-sm text-slate-500">Nothing here yet.</p>}
          {filtered.map((r) => {
            const img = def.image?.(r);
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => pick(r)}
                className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${
                  selectedId === r.id ? "border-[#ea7236] bg-orange-50" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                ) : (
                  <div className="h-12 w-16 shrink-0 rounded-md bg-slate-100" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{def.title(r)}</p>
                  <p className="truncate text-xs text-slate-500">{def.subtitle?.(r)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Form */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {selectedId === null ? (
          <p className="py-16 text-center text-slate-500">Pick a record on the left, or click “+ New”.</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {selectedId === "new" ? `New ${def.label}` : `Edit ${def.label}`}
              </h2>
              {def.duplicable && selectedId !== "new" && (
                <button type="button" onClick={duplicate} className={ghostBtn}>
                  Duplicate
                </button>
              )}
            </div>
            <div className="mt-4 space-y-5">
              {def.fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">{f.label}</label>
                  {renderField(f)}
                  {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
                </div>
              ))}
            </div>

            {msg && (
              <p className={`mt-5 rounded-lg px-3 py-2 text-sm ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {msg.text}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={save}
                disabled={busy}
                className="rounded-lg bg-[#ea7236] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
              >
                {busy ? "Saving…" : "Save"}
              </button>
              {selectedId !== "new" && (
                <button
                  type="button"
                  onClick={remove}
                  disabled={busy}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )}
        {selectedId === null && msg && <p className="mt-4 text-center text-sm text-green-700">{msg.text}</p>}
      </section>
    </div>
  );
}