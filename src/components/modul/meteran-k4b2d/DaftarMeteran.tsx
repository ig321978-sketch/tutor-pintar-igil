"use client";

import React from "react";
import InfoMeteranK4B2 from "./InfoMeteran";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab D: dua kartu (papan kisi dan jembatan desimal). Pembungkus tipis untuk InfoMeteran; nama ekspor tetap untuk pemasang.
 */
export default function DaftarMeteranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfoMeteranK4B2 speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarMeteranK4B2 };
