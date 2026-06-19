import { fetchWithAuth } from "@/lib/auth";

async function getStats() {
  try {
    const [projectsRes, servicesRes, messagesRes] = await Promise.all([
      fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/`, { cache: "no-store" }),
      fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services/admin/`, { cache: "no-store" }),
      fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/admin/`, { cache: "no-store" }),
    ]);

    const projects = projectsRes.ok ? await projectsRes.json() : [];
    const services = servicesRes.ok ? await servicesRes.json() : [];
    const messages = messagesRes.ok ? await messagesRes.json() : [];

    return {
      projectsCount: projects.length || 0,
      activeProjectsCount: projects.filter((p) => p.is_active).length || 0,
      servicesCount: services.length || 0,
      messagesCount: messages.length || 0,
      newMessagesCount: messages.filter((m) => m.status === "new").length || 0,
      recentMessages: messages.slice(0, 5),
    };
  } catch (error) {
    console.error("Erreur fetch stats:", error);
    return {
      projectsCount: 0, activeProjectsCount: 0, servicesCount: 0,
      messagesCount: 0, newMessagesCount: 0, recentMessages: [],
    };
  }
}

export default async function DashboardPage() {
  const {
    projectsCount, activeProjectsCount, servicesCount,
    messagesCount, newMessagesCount, recentMessages,
  } = await getStats();

  const stats = [
    { label: "Projets", value: projectsCount, sub: `${activeProjectsCount} actif${activeProjectsCount !== 1 ? "s" : ""}`, accent: false },
    { label: "Services", value: servicesCount, sub: null, accent: false },
    { label: "Messages reçus", value: messagesCount, sub: null, accent: false },
    { label: "Nouveaux messages", value: newMessagesCount, sub: null, accent: newMessagesCount > 0 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">
          Vue d'ensemble
        </h1>
        <p className="text-[13px] text-white/35">
          Bienvenue dans votre espace d'administration.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, sub, accent }) => (
          <div
            key={label}
            className={`rounded-2xl border p-5 ${
              accent
                ? "border-green-400/20 bg-green-400/[0.04]"
                : "border-white/[0.07] bg-[#0d0d10]"
            }`}
          >
            <p className={`text-[26px] font-semibold tracking-tight ${accent ? "text-green-400/90" : "text-white/85"}`}>
              {value}
            </p>
            <p className="mt-1 text-[12px] text-white/30">{label}</p>
            {sub && <p className="mt-0.5 text-[11px] text-white/20">{sub}</p>}
          </div>
        ))}
      </div>

      {recentMessages.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium text-white/50">Derniers messages</p>
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10]">
            {recentMessages.map((message, i) => (
              <div
                key={message.id}
                className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                  i < recentMessages.length - 1 ? "border-b border-white/[0.05]" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {message.status === "new" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]" />
                  )}
                  <div>
                    <p className="text-[13px] text-white/75">{message.name}</p>
                    <p className="text-[11px] text-white/25">{message.subject}</p>
                  </div>
                </div>
                <span className="text-[11px] text-white/20">
                  {new Date(message.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
