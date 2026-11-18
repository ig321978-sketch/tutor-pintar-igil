"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B2A, VIDEO_MATERI_K2B2A } from "./story/k2b2A-video";

/* Sub-Bab A Bab 2 Kelas 2 "Kiriman dari Gudang" (penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B2A, { a: 1, k: 1 })];

export function VideoK2B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
