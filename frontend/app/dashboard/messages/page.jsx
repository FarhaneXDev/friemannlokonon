"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";

const STATUS_LABELS = {
  new: { label: "Nouveau", color: "text-green-400/85 border-green-400/25 bg-green-400/[0.08]" },
  read: { label: "Lu", color: "text-blue-400/80 border-blue-400/25 bg-blue-400/[0.08]" },
  replied: { label: "Répondu", color: "text-white/50 border-white/[0.12] bg-white/[0.04]" },
  archived: { label: "Archivé", color: "text-white/25 border-white/[0.08] bg-white/[0.02]" },
};

function StatusBadge({ status }) {
  const info = STATUS_LABELS[status] || STATUS_LABELS.new;
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] ${info.color}`}>
      {info.label}
    </span>
  );
}

export default function DashboardMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/messages");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/dashboard/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      }
    } catch (error) {
      console.error("Erreur update status:", error);
    }
  }

  function toggleExpand(message) {
    const isOpening = expandedId !== message.id;
    setExpandedId(isOpening ? message.id : null);

    if (isOpening && message.status === "new") {
      updateStatus(message.id, "read");
    }
  }

  function askDelete(id, name) {
    setConfirmTarget({ id, name });
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const { id } = confirmTarget;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/dashboard/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Erreur delete:", error);
    } finally {
      setDeletingId(null);
      setConfirmTarget(null);
    }
  }

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">
          Messages {newCount > 0 && <span className="text-green-400/80">({newCount} nouveau{newCount > 1 ? "x" : ""})</span>}
        </h1>
        <p className="text-[13px] text-white/35">Messages reçus via le formulaire de contact.</p>
      </div>

      {loading ? (
        <p className="text-[13px] text-white/30">Chargement...</p>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-10 text-center">
          <p className="text-[14px] text-white/40">Aucun message reçu pour le moment.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {messages.map((message) => {
            const isExpanded = expandedId === message.id;
            return (
              <div
                key={message.id}
                className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] transition-colors"
              >
                {/* Header — toujours visible */}
                <button
                  onClick={() => toggleExpand(message)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-white/85">{message.name}</p>
                      <StatusBadge status={message.status} />
                    </div>
                    <p className="text-[12px] text-white/35">{message.subject}</p>
                  </div>
                  <span className="text-[11px] text-white/20">
                    {message.created_at
                      ? new Date(message.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
                      : "—"}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-white/25 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Détail — expand */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] p-4">
                    <div className="mb-4 flex flex-col gap-1">
                      <p className="text-[11px] text-white/25">Email</p>
                      <a href={`mailto:${message.email}`} className="text-[13px] text-green-400/80 hover:text-green-400">
                        {message.email}
                      </a>
                    </div>
                    <div className="mb-5 flex flex-col gap-1">
                      <p className="text-[11px] text-white/25">Message</p>
                      <p className="text-[13px] leading-relaxed text-white/60">{message.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Changement de statut */}
                      <div className="flex gap-1.5">
                        {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
                          <button
                            key={key}
                            onClick={() => updateStatus(message.id, key)}
                            className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                              message.status === key
                                ? "border-green-400/30 bg-green-400/[0.08] text-green-400/90"
                                : "border-white/[0.07] text-white/35 hover:border-white/15 hover:text-white/70"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => askDelete(message.id, message.name)}
                        disabled={deletingId === message.id}
                        className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[12px] text-white/35 transition hover:border-red-400/30 hover:text-red-400/80 disabled:opacity-50"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title="Supprimer ce message ?"
        description={confirmTarget ? `Le message de "${confirmTarget.name}" sera définitivement supprimé.` : ""}
        confirmLabel="Supprimer"
        danger
        loading={deletingId === confirmTarget?.id}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
