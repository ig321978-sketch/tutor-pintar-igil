"use client";

import React from "react";
import type { Umum } from "../SubBabBBanding";
import { CPA_K1B1A } from "@/data/opsi2/k1b1a-cpa";
import { TahapOpsi2 } from "./TahapOpsi2";
import "./aksi-picture-k1b1a";

/**
 * Tahap Picture Opsi 2, Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): sepuluh soal tindakan pada diagram polos, tanpa penilaian.
 * Tipe: ComponentType<PropsTahapBaru> (Umum memiliki bentuk yang sama). Data: src/data/opsi2/k1b1a-cpa.ts.
 */
export function PictureK1B1KA(props: Umum) {
  return (
    <TahapOpsi2
      umum={props}
      tahap={5}
      pita={{ ikon: "\u{25CE}", nama: "PICTURE", cara: "Warnai, tandai, dan hubungkan!", warna: "#B45309" }}
      soal={CPA_K1B1A.picture.soal}
      teksAkhir="LANJUTKAN KE ABSTRACT ⬇️"
    />
  );
}
