"use client";

import React from "react";
import { CARA_K1B1A, POIN_K1B1A, REFLEKSI_K1B1A, RUMAH_K1B1A, SUARA_POIN_K1B1A } from "@/lib/opsi2/poin-abstract-k1b1a";
import { PoinPentingK2, type ItemPoin } from "../kit-k2";

/**
 * Poin Penting dan Refleksi (Catatanku) penutup tahap Abstract, Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang).
 * Isi teks ada di src/lib/opsi2/poin-abstract-k1b1a.ts (diuji Node). TANPA penilaian.
 * Tombol terakhir memanggil `onSelesai` (dari TahapPermainan: menghentikan suara dan menyelesaikan sub-bab).
 */
export function PoinK1B1KA({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  const poin: ItemPoin[] = POIN_K1B1A.map((p) => ({
    ikon: p.ikon,
    nama: p.nama,
    suara: p.suara,
    isi: <p className="text-center text-base font-black leading-snug text-[#1C01A5]">{p.layar}</p>,
  }));
  return (
    <PoinPentingK2
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      suaraPoin={SUARA_POIN_K1B1A}
      poin={poin}
      cara={CARA_K1B1A}
      rumah={RUMAH_K1B1A}
      refleksi={REFLEKSI_K1B1A}
      teksSelesai="SELESAIKAN SUB-BAB A & LANJUTKAN ➡️"
    />
  );
}
