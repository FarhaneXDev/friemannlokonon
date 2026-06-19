"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";

export default function DashboardProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null); 

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/projects");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function askDelete(id, title) {
    setConfirmTarget({ id, title });
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const { id } = confirmTarget;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/dashboard/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Erreur delete:", error);
    } finally {
      setDeletingId(null);
      setConfirmTarget(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[24px] font-semibold tracking-tight text-white/90">Projets</h1>
          <p className="text-[13px] text-white/35">Gérez les projets affichés sur votre portfolio.</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-1.5 rounded-xl bg-green-400 px-4 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau projet
        </Link>
      </div>

      {loading ? (
        <p className="text-[13px] text-white/30">Chargement...</p>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-10 text-center">
          <p className="text-[14px] text-white/40">Aucun projet pour le moment.</p>
          <Link href="/dashboard/projects/new" className="mt-3 inline-block text-[13px] text-green-400/80 hover:text-green-400">
            Créer votre premier projet →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-4"
            >
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-white/15">
                    Pas d'image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-medium text-white/85">{project.title}</p>
                  {project.featured && (
                    <span className="rounded-full border border-green-400/25 bg-green-400/[0.08] px-2 py-0.5 text-[10px] text-green-400/80">
                      Mis en avant
                    </span>
                  )}
                  {!project.is_active && (
                    <span className="rounded-full border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/35">
                      Inactif
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[12px] text-white/30">{project.type} · {project.year}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="rounded-lg border cursor-pointer border-white/[0.08] px-3 py-1.5 text-[12px] text-white/45 transition hover:border-white/20 hover:text-white/80"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => askDelete(project.id, project.title)}
                  disabled={deletingId === project.id}
                  className="rounded-lg cursor-pointer border border-white/[0.08] px-3 py-1.5 text-[12px] text-white/35 transition hover:border-red-400/30 hover:text-red-400/80 disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title="Supprimer ce projet ?"
        description={confirmTarget ? `"${confirmTarget.title}" sera définitivement supprimé. Cette action est irréversible.` : ""}
        confirmLabel="Supprimer"
        danger
        loading={deletingId === confirmTarget?.id}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
