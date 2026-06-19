"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  function handleBack() {
    
    const isDetailPage = /^\/projects\/[^/]+$/.test(pathname);
    const destination = isDetailPage ? "/projects" : "/";

    router.push(destination);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  return (
    <button
      onClick={handleBack}
      className="group cursor-pointer flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[13px] text-white/40 transition-all duration-200 hover:border-white/18 hover:bg-white/[0.04] hover:text-white/80"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Retour
    </button>
  );
}
