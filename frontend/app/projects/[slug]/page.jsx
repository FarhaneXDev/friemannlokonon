import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

async function getProject(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Erreur API project detail");
    return await res.json();
  } catch (error) {
    console.error("Erreur fetch project detail:", error);
    return null;
  }
}

async function getAllProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const gradients = {
  green:  "linear-gradient(135deg, #0f1a12 0%, #0a1a0e 100%)",
  blue:   "linear-gradient(135deg, #0f0f1a 0%, #0a0a18 100%)",
  red:    "linear-gradient(135deg, #1a0f0f 0%, #180a0a 100%)",
  purple: "linear-gradient(135deg, #140f1a 0%, #100a18 100%)",
  orange: "linear-gradient(135deg, #1a130f 0%, #18100a 100%)",
};

function PreviewHero({ color, image, title }) {
  if (image) {
    return <img src={image} alt={title} className="h-full w-full object-cover" />;
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: gradients[color] || gradients.green }}>
      <div className="pointer-events-none absolute rounded-full" style={{ width: 300, height: 300, background: "rgba(74,222,128,0.2)", filter: "blur(60px)", opacity: 0.4, top: "10%", left: "25%" }} />
      <div className="relative z-10 w-[55%] max-w-[420px] rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <div className="mb-2 h-1 w-full rounded-full bg-white/[0.07]" />
        <div className="mb-2 h-1 w-3/4 rounded-full bg-white/[0.07]" />
        <div className="mb-4 h-1 w-2/5 rounded-full bg-green-400/25" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="mb-1 h-1.5 w-8 rounded-full bg-white/[0.12]" />
              <div className="h-1 w-12 rounded-full bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Friemann LOKONON`,
      description: project.description,
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630 }]
        : [""],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [""],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  const [project, allProjects] = await Promise.all([
    getProject(slug),
    getAllProjects(),
  ]);

  if (!project) notFound();

  const {
    title, type, year, duration, status,
    description, problem, solution, results,
    stack, live_url, github_url,
    preview_color, image,
  } = project;

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = allProjects[currentIndex - 1] || null;
  const next = allProjects[currentIndex + 1] || null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <BackButton />

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
            <span className="block h-px w-5 bg-green-400/50" />
            {type}
          </div>

          <h1 className="text-[clamp(28px,4vw,46px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            {title}
          </h1>

          <p className="text-[15px] leading-relaxed text-white/40">{description}</p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Année", value: year },
              { label: "Durée", value: duration },
              { label: "Statut", value: status },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
                <p className="text-[11px] text-white/25">{label}</p>
                <p className="mt-0.5 text-[13px] font-medium text-white/75">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5">
            {live_url && (
              <a href={live_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-green-400 px-5 py-2.5 text-[13px] font-medium text-zinc-950 transition hover:-translate-y-px hover:bg-green-300">
                Voir le site
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            )}
            {github_url && (
              <a href={github_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-white/10 px-5 py-2.5 text-[13px] text-white/50 transition hover:border-white/20 hover:text-white/80">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.07]" style={{ aspectRatio: "4/3" }}>
          <PreviewHero color={preview_color} image={image} title={title} />
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">Problème</p>
          <p className="text-[14px] leading-relaxed text-white/50">{problem}</p>
        </div>
        <div className="rounded-2xl border border-green-400/15 bg-green-400/[0.03] p-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-green-400/60">Solution</p>
          <p className="text-[14px] leading-relaxed text-white/50">{solution}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">Résultats</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {results?.map((result, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-400/25 bg-green-400/[0.08]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400/70">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[13px] leading-relaxed text-white/55">{result}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25">Stack technique</p>
        <div className="flex flex-wrap gap-2">
          {stack?.map((tech) => (
            <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/50">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(prev || next) && (
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-2 text-[13px] text-white/35 transition hover:text-white/75">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wide text-white/20">Précédent</span>
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex items-center gap-2 text-right text-[13px] text-white/35 transition hover:text-white/75">
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wide text-white/20">Suivant</span>
                {next.title}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      )}

    </main>
  );
}
