"use client";

import React from "react";
import type { Umum } from "../SubBabBBanding";
import { CPA_K1B1A } from "@/data/opsi2/k1b1a-cpa";
import { TahapOpsi2 } from "./TahapOpsi2";
import { PoinK1B1KA } from "./poin-k1b1a";
import "./aksi-abstract-k1b1a";

/**
 * Tahap Abstract Opsi 2, Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): sepuluh soal lambang dan kata, tanpa penilaian,
 * lalu kartu Poin Penting dan Refleksi. Tipe: ComponentType<PropsTahapBaru> (Umum memiliki bentuk yang sama).
 * Data: src/data/opsi2/k1b1a-cpa.ts. Tombol "SELESAIKAN SUB-BAB A & LANJUTKAN" memanggil onSelesai lewat TahapPermainan.
 */
export function AbstractK1B1KA(props: Umum) {
  return (
    <TahapOpsi2
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan lambang", warna: "#1C01A5" }}
      soal={CPA_K1B1A.abstract.soal}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK1B1KA speakGuru={props.speakGuru} onSelesai={selesai} />}
    />
  );
}
