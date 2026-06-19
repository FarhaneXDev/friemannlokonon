"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Vue d'ensemble",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Projets",
    href: "/dashboard/projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/dashboard/services",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col justify-between border-r border-white/[0.07] bg-[#0a0a0c] px-5 py-6">

      <div>
        <div className="mb-8 flex items-center gap-2 px-2 text-sm font-semibold tracking-tight text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_7px_#4ade80]" />
          Dashboard
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition-all duration-200 ${
                  isActive
                    ? "bg-green-400/[0.08] text-green-400/90 border border-green-400/20"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/80 border border-transparent"
                }`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold text-green-400/70">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-[12px] font-medium text-white/70">{user.username}</span>
            <span className="truncate text-[11px] text-white/25">{user.email}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-white/35 transition-all duration-200 hover:bg-red-400/[0.06] hover:text-red-400/80"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
