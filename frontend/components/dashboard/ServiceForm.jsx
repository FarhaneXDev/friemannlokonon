"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-colors focus:border-green-400/35";

function Field({ label, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-wide text-white/40">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-white/20">{hint}</p>}
    </div>
  );
}

export default function ServiceForm({ initialData = null, mode = "create" }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    features: Array.isArray(initialData?.features) ? initialData.features.join("\n") : (initialData?.features || ""),
    price: initialData?.price || "",
    price_label: initialData?.price_label || "",
    popular: initialData?.popular || false,
    order: initialData?.order || 0,
    is_active: initialData?.is_active ?? true,
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    try {
      const url = isEdit ? `/api/dashboard/services/${initialData.id}` : `/api/dashboard/services`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Erreur lors de l'enregistrement.");
      }

      router.push("/dashboard/services");
    } catch (error) {
      setStatus("error");
      setErrorMsg(error.message || "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Informations
        </p>
        <div className="flex flex-col gap-4">
          <Field label="Nom du service">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Site vitrine" className={inputClass} />
          </Field>
          <Field label="Description">
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
          <Field label="Fonctionnalités" hint="Une par ligne">
            <textarea name="features" value={form.features} onChange={handleChange} required rows={4} placeholder={"Design sur mesure\nResponsive & SEO"} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prix">
              <input name="price" value={form.price} onChange={handleChange} required placeholder="À partir de 300k" className={inputClass} />
            </Field>
            <Field label="Label prix">
              <input name="price_label" value={form.price_label} onChange={handleChange} required placeholder="FCFA · délai 2–3 sem." className={inputClass} />
            </Field>
          </div>
          <Field label="Ordre d'affichage">
            <input type="number" name="order" value={form.order} onChange={handleChange} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Affichage
        </p>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-[13px] text-white/60">
            <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} className="h-4 w-4 rounded accent-green-400" />
            Marquer comme populaire
          </label>
          <label className="flex items-center gap-2.5 text-[13px] text-white/60">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="h-4 w-4 rounded accent-green-400" />
            Actif (visible sur le site)
          </label>
        </div>
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-2.5 text-[12px] text-red-400/80">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => router.push("/dashboard/services")} className="rounded-xl cursor-pointer border border-white/10 px-5 py-2.5 text-[13px] text-white/50 transition hover:border-white/20 hover:text-white/80">
          Annuler
        </button>
        <button type="submit" disabled={status === "saving"} className="flex items-center gap-1.5 rounded-xl cursor-pointer bg-green-400 px-5 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60">
          {status === "saving" ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer le service"}
        </button>
      </div>
    </form>
  );
}
