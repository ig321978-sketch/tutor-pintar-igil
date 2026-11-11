"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useProfilBelajar } from "@/components/modul/BelajarServer";
import { useUserRole } from "@/hooks/useUserRole";
import {
  LABEL_FASE,
  bolehAksesFase,
  faseDariKelas,
  faseDariSlugBab,
  type KodePhase,
} from "@/lib/fase";
import { bacaProgres } from "@/lib/progres";

/**
 * Gerbang UI isolasi fase: siswa/user di luar fase modul tidak bisa membuka isi bab.
 * Admin lolos. Fase akun anak (server) diutamakan; kalau belum masuk, pakai kelas di profil lokal.
 */
export function KunciAksesFase({ bab, children }: { bab: string; children: ReactNode }) {
  const { adalahAdmin, memuat: memuatAdmin } = useUserRole();
  const profilBelajar = useProfilBelajar();
  const [faseLokal, setFaseLokal] = useState<KodePhase | null>(null);
  const [siapLokal, setSiapLokal] = useState(false);

  useEffect(() => {
    setFaseLokal(faseDariKelas(bacaProgres().profil.kelas));
    setSiapLokal(true);
  }, []);

  const faseModul = faseDariSlugBab(bab);
  const faseServer =
    profilBelajar.status === "siap" && profilBelajar.aktif
      ? (profilBelajar.aktif.fase as KodePhase)
      : null;
  const faseSiswa = faseServer ?? faseLokal;

  const masihMemuat =
    memuatAdmin || profilBelajar.status === "memuat" || !siapLokal;

  if (masihMemuat) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center p-6 text-center">
        <p className="rounded-3xl border-4 border-amber-400 bg-white px-5 py-6 text-base font-black text-indigo-950">
          Mengecek fase belajarmu…
        </p>
      </main>
    );
  }

  if (adalahAdmin || bolehAksesFase(faseSiswa, faseModul)) {
    return <>{children}</>;
  }

  const labelSiswa = faseSiswa ? LABEL_FASE[faseSiswa] : "belum dipilih";
  const labelModul = faseModul ? LABEL_FASE[faseModul] : "modul ini";

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center p-4">
      <div className="w-full space-y-4 rounded-3xl border-4 border-indigo-900 bg-white p-6 text-center shadow-sm">
        <p className="text-3xl" aria-hidden="true">
          🔒
        </p>
        <h1 className="text-xl font-black text-indigo-950">Modul di luar fasemu</h1>
        <p className="text-sm font-semibold leading-relaxed text-slate-600">
          Fase belajarmu: <span className="font-black text-indigo-950">{labelSiswa}</span>.
          Modul ini untuk <span className="font-black text-indigo-950">{labelModul}</span>.
          IGIL mengunci akses lintas fase agar Poin Kualifikasi dan beasiswa tetap adil per jenjang.
        </p>
        <p className="text-xs font-semibold text-slate-500">
          Dalam satu fase kamu tetap boleh membuka lintas kelas (misalnya Kelas 3 dan 4 di Fase B).
        </p>
        <Link
          href="/ruang-belajar"
          className="inline-flex rounded-2xl border-2 border-indigo-950 bg-amber-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-indigo-950"
        >
          Kembali ke Ruang Belajar
        </Link>
      </div>
    </main>
  );
}
