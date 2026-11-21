"use client";

import React from "react";
import PetaJahitK4B2 from "./PetaJahit";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab C: Meja Jahit Kak Sekar. Pembungkus tipis untuk PetaJahit (gambar meja jahit dengan lima label kosong); nama ekspor tetap untuk pemasang.
 */
export default function MejaJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaJahitK4B2 speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MejaJahitK4B2 };
