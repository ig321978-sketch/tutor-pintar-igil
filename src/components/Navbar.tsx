"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { situsHanyaAdmin } from "@/lib/situs-hanya-admin";

const MENU = [
  { href: "/ruang-belajar", label: "📚 Ruang Belajar" },
  { href: "/rapor", label: "📊 Rapor & Sertifikat" },
  { href: "/ranking", label: "🏆 Ranking & Beasiswa" },
  { href: "/komunitas", label: "🏫 Komunitas IGIL" },
] as const;

/** Menu lain masih tahap tinjau: hanya tampil untuk admin sampai data nyata tersambung. */
const MENU_TINJAU = [
  { href: "/dasbor", label: "🏠 Dasbor & Info" },
  { href: "/daftar", label: "📝 Pendaftaran Anak" },
] as const;

function tautanAktif(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [terbuka, setTerbuka] = useState(false);
  const { user, memuat, keluar, adalahAdmin } = useUserRole();

  if (pathname.startsWith("/simulasi-embed")) return null;

  const menu: readonly { href: string; label: string }[] = adalahAdmin ? [...MENU, ...MENU_TINJAU] : MENU;

  async function klikKeluar() {
    await keluar();
    setTerbuka(false);
    router.push(situsHanyaAdmin() ? "/login" : "/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#1C01A5]/10 bg-white">
      <nav className="flex w-full items-center justify-between gap-4 px-2 py-3">
        <Link
          href="/ruang-belajar"
          className="igil-tanpa-tepi flex min-w-0 items-center gap-1 rounded-xl px-2 py-1 text-[#1C01A5]"
          onClick={() => setTerbuka(false)}
        >
          <span className="shrink-0 text-xl leading-none text-[#F0AB00]" aria-hidden="true">🎓</span>
          <span className="flex min-w-0 flex-col items-start">
            <span className="text-xl font-extrabold leading-none tracking-tight">$IGIL</span>
            <span className="text-[11px] font-bold leading-tight text-[#1C01A5] sm:text-xs">
              Interactive Guided Independent Learning
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {menu.map((item) => {
            const aktif = tautanAktif(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`igil-tombol rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                  aktif
                    ? "border-[#FFE566] bg-[#1C01A5] text-white"
                    : "border-[#1C01A5] text-[#1C01A5] hover:bg-[#F0AB00]/15 hover:text-[#F0AB00]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {!memuat && user ? (
            <button
              type="button"
              onClick={() => void klikKeluar()}
              className="igil-tombol rounded-full border-[#1C01A5] px-3 py-2 text-sm font-bold text-[#1C01A5] hover:bg-[#F0AB00]/15"
            >
              Keluar
            </button>
          ) : !memuat ? (
            <Link
              href="/login"
              className="igil-tombol rounded-full border-[#1C01A5] px-3 py-2 text-sm font-bold text-[#1C01A5] hover:bg-[#F0AB00]/15"
            >
              Masuk
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="rounded-xl border-2 border-[#1C01A5] p-2 text-[#1C01A5] lg:hidden"
          onClick={() => setTerbuka((nilai) => !nilai)}
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
        >
          {terbuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {terbuka ? (
        <div className="space-y-1 border-t border-[#1C01A5]/10 bg-white px-2 py-3 lg:hidden">
          {menu.map((item) => {
            const aktif = tautanAktif(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setTerbuka(false)}
                className={`igil-tombol block rounded-xl px-3 py-2 text-sm font-bold ${
                  aktif
                    ? "border-[#FFE566] bg-[#1C01A5] text-white"
                    : "border-[#1C01A5] text-[#1C01A5] hover:bg-[#F0AB00]/15"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {!memuat && user ? (
            <button
              type="button"
              onClick={() => void klikKeluar()}
              className="igil-tombol block w-full rounded-xl border-[#1C01A5] px-3 py-2 text-left text-sm font-bold text-[#1C01A5]"
            >
              Keluar
            </button>
          ) : !memuat ? (
            <Link
              href="/login"
              onClick={() => setTerbuka(false)}
              className="igil-tombol block rounded-xl border-[#1C01A5] px-3 py-2 text-sm font-bold text-[#1C01A5]"
            >
              Masuk
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
