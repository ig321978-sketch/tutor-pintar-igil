"use client";

import React from "react";
import type { Umum } from "../SubBabBBanding";
import { CPA_K1B1A } from "@/data/opsi2/k1b1a-cpa";
import { TahapOpsi2 } from "./TahapOpsi2";
import "./aksi-concrete-k1b1a";

/**
 * Tahap Concrete Opsi 2, Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): sepuluh soal tindakan, tanpa penilaian.
 * Tipe: ComponentType<PropsTahapBaru> (Umum memiliki bentuk yang sama). Data: src/data/opsi2/k1b1a-cpa.ts.
 */
export function ConcreteK1B1KA(props: Umum) {
  return (
    <TahapOpsi2
      umum={props}
      tahap={4}
      pita={{ ikon: "\u{1F9FA}", nama: "CONCRETE", cara: "Pegang, geser, dan hitung!", warna: "#8A5322" }}
      soal={CPA_K1B1A.concrete.soal}
      teksAkhir="LANJUTKAN KE PICTURE ⬇️"
    />
  );
}
