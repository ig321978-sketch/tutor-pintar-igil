"use client";

import React from "react";
import InfoJahitK4B2 from "./InfoJahit";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab C: dua kartu (deret potongan kain dan kotak jahit). Pembungkus tipis untuk InfoJahit; nama ekspor tetap untuk pemasang.
 */
export default function DaftarJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfoJahitK4B2 speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarJahitK4B2 };
