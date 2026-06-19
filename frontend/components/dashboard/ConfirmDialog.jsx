"use client";

import { useEffect } from "react";

export default function ConfirmDialog({
  open,
  title = "Confirmer l'action",
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onCancel?.();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full max-w-sm rounded-[20px] border border-white/[0.08] bg-[#0d0d10] p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
            danger ? "border-red-400/25 bg-red-400/[0.08]" : "border-green-400/25 bg-green-400/[0.08]"
          }`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={danger ? "text-red-400/80" : "text-green-400/80"}>
              {danger ? (
                <>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </>
              ) : (
                <path d="M5 13l4 4L19 7" />
              )}
            </svg>
          </div>
          <h3 className="text-[16px] font-semibold text-white/90">{title}</h3>
        </div>

        {description && (
          <p className="mb-6 text-[13px] leading-relaxed text-white/40">{description}</p>
        )}

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl cursor-pointer border border-white/10 px-4 py-2 text-[13px] text-white/50 transition hover:border-white/20 hover:text-white/80 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl cursor-pointer px-4 py-2 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
              danger
                ? "bg-red-400/90 text-zinc-950 hover:bg-red-400"
                : "bg-green-400 text-zinc-950 hover:bg-green-300"
            }`}
          >
            {loading ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
