import Link from "next/link";

async function getFeaturedProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/featured/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Erreur API projects");
    return await res.json();
  } catch (error) {
    console.error("Erreur fetch projects:", error);
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

const glows = {
  green:  "rgba(74,222,128,0.09)",
  blue:   "rgba(96,165,250,0.09)",
  red:    "rgba(248,113,113,0.09)",
  purple: "rgba(192,132,252,0.09)",
  orange: "rgba(251,146,60,0.09)",
};

function PreviewMockUI({ color, wide }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: gradients[color] || gradients.green }}
    >
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: wide ? 180 : 130,
          height: wide ? 180 : 130,
          background: glows[color] || glows.green,
          filter: "blur(40px)",
          top: "20%", left: "30%",
          opacity: 0.4,
        }}
      />
      <div className={`relative z-10 rounded-xl border border-white/[0.08] bg-white/[0.03] ${wide ? "w-[75%] max-w-[260px] p-3.5" : "w-[75%] max-w-[200px] p-3"}`}>
        <div className="mb-2.5 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        </div>
        <div className="mb-1.5 h-1 w-full rounded-full bg-white/[0.07]" />
        <div className="mb-1.5 h-1 w-3/4 rounded-full bg-white/[0.07]" />
        <div className="mb-3 h-1 w-2/5 rounded-full bg-green-400/30" />
        {wide && (
          <div className="flex gap-1.5">
            {["Commandes", "Livraison"].map((label) => (
              <div key={label} className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5">
                <p className="text-[11px] font-semibold text-white/60">—</p>
                <p className="text-[9px] text-white/25">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WideCard({ project }) {
  const { title, type, description, stack, year, preview_color, image } = project;
  return (
    <div className="group overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d10] transition-all duration-300 hover:-translate-y-[3px] hover:border-green-400/20">
      {/* Layout : colonne sur mobile, ligne sur desktop */}
      <div className="flex flex-col md:h-[260px] md:flex-row">

        {/* Preview — en haut sur mobile, à gauche sur desktop */}
        <div className="h-[200px] w-full overflow-hidden border-b border-white/[0.05] md:h-full md:w-[42%] md:shrink-0 md:border-b-0 md:border-r">
          {image ? (
            <img src={image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <PreviewMockUI color={preview_color} wide />
          )}
        </div>

        {/* Texte — en bas sur mobile, à droite sur desktop */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-7">
          <div>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-semibold leading-tight tracking-tight text-white/90 md:text-[22px]">
                  {title}
                </span>
                <span className="text-[11px] tracking-wide text-white/28">{type}</span>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-white/35 md:text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex items-center justify-between md:mt-0">
            <div className="flex flex-wrap gap-1.5">
              {stack?.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-[3px] text-[11px] text-white/35">
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-white/20">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NormalCard({ project }) {
  const { title, type, description, stack, year, preview_color, image } = project;
  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d10] transition-all duration-300 hover:-translate-y-[3px] hover:border-green-400/20">
      <div className="w-full overflow-hidden border-b border-white/[0.05]" style={{ aspectRatio: "16/10" }}>
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <PreviewMockUI color={preview_color} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold leading-tight tracking-tight text-white/90">{title}</span>
            <span className="text-[11px] tracking-wide text-white/28">{type}</span>
          </div>
        </div>
        <p className="flex-1 text-[13px] leading-relaxed text-white/35">{description}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-1.5">
            {stack?.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-[3px] text-[10.5px] text-white/35">
                {tech}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-white/20">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default async function Projects() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  const featured = projects.find((p) => p.featured) || projects[0];
  const others = projects.filter((p) => p.id !== featured.id).slice(0, 2);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">

      <div className="mb-11 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
            <span className="block h-px w-5 bg-green-400/50" />
            Projets
          </div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Des produits pensés pour{" "}
            <span className="bg-gradient-to-br from-white via-white/90 to-green-300/75 bg-clip-text text-transparent">
              durer.
            </span>
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/35">
            Une sélection de projets réels — de l'idée au déploiement en production.
          </p>
        </div>

        <Link
          href="/projects"
          className="mt-2 flex w-fit items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 px-4 py-2 text-[13px] text-white/40 transition hover:border-white/20 hover:text-white/80 sm:mt-0"
        >
          Tous les projets
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col gap-3.5">
        <WideCard project={featured} />
        <div className="grid gap-3.5 sm:grid-cols-2">
          {others.map((project) => (
            <NormalCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}