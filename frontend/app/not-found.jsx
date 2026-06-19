import Link from "next/link";
import GridBackground from "@/components/GridBackground";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080A] px-6">
      <GridBackground />

      <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.12)_0%,rgba(74,222,128,0.03)_50%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">

        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-green-300/85">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Erreur 404
        </div>

        <h1 className="text-[clamp(64px,12vw,140px)] font-semibold leading-none tracking-[-0.04em] text-white/90">
          404
        </h1>

        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/35">
          Cette page n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300"
          >
            Retour à l'accueil
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/projects"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-white/55 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white/88"
          >
            Voir les projets
          </Link>
        </div>
      </div>
    </div>
  );
}
