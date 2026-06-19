import Link from "next/link";
import BackButton from "@/components/BackButton";
import GridBackground from "@/components/GridBackground";

// ─── Fetch depuis l'API Django ────────────────────────────────────
async function getAllProjects(type) {
  try {
    const url = type && type !== "Tous"
      ? `${process.env.NEXT_PUBLIC_API_URL}/projects/?type=${type.toLowerCase()}`
      : `${process.env.NEXT_PUBLIC_API_URL}/projects/`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Erreur API projects");
    return await res.json();
  } catch (error) {
    console.error("Erreur fetch projects:", error);
    return [];
  }
}

const FILTERS = [
  { label: "Tous", value: "Tous" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
];

const gradients = {
  green:  "linear-gradient(135deg, #0f1a12 0%, #0a1a0e 100%)",
  blue:   "linear-gradient(135deg, #0f0f1a 0%, #0a0a18 100%)",
  red:    "linear-gradient(135deg, #1a0f0f 0%, #180a0a 100%)",
  purple: "linear-gradient(135deg, #140f1a 0%, #100a18 100%)",
  orange: "linear-gradient(135deg, #1a130f 0%, #18100a 100%)",
};

function PreviewMock({ color }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: gradients[color] || gradients.green }}>
      <div className="pointer-events-none absolute rounded-full" style={{ width: 120, height: 120, background: "rgba(74,222,128,0.25)", filter: "blur(36px)", opacity: 0.35, top: "20%", left: "30%" }} />
      <div className="relative z-10 w-[68%] rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
        <div className="mb-2 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        </div>
        <div className="mb-1 h-[3px] w-full rounded-full bg-white/[0.07]" />
        <div className="mb-1 h-[3px] w-3/4 rounded-full bg-white/[0.07]" />
        <div className="h-[3px] w-2/5 rounded-full bg-green-400/25" />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const { slug, title, type, description, stack, year, preview_color, image } = project;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0d0d10] transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400/20"
    >
      <div className="w-full overflow-hidden border-b border-white/[0.05]" style={{ aspectRatio: "16/10" }}>
        {image
          ? <img src={image} alt={title} className="h-full w-full object-cover" />
          : <PreviewMock color={preview_color} />
        }
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[14px] font-semibold leading-tight tracking-tight text-white/88">{title}</p>
            <p className="mt-0.5 text-[11px] text-white/25">{type}</p>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-white/28 transition-all duration-200 group-hover:border-green-400/30 group-hover:text-green-400/70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
        <p className="flex-1 text-[12px] leading-relaxed text-white/30">{description}</p>
        <div className="flex items-center justify-between border-t border-white/[0.05] pt-3">
          <div className="flex flex-wrap gap-1">
            {stack?.map((t) => (
              <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/30">{t}</span>
            ))}
          </div>
          <span className="text-[11px] text-white/18">{year}</span>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Projets",
  description: "L'ensemble de mes réalisations — applications web, sites vitrines et outils métier livrés en production.",
};

export default async function ProjectsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams?.filter || "Tous";
  const projects = await getAllProjects(activeFilter);

  return (
   
    <div className="relative min-h-screen overflow-hidden">
      <GridBackground />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <BackButton />

        <div className="mb-12 mt-10 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
            <span className="block h-px w-5 bg-green-400/50" />
            Portfolio
          </div>
          <h1 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Tous mes{" "}
            <span className="bg-gradient-to-br from-white via-white/90 to-green-300/75 bg-clip-text text-transparent">
              projets.
            </span>
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-white/35">
            L'ensemble de mes réalisations — applications web, sites vitrines et outils métier livrés en production.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.06em] text-white/22">Filtrer</span>
          {FILTERS.map(({ label, value }) => (
            <Link
              key={value}
              href={value === "Tous" ? "/projects" : `/projects?filter=${value}`}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-all duration-200 ${
                activeFilter === value || (activeFilter === "Tous" && value === "Tous")
                  ? "border-green-400/30 bg-green-400/[0.08] text-green-400/90"
                  : "border-white/[0.07] bg-white/[0.03] text-white/35 hover:border-white/15 hover:text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="mb-6 text-[12px] text-white/22">
          {projects.length} projet{projects.length > 1 ? "s" : ""}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
