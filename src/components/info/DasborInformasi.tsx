"use client";

import Link from "next/link";
import { useProfilSiswa } from "@/components/rapor/umum";
import { faseDariKelas } from "@/lib/fase";
import HowIgilWorksSection from "./HowIgilWorksSection";
import PenegasanDalamAplikasi from "./PenegasanDalamAplikasi";

/**
 * Pusat informasi di dasbor akun yang sudah login. Fase mengikuti profil anak yang aktif.
 * Profil dibaca dari penyimpanan perangkat sampai akun siswa tersambung ke server.
 */
export default function DasborInformasi() {
  const profil = useProfilSiswa();
  const fase = faseDariKelas(profil.kelas) ?? undefined;

  return (
    <div className="space-y-6 pb-10">
      <HowIgilWorksSection faseAnak={fase} namaAnak={profil.nama} />
      <div className="mx-auto w-full max-w-5xl px-2">
        <Link
          href="/transparansi"
          className="igil-tombol flex items-center gap-3 rounded-3xl border-amber-400 bg-amber-400 p-4 text-indigo-950 shadow-md hover:bg-amber-300"
        >
          <span aria-hidden="true" className="text-3xl">
            🔍
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-black leading-tight">Lihat Laporan Penggunaan Dana</span>
            <span className="block text-sm font-semibold leading-snug">
              Ke mana uang langganan pergi, setiap bulan, lengkap dengan cek hitung.
            </span>
          </span>
          <span aria-hidden="true" className="text-2xl font-black">
            →
          </span>
        </Link>
      </div>
      <div className="px-2">
        <PenegasanDalamAplikasi />
      </div>
    </div>
  );
}
