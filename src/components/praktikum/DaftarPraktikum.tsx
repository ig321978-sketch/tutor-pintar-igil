"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useBukaSemuaKunci } from "@/lib/buka-semua-kunci";
import { babUjianSempurna } from "@/lib/capaian";
import { useCapaian } from "@/lib/capaian-klien";
import { useSemuaPraktikumTerkirim, useUjianLulus } from "@/lib/praktikum-blok";
import { SYARAT_BAB_KONSEP, SYARAT_BAB_LULUS, idPraktikumBab } from "@/lib/praktikum-pilot";

export type BabPraktikum = { kode: string; kelas: number; bab: number; judul: string; kedua: boolean };

const BLOK_1 = { id: "mtk-1-blok1", bab: ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4"] };

export default function DaftarPraktikum({ bab }: { bab: readonly BabPraktikum[] }) {
  const ujianLama = useUjianLulus();
  const capaian = useCapaian();
  const terkirim = useSemuaPraktikumTerkirim();
  const bukaSemua = useBukaSemuaKunci();

  const siap = ujianLama !== null && capaian !== null && terkirim !== null;
  const tuntas = useMemo(() => babUjianSempurna(capaian ?? {}, ujianLama ?? []), [capaian, ujianLama]);

  // Pilot: setiap bab yang lulus Ujian 100% langsung menerbitkan satu Praktikum.
  const terbuka = bab.filter((b) => tuntas.has(b.kode));
  const tampil = bukaSemua ? bab.filter((b) => !b.kedua || tuntas.has(b.kode)) : terbuka;
  const tuntasBlok1 = BLOK_1.bab.filter((b) => tuntas.has(b)).length;

  return (
    <main className="min-h-screen bg-indigo-50/40 pb-16">
      <header className="bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Matematika · Pilot Project</p>
          <h1 className="mt-2 text-2xl font-black md:text-3xl">🧪 Praktikum</h1>
          <p className="mt-2 text-sm text-indigo-100">
            Praktikum bukan tab di dalam modul bab. Area ini khusus siswa berlangganan yang sudah lulus Ujian
            100%. Isinya dibuat otomatis saat syarat itu terpenuhi.
          </p>
          <span className="mt-4 inline-block rounded-full bg-amber-400 px-4 py-1.5 text-sm font-black text-indigo-950">
            ⭐ 50 Poin Kualifikasi per Praktikum
          </span>
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-3xl space-y-5 px-4">
        <section className="rounded-3xl border-2 border-amber-400 bg-white p-5 shadow-sm">
          <h2 className="text-base font-black text-indigo-950">Dua syarat wajib</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-indigo-950">
            <li>
              <span className="font-black">1. Langganan aktif.</span> Tanpa langganan, halaman Praktikum tetap
              terkunci.
            </li>
            <li>
              <span className="font-black">2. Lulus Ujian 100%.</span> Pilot: Praktikum bab terbuka setelah Ujian
              bab itu lulus 100%. Aturan penuh blok: setelah lulus Ujian 100% di {SYARAT_BAB_KONSEP} bab.
            </li>
            <li>
              <span className="font-black">Masa uji coba:</span> saat ini Praktikum bab terbit setelah lulus Ujian
              100% di {SYARAT_BAB_LULUS} bab.
            </li>
          </ul>
        </section>

        {!siap ? (
          <div className="h-40 animate-pulse rounded-3xl bg-indigo-100/60" />
        ) : (
          <>
            {bukaSemua ? (
              <p className="rounded-2xl bg-indigo-100 px-4 py-2 text-xs font-bold text-indigo-950">
                Mode periksa pemilik: semua Praktikum bab ditampilkan walau Ujiannya belum lulus.
              </p>
            ) : null}

            {tampil.length === 0 ? (
              <section className="rounded-3xl border-2 border-dashed border-indigo-200 bg-white p-6 text-center">
                <p className="text-4xl" aria-hidden>🔒</p>
                <h2 className="mt-2 text-lg font-black text-indigo-950">Belum ada Praktikum</h2>
                <p className="mt-1 text-sm text-indigo-900">
                  Lulus Ujian dengan nilai 100 di satu bab. Praktikum bab itu langsung muncul di sini.
                </p>
                <Link
                  href="/ruang-belajar"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full border-4 border-amber-400 bg-[#1C01A5] px-5 text-sm font-black text-amber-300"
                >
                  📚 Ke Ruang Belajar
                </Link>
              </section>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {tampil.map((b) => {
                  const kirim = terkirim?.[idPraktikumBab(b.kode)];
                  const lulus = tuntas.has(b.kode);
                  return (
                    <li key={b.kode}>
                      <Link
                        href={`/praktikum/${b.kode}`}
                        className={`igil-tombol flex h-full flex-col gap-1 rounded-3xl border-2 bg-white p-4 shadow-sm ${
                          kirim ? "border-indigo-100" : "border-amber-400"
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                          Kelas {b.kelas} · Bab {b.bab}
                          {b.kedua ? " · Modul Kedua" : ""}
                        </span>
                        <span className="text-base font-black leading-snug text-indigo-950">{b.judul}</span>
                        <span className="mt-auto pt-2 text-xs font-bold text-indigo-900">
                          {kirim
                            ? `📬 Sudah diserahkan ${new Date(kirim.dikirimPada).toLocaleDateString("id-ID")}`
                            : lulus
                              ? "✨ Baru terbit · Kerjakan sekarang"
                              : "🔒 Ujian belum lulus 100%"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <section className="rounded-3xl border-2 border-indigo-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-indigo-700">Praktikum lintas {SYARAT_BAB_KONSEP} bab</p>
              <h2 className="mt-1 text-base font-black text-indigo-950">Praktikum Blok 1 · Kelas 1 Bab 1–4</h2>
              <p className="mt-1 text-sm text-indigo-900">
                {tuntasBlok1} dari {BLOK_1.bab.length} bab sudah lulus Ujian 100%.
                {terkirim?.[BLOK_1.id] ? " Sudah diserahkan." : ""}
              </p>
              <Link href={`/praktikum/${BLOK_1.id}`} className="mt-2 inline-block text-sm font-black text-[#1C01A5] underline underline-offset-4">
                Lihat Praktikum Blok 1 →
              </Link>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
