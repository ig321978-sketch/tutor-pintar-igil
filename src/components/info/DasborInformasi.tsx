"use client";

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
      <div className="px-2">
        <PenegasanDalamAplikasi />
      </div>
    </div>
  );
}
