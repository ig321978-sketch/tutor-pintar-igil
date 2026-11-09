"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { REPOSITORI_MODUL } from "@/lib/kurikulum";
import { situsHanyaAdmin } from "@/lib/situs-hanya-admin";

const MENU = [
  { href: "/ruang-belajar", label: "📚 Ruang Belajar" },
  { href: "/ranking", label: "🏆 Ranking & Beasiswa" },
] as const;

/** Menu lain masih tahap tinjau: hanya tampil untuk admin sampai data nyata tersambung. */
const MENU_TINJAU = [
  { href: "/rapor", label: "📊 Rapor & Sertifikat" },
  { href: "/dasbor", label: "🏠 Dasbor & Info" },
  { href: "/daftar", label: "📝 Pendaftaran Anak" },
] as const;

function tautanAktif(pathname: string, href: string): boolean {
  if (href === "/ruang-belajar") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [terbuka, setTerbuka] = useState(false);
  const { user, memuat, keluar, adalahAdmin } = useUserRole();

  useEffect(() => {
    if (!terbuka) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function tutupDenganEscape(kejadian: KeyboardEvent) {
      if (kejadian.key === "Escape") setTerbuka(false);
    }
    window.addEventListener("keydown", tutupDenganEscape);
    const aktif = document.querySelector("#sidebar-repositori a[aria-current='page']");
    aktif?.scrollIntoView({ block: "nearest" });
    return () => {
      document.body.style.overflow = sebelumnya;
      window.removeEventListener("keydown", tutupDenganEscape);
    };
  }, [terbuka, pathname]);

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
          className="igil-tanpa-tepi shrink-0 rounded-xl px-2 py-1 text-xl font-extrabold tracking-tight text-[#1C01A5]"
          onClick={() => setTerbuka(false)}
        >
          <span className="mr-1 text-[#F0AB00]">🎓</span>$IGIL
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
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1C01A5] px-2.5 py-2 text-sm font-extrabold text-[#1C01A5] lg:hidden"
          onClick={() => setTerbuka((nilai) => !nilai)}
          aria-expanded={terbuka}
          aria-controls="sidebar-repositori"
          aria-label={terbuka ? "Tutup repositori" : "Buka repositori"}
        >
          {terbuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          Repositori
        </button>
      </nav>

      {terbuka
        ? createPortal(
        <div className="lg:hidden">
          <button
            type="button"
            className="igil-tanpa-tepi fixed inset-0 z-[70] bg-[#1C01A5]/45"
            aria-label="Tutup repositori"
            onClick={() => setTerbuka(false)}
          />
          <aside
            id="sidebar-repositori"
            role="dialog"
            aria-modal="true"
            aria-label="Repositori pembelajaran"
            className="fixed inset-y-0 left-0 z-[70] flex w-full max-w-md flex-col border-r-4 border-[#F0AB00] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#1C01A5]/10 px-4 py-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#F0AB00]">
                  $IGIL
                </p>
                <h2 className="text-lg font-extrabold text-[#1C01A5]">Repositori</h2>
              </div>
              <button
                type="button"
                className="rounded-xl border-2 border-[#1C01A5] p-2 text-[#1C01A5]"
                onClick={() => setTerbuka(false)}
                aria-label="Tutup repositori"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-3 py-3">
              <nav className="space-y-1" aria-label="Menu">
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
              </nav>

              <div className="space-y-4">
                {REPOSITORI_MODUL.map((kelompok) => (
                  <section key={kelompok.kelas}>
                    <h3 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-wide text-[#F0AB00]">
                      {kelompok.kelas} · Matematika
                    </h3>
                    <ul className="space-y-1">
                      {kelompok.modul.map((modul) => {
                        const aktif = tautanAktif(pathname, modul.href);
                        return (
                          <li key={modul.href}>
                            <Link
                              href={modul.href}
                              onClick={() => setTerbuka(false)}
                              aria-current={aktif ? "page" : undefined}
                              className={`igil-tombol block rounded-xl px-3 py-2 text-sm font-bold leading-snug ${
                                aktif
                                  ? "border-[#FFE566] bg-[#1C01A5] text-white"
                                  : "border-[#1C01A5]/25 bg-white text-[#1C01A5] hover:bg-[#F0AB00]/15"
                              }`}
                            >
                              {modul.judul}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1C01A5]/10 px-3 py-3">
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
          </aside>
        </div>,
        document.body,
      )
        : null}
    </header>
  );
}
