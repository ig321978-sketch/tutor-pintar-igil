"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { adaSesiBrowser, hapusSesiBrowser } from "@/lib/sesi-browser";

function tujuanAman(mentah: string | null): string {
  return mentah && mentah.startsWith("/") && !mentah.startsWith("//") && !mentah.startsWith("/tutor")
    ? mentah
    : "/ruang-belajar";
}

/**
 * Layar pertama aplikasi: logo IGIL dengan dua tombol.
 * Daftar = buat akun (syarat masuk, bukan berlangganan). Masuk = sudah punya akun.
 * Menutup aplikasi berarti keluar: tanpa tanda sesi di tab ini, pengguna harus Masuk lagi
 * (capaian belajar tetap di server).
 */
export default function GerbangMasuk() {
  const router = useRouter();
  const params = useSearchParams();
  const next = tujuanAman(params.get("next"));
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    let batal = false;
    void (async () => {
      try {
        const res = await fetch("/api/auth/saya", { cache: "no-store" });
        const json = (await res.json()) as { masuk?: boolean };
        if (batal) return;
        if (json.masuk && adaSesiBrowser()) {
          router.replace(next);
          return;
        }
        if (json.masuk) {
          // Aplikasi ditutup lalu dibuka lagi: akhiri sesi lama, capaian tidak dihapus.
          await fetch("/api/auth/keluar", { method: "POST", cache: "no-store" });
          hapusSesiBrowser();
        }
      } catch {
        // tampilkan gerbang saja
      } finally {
        if (!batal) setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, [next, router]);

  const q = `?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-10">
      <section
        className="w-full max-w-sm space-y-6 rounded-3xl bg-white p-7 text-center shadow-2xl"
        data-testid="gerbang-masuk"
        aria-label="Selamat datang di IGIL"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-512.png"
          alt="Logo IGIL"
          width={112}
          height={112}
          className="mx-auto h-28 w-28 rounded-3xl shadow-md"
        />
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1C01A5]">$IGIL</h1>
          <p className="mt-1 text-sm font-bold text-slate-600">Interactive Guided Independent Learning</p>
        </div>

        {memuat ? (
          <p className="py-6 text-sm font-bold text-indigo-950" role="status">
            Menyiapkan…
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href={`/login${q}&mode=daftar`}
              data-testid="tombol-daftar"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-lg font-black text-indigo-950 shadow-md hover:bg-amber-300"
            >
              Daftar
            </Link>
            <Link
              href={`/login${q}`}
              data-testid="tombol-masuk"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#1C01A5] bg-white px-5 py-3 text-lg font-black text-[#1C01A5] hover:bg-indigo-50"
            >
              Masuk
            </Link>
            <p className="text-xs font-semibold leading-relaxed text-slate-500">
              Daftar hanya untuk membuat akun agar bisa masuk. Bukan berlangganan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
