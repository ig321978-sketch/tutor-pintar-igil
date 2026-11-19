"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { adaSesiBrowser } from "@/lib/sesi-browser";

/**
 * Gerbang pertama aplikasi: Daftar (buat akun masuk) atau Masuk.
 * Daftar di sini bukan berlangganan.
 */
export default function GerbangMasuk() {
  const router = useRouter();
  const params = useSearchParams();
  const nextMentah = params.get("next") || "/ruang-belajar";
  const next =
    nextMentah.startsWith("/") && !nextMentah.startsWith("/tutor") ? nextMentah : "/ruang-belajar";
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
      } catch {
        // tampilkan gerbang
      } finally {
        if (!batal) setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, [next, router]);

  const daftar = `/daftar?next=${encodeURIComponent(next)}`;
  const masuk = `/login?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-10">
      <section
        className="w-full max-w-md space-y-6 rounded-3xl bg-white p-6 text-center shadow-xl sm:p-8"
        data-testid="gerbang-masuk"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-950 text-4xl" aria-hidden>
          🎓
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-600">$IGIL</p>
          <h1 className="mt-1 text-2xl font-black text-indigo-950 sm:text-3xl">Interactive Guided Independent Learning</h1>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Daftar hanya untuk masuk ke Ruang Belajar. Berlangganan opsional, lewat menu Berlangganan setelah masuk.
          </p>
        </div>

        {memuat ? (
          <p className="text-sm font-bold text-indigo-950">Menyiapkan…</p>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href={daftar}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-base font-black text-indigo-950"
            >
              Daftar
            </Link>
            <Link
              href={masuk}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-indigo-900 bg-white px-5 py-3 text-base font-black text-indigo-950"
            >
              Masuk
            </Link>
          </div>
        )}
        <p className="text-xs font-semibold text-slate-500">
          Setelah aplikasi ditutup, Anda keluar dan perlu Masuk lagi. Capaian belajar tetap tersimpan di server.
        </p>
      </section>
    </main>
  );
}
