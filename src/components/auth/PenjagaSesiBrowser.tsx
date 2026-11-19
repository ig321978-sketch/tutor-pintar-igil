"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { adaSesiBrowser, hapusSesiBrowser } from "@/lib/sesi-browser";

const BEBAS = new Set(["/", "/login", "/daftar", "/situs-ditutup", "/403"]);

/**
 * Cookie auth bisa masih ada setelah tab ditutup. Tanpa tanda sessionStorage,
 * anggap user sudah menutup aplikasi → keluar, capaian di server tidak dihapus.
 */
export default function PenjagaSesiBrowser() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (BEBAS.has(pathname) || pathname.startsWith("/login") || pathname.startsWith("/daftar")) {
      return;
    }
    let batal = false;
    void (async () => {
      if (adaSesiBrowser()) return;
      try {
        const res = await fetch("/api/auth/saya", { cache: "no-store" });
        const json = (await res.json()) as { masuk?: boolean };
        if (batal || !json.masuk) return;
        await fetch("/api/auth/keluar", { method: "POST", cache: "no-store" });
        hapusSesiBrowser();
        if (!batal) {
          const tujuan = new URL("/", window.location.origin);
          tujuan.searchParams.set("next", pathname);
          router.replace(tujuan.pathname + tujuan.search);
          router.refresh();
        }
      } catch {
        // biarkan halaman; middleware atau tombol Masuk yang menangani
      }
    })();
    return () => {
      batal = true;
    };
  }, [pathname, router]);

  return null;
}
