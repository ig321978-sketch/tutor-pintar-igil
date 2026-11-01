"use client";

import { memo } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { PESAN_SLOT_MODUL_KOSONG } from "@/lib/slot-modul-kosong";

type PanelSimulasiProps = {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  kelamin?: KelaminGuru;
  sudahLulus?: boolean;
  onSelesai?: (lulus: boolean, catatan: string) => void;
  onMemuat?: (memuat: boolean) => void;
};

function PanelSimulasiModul(_props: PanelSimulasiProps) {
  return (
    <p className="rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#fbf6ea] px-5 py-8 text-center text-lg font-extrabold text-[#1C01A5]">
      {PESAN_SLOT_MODUL_KOSONG}
    </p>
  );
}

export default memo(PanelSimulasiModul);
