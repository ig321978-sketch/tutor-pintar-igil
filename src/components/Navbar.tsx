"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const MENU = [
  { href: "/tutor", label: "🤖 AI Tutor" },
  { href: "/ruang-belajar", label: "📚 Ruang Belajar" },
  { href: "/laboratorium", label: "🧪 Laboratorium Praktikum" },
  { href: "/rapor", label: "📊 Rapor Siswa" },
  { href: "/ranking", label: "🏆 Ranking Nasional" },
] as const;

function tautanAktif(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1C01A5]/10 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/ruang-belajar"
          className="shrink-0 text-xl font-extrabold tracking-tight text-[#1C01A5]"
          onClick={() => setTerbuka(false)}
        >
          <span className="mr-1 text-[#F0AB00]">🎓</span>$IGIL
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {MENU.map((item) => {
            const aktif = tautanAktif(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                  aktif
                    ? "bg-[#1C01A5] text-white"
                    : "text-[#1C01A5] hover:bg-[#F0AB00]/15 hover:text-[#F0AB00]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="rounded-xl border border-[#1C01A5]/20 p-2 text-[#1C01A5] lg:hidden"
          onClick={() => setTerbuka((nilai) => !nilai)}
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
        >
          {terbuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {terbuka ? (
        <div className="space-y-1 border-t border-[#1C01A5]/10 bg-white px-4 py-3 lg:hidden">
          {MENU.map((item) => {
            const aktif = tautanAktif(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setTerbuka(false)}
                className={`block rounded-xl px-3 py-2 text-sm font-bold ${
                  aktif
                    ? "bg-[#1C01A5] text-white"
                    : "text-[#1C01A5] hover:bg-[#F0AB00]/15"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
