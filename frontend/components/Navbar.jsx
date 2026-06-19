"use client";
import Link from "next/link";

const navLinks = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-6 pt-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/[0.07] bg-[#08080A]/80 px-5 py-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_7px_#4ade80]" />
          Friemann LOKONON
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[13px] text-white/40 transition-colors hover:text-white/90"
            >
              {label}
            </a>
          ))}
        </nav>

        <Link href="#contact" className="rounded-xl cursor-pointer bg-green-400 px-4 py-1.5 text-[13px] font-medium text-zinc-950 transition duration-300 hover:bg-green-300 hover:-translate-y-px">
          Me contacter
        </Link>
      </div>
    </header>
  );
}