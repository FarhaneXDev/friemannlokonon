import React from "react";

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Erreur API services");
    return await res.json();
  } catch (error) {
    console.error("Erreur fetch services:", error);
    return [];
  }
}

const ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>,
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-green-400/70">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ServiceCard({ service, index }) {
  const { name, description, features, price, price_label, popular } = service;

  const contactHref = `#contact?service=${encodeURIComponent(name)}`;

  return (
    <div className={`relative flex flex-col gap-5 overflow-hidden rounded-[20px] border p-7 transition-all duration-300 hover:-translate-y-0.5 ${
      popular
        ? "border-green-400/25 bg-gradient-to-br from-[#0d1510] to-[#0d0d10] hover:border-green-400/40"
        : "border-white/[0.07] bg-[#0d0d10] hover:border-green-400/20"
    }`}>
      {popular && (
        <div className="absolute right-4 top-4 rounded-full border border-green-400/25 bg-green-400/[0.08] px-2.5 py-1 text-[10px] font-medium tracking-wide text-green-400/85">
          Populaire
        </div>
      )}

      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-green-400/70">
        {ICONS[index % ICONS.length]}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[17px] font-semibold leading-tight tracking-tight text-white/90">{name}</p>
        <p className="text-[13px] leading-relaxed text-white/35">{description}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-2">
        {features?.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[12px] text-white/45">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[19px] font-semibold leading-none tracking-tight text-white/85">{price}</span>
          <span className="text-[11px] text-white/25">{price_label}</span>
        </div>
        <a
          href={contactHref}
          data-service-link
          className={`rounded-xl px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
            popular
              ? "bg-green-400 text-zinc-950 hover:bg-green-300"
              : "border border-white/[0.12] text-white/50 hover:border-white/25 hover:text-white/85"
          }`}
        >
          {popular ? "Démarrer" : "Demander"}
        </a>
      </div>
    </div>
  );
}

export default async function Services() {
  const services = await getServices();
  if (services.length === 0) return null;

  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-3.5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-green-400/70">
          <span className="block h-px w-5 bg-green-400/50" />
          Services
        </div>
        <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]">
          Ce que je peux{" "}
          <span className="bg-gradient-to-br from-white via-white/90 to-green-300/75 bg-clip-text text-transparent">
            construire pour vous.
          </span>
        </h2>
        <p className="max-w-md text-[14px] leading-relaxed text-white/35">
          Des prestations claires, des livrables concrets. De la page vitrine à l'application métier complexe.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
