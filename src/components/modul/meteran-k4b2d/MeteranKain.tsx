"use client";

import React from "react";
import PetaMeteranK4B2 from "./PetaMeteran";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab D: Meteran Kain Pak Bagas. Pembungkus tipis untuk PetaMeteran (kain bermeteran dengan lima label kosong); nama ekspor tetap untuk pemasang.
 */
export default function MeteranKainK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaMeteranK4B2 speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MeteranKainK4B2 };
