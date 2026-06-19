"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";

const CONTACT_INFO = [
  {
    label: "Email",
    value: "devlifeoffarhane@proton.me",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Localisation",
    value: "Cotonou, Bénin · Remote OK",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Disponibilité",
    value: "Réponse sous 24h",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/FarhaneXDev",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/friemann-lokonon/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-wide text-white/35">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white/70 placeholder:text-white/20 outline-none transition-colors focus:border-green-400/35";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    function handleServiceClick(e) {
      const link = e.target.closest("[data-service-link]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const match = href.match(/service=([^&]+)/);
      if (match) {
        e.preventDefault();
        const serviceName = decodeURIComponent(match[1]);
        setForm((prev) => ({ ...prev, subject: `Demande de devis — ${serviceName}` }));
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    }
    document.addEventListener("click", handleServiceClick);
    return () => document.removeEventListener("click", handleServiceClick);
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.post("/contact/", form);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMsg(error?.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-3.5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
          <span className="block h-px w-5 bg-green-400/50" />
          Contact
        </div>
        <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]">
          Parlons de votre{" "}
          <span className="bg-gradient-to-br from-white via-white/90 to-green-300/75 bg-clip-text text-transparent">
            projet.
          </span>
        </h2>
        <p className="max-w-sm text-[14px] leading-relaxed text-white/35">
          Une idée, une question, un devis ? Écrivez-moi, je réponds sous 24h.
        </p>
      </div>

      <div className="grid gap-8 md:gap-12 md:grid-cols-[1fr_1.4fr]">

        <div className="flex flex-col gap-6 md:gap-7">
          <div className="flex flex-col gap-3">
            {CONTACT_INFO.map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-[14px] border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.03] text-green-400/65">
                  {icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-white/25">{label}</span>
                  <span className="text-[13px] text-white/65">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[12px] text-white/38 transition hover:border-white/18 hover:text-white/75">
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-white/[0.07] bg-[#0d0d10] p-5 md:p-7">
          {status === "sent" ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-400/30 bg-green-400/[0.08]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[16px] font-semibold text-white/90">Message envoyé !</p>
                <p className="text-[13px] text-white/35">Je vous répondrai dans les 24h.</p>
              </div>
              <button
                onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-2 rounded-xl border border-white/10 px-4 py-2 text-[12px] text-white/40 transition hover:border-white/20 hover:text-white/70"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nom">
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Vincent dePaul" className={inputClass} />
                </Field>
                <Field label="Email">
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="vincent@exemple.com" className={inputClass} />
                </Field>
              </div>

              <Field label="Sujet">
                <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Développement d'une application web" className={inputClass} />
              </Field>

              <Field label="Message">
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Décrivez votre projet, vos besoins, votre budget estimé..."
                  className={`${inputClass} resize-none leading-relaxed`} />
              </Field>

              {status === "error" && (
                <p className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-2.5 text-[12px] text-red-400/80">
                  {errorMsg}
                </p>
              )}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] text-white/20">Réponse garantie sous 24h</span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-green-400 px-4 py-2 text-[12px] font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
                        <path d="M21 12a9 9 0 00-9-9" />
                      </svg>
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}