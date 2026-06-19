import React from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { num: "4", suffix: "+", desc: "Années d'expérience" },
  { num: "12", suffix: "+", desc: "Projets livrés" },
  { num: "8", suffix: "+", desc: "Clients satisfaits" },
  { num: "100", suffix: "%", desc: "Projets dans les délais" },
];

const skills = [
  { category: "Frontend", items: ["Next.js", "React", "Tailwind"] },
  { category: "Backend", items: ["Django", "DRF", "PostgreSQL", "Redis"] },
  { category: "DevOps", items: ["Docker", "Vercel", "GitHub Actions"] },
];

const timeline = [
  {
    year: "2025 — Présent",
    title: "Développeur Fullstack Freelance",
    sub: "Missions clients · Next.js & Django",
  },
  {
    year: "2022",
    title: "Développeur Web Frontend",
    sub: "Développement d'applications web frontend",
  },
  {
    year: "2021",
    title: "Formation · ENSET (Électtronique)",
    sub: "Cursus universitaire",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">

      <div className="mb-12 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
        <span className="block h-px w-5 bg-green-400/50" />
        À propos
      </div>

      <div className="grid gap-16 md:grid-cols-[300px_1fr]">

        <div className="flex flex-col gap-5">

          <div className="relative w-full overflow-hidden rounded-[20px] border border-white/[0.08]" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/MyPic.png"
              alt="Friemann LOKONON"
              fill
              className="object-cover"
              priority
            />

            {/* Badge online */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-green-400/30 bg-[#08080A]/85 px-3.5 py-1.5 text-[11px] font-medium text-green-300/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]" />
              Disponible · Freelance
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map(({ num, suffix, desc }) => (
              <div
                key={desc}
                className="rounded-[14px] border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
              >
                <p className="text-[22px] font-semibold leading-none tracking-tight text-white/90">
                  {num}
                  <span className="text-sm text-green-400/80">{suffix}</span>
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/30">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 pt-1">

          {/* Heading */}
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Développeur passionné,{" "}
            <br />
            <span className="bg-gradient-to-br from-white via-white/90 to-green-300/75 bg-clip-text text-transparent">
              orienté résultats.
            </span>
          </h2>

          {/* Bio */}
          <div className="flex flex-col gap-3.5">
            <p className="text-[15px] leading-[1.75] tracking-[-0.003em] text-white/45">
              Je m'appelle{" "}
              <strong className="font-medium text-white/75">Friemann LOKONON</strong>,
              développeur web Fullstack basé à{" "}
              <strong className="font-medium text-white/75">Cotonou, Bénin</strong>. Je
              conçois et développe des applications web modernes, performantes et
              évolutives pour des startups, PME et indépendants.
            </p>
            <p className="text-[15px] leading-[1.75] tracking-[-0.003em] text-white/45">
              Spécialisé en{" "}
              <strong className="font-medium text-white/75">Next.js, React et Django</strong>,
              j'interviens de la conception de l'architecture jusqu'au déploiement en
              production. Mon approche mêle rigueur technique et sens du détail design -
              parce qu'un bon produit doit être aussi beau qu'efficace.
            </p>
            <p className="text-[15px] leading-[1.75] tracking-[-0.003em] text-white/45">
              En dehors du code, je m'intéresse à l'écosystème tech africain et aux
              opportunités qu'il représente pour les entreprises et créateurs du continent.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-3">
            {skills.map(({ category, items }) => (
              <div key={category} className="flex items-center gap-2.5">
                <span className="w-20 shrink-0 text-[11px] font-medium uppercase tracking-[0.07em] text-white/22">
                  {category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-white/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 pb-6 last:pb-0">
                {/* Dot + line */}
                <div className="flex w-5 shrink-0 flex-col items-center">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full border border-green-400/50 bg-green-400/10" />
                  {i < timeline.length - 1 && (
                    <div className="mt-1.5 flex-1 w-px bg-white/[0.07]" />
                  )}
                </div>
                {/* Content */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium tracking-wide text-green-400/60">
                    {item.year}
                  </span>
                  <span className="text-sm font-medium text-white/80">{item.title}</span>
                  <span className="text-xs text-white/30">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a href="/Friemann_LOKONON.pdf" download className="flex items-center cursor-pointer gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-1 duration-300 hover:bg-green-300">
              Télécharger mon CV
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
            <Link href="#projects" className="flex items-center cursor-pointer gap-1.5 rounded-xl border border-white/10 px-5 py-2.5 text-[13px] text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white/80">
              Voir mes projets
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
