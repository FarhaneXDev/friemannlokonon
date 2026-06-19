"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GridBackground from "@/components/GridBackground";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.detail || "Une erreur est survenue.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setStatus("error");
      setErrorMsg("Impossible de se connecter au serveur.");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080A] px-6">

      {/* Glow orb décoratif */}
      <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.12)_0%,rgba(74,222,128,0.03)_50%,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-[5%] left-[-15%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.06)_0%,transparent_70%)]" />

      {/* Grid background */}
      <GridBackground />

      <div className="relative z-10 w-full max-w-sm">

        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2 text-[15px] font-semibold tracking-tight text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_7px_#4ade80]" />
          Friemann LOKONON
        </div>

        {/* Card */}
        <div className="rounded-[20px] border border-white/[0.07] bg-[#0d0d10] p-8">

          <div className="mb-6 flex flex-col gap-1.5">
            <h1 className="text-[20px] font-semibold tracking-tight text-white/90">
              Connexion
            </h1>
            <p className="text-[13px] text-white/35">
              Accédez à votre espace d'administration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-white/35">
                Nom d'utilisateur
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoFocus
                placeholder="votre identifiant"
                className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-colors focus:border-green-400/35"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-white/35">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-colors focus:border-green-400/35"
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-2.5 text-[12px] text-red-400/80">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 cursor-pointer flex items-center justify-center gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
                    <path d="M21 12a9 9 0 00-9-9" />
                  </svg>
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-white/20">
          Espace réservé · Friemann LOKONON
        </p>
      </div>
    </main>
  );
}
