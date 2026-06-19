import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute right-[-5%] top-[2%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.10)_0%,rgba(74,222,128,0.03)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-[5%] left-[-15%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.08)_0%,transparent_70%)]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.058) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.058) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      {/* HERO */}
      <ScrollReveal>
        <section className="relative z-10 -mt-8 mx-auto flex min-h-screen max-w-5xl items-center px-6 pb-20 pt-32">
          <div className="max-w-180">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/6 px-3.5 py-1.5 text-xs font-medium tracking-wide text-green-300/85">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
              Disponible pour missions freelance
            </div>

            {/* Titre */}
            <h1 className="text-[clamp(36px,5.5vw,66px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Je construis des{" "}
              <span className="bg-linear-to-br from-white via-white/90 to-green-400/75 bg-clip-text text-transparent">
                applications web
              </span>{" "}
              modernes et performantes.
            </h1>

            {/* Sous-titre */}
            <p className="mt-5 max-w-[510px] text-[17px] leading-relaxed tracking-[-0.005em] text-white/40">
              Développeur Fullstack spécialisé en Next.js, Django et PostgreSQL.
              Je transforme vos idées en produits digitaux rapides, élégants et scalables.
            </p>

            {/* Boutons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="#projects" className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:-translate-y-1 duration-500 hover:bg-green-300">
                Voir mes projets
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="#contact" className="rounded-xl cursor-pointer border border-white/10 px-5 py-2.5 text-sm text-white/55 transition hover:border-white/20 hover:bg-white/4 hover:text-white/88">
                Me contacter
              </Link>
            </div>

            {/* Stack */}
            <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-white/6 pt-8">
              <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/22">Stack</span>
              {["Next.js", "React", "Django", "PostgreSQL", "Tailwind", "Figma"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.07] bg-white/3 px-3 py-1 text-xs text-white/35 transition hover:border-green-400/20 hover:bg-green-400/5 hover:text-green-300/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* About */}
      <ScrollReveal delay={0.1}>
        <About />
      </ScrollReveal>

      {/* Projects */}
      <ScrollReveal delay={0.1}>
        <Projects />
      </ScrollReveal>

      {/* Services */}
      <ScrollReveal delay={0.1}>
        <Services />
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal delay={0.1}>
        <Contact />
      </ScrollReveal>
    </main>
  );
}