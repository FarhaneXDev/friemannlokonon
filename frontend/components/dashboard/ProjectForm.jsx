"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPE_OPTIONS = [
  { value: "fullstack", label: "Full Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
];

const COLOR_OPTIONS = [
  { value: "green", label: "Vert" },
  { value: "blue", label: "Bleu" },
  { value: "red", label: "Rouge" },
  { value: "purple", label: "Violet" },
  { value: "orange", label: "Orange" },
];

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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectForm({ initialData = null, mode = "create" }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    type: initialData?.type || "fullstack",
    description: initialData?.description || "",
    problem: initialData?.problem || "",
    solution: initialData?.solution || "",
    results: Array.isArray(initialData?.results) ? initialData.results.join("\n") : (initialData?.results || ""),
    stack: Array.isArray(initialData?.stack) ? initialData.stack.join(", ") : (initialData?.stack || ""),
    year: initialData?.year || new Date().getFullYear().toString(),
    duration: initialData?.duration || "",
    status: initialData?.status || "En production",
    preview_color: initialData?.preview_color || "green",
    live_url: initialData?.live_url || "",
    github_url: initialData?.github_url || "",
    featured: initialData?.featured || false,
    is_active: initialData?.is_active ?? true,
    order: initialData?.order || 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [slugTouched, setSlugTouched] = useState(isEdit); 
  const [status, setStatus] = useState("idle"); 
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (name === "title" && !slugTouched) {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  }

  function handleSlugChange(e) {
    setSlugTouched(true);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = isEdit
        ? `/api/dashboard/projects/${initialData.id}`
        : `/api/dashboard/projects`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Erreur lors de l'enregistrement.");
      }

      router.push("/dashboard/projects");
    } catch (error) {
      setStatus("error");
      setErrorMsg(error.message || "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Informations principales
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titre">
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Plateforme e-commerce B2B" className={inputClass} />
          </Field>
          <Field label="Slug" hint="Utilisé dans l'URL — généré automatiquement">
            <input name="slug" value={form.slug} onChange={handleSlugChange} required placeholder="plateforme-ecommerce-b2b" className={inputClass} />
          </Field>
          <Field label="Type">
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Couleur preview">
            <select name="preview_color" value={form.preview_color} onChange={handleChange} className={inputClass}>
              {COLOR_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Année">
            <input name="year" value={form.year} onChange={handleChange} required placeholder="2024" className={inputClass} />
          </Field>
          <Field label="Durée">
            <input name="duration" value={form.duration} onChange={handleChange} required placeholder="6 semaines" className={inputClass} />
          </Field>
          <Field label="Statut">
            <input name="status" value={form.status} onChange={handleChange} required placeholder="En production" className={inputClass} />
          </Field>
          <Field label="Ordre d'affichage">
            <input type="number" name="order" value={form.order} onChange={handleChange} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Contenu
        </p>
        <div className="flex flex-col gap-4">
          <Field label="Description courte">
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
          <Field label="Problème">
            <textarea name="problem" value={form.problem} onChange={handleChange} required rows={3} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
          <Field label="Solution">
            <textarea name="solution" value={form.solution} onChange={handleChange} required rows={3} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
          <Field label="Résultats" hint="Un résultat par ligne">
            <textarea name="results" value={form.results} onChange={handleChange} required rows={4} placeholder={"Réduction de 70% du temps de traitement\nZéro perte de données"} className={`${inputClass} resize-none leading-relaxed`} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Technique & liens
        </p>
        <div className="flex flex-col gap-4">
          <Field label="Stack technique" hint="Séparée par des virgules">
            <input name="stack" value={form.stack} onChange={handleChange} required placeholder="Next.js, Django, PostgreSQL" className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="URL du site (optionnel)">
              <input name="live_url" value={form.live_url} onChange={handleChange} placeholder="https://..." className={inputClass} />
            </Field>
            <Field label="URL GitHub (optionnel)">
              <input name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Image du projet
        </p>
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[11px] text-white/20">Aucune image</span>
            )}
          </div>
          <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-2.5 text-[13px] text-white/50 transition hover:border-white/20 hover:text-white/80">
            Choisir une image
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">
          Affichage
        </p>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-[13px] text-white/60">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 rounded accent-green-400" />
            Mis en avant (page d'accueil)
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

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/projects")}
          className="rounded-xl cursor-pointer border border-white/10 px-5 py-2.5 text-[13px] text-white/50 transition hover:border-white/20 hover:text-white/80"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-1 hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
        >
          {status === "saving" ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer le projet"}
        </button>
      </div>
    </form>
  );
}
