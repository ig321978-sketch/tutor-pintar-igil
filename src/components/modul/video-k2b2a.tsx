"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B2A, VIDEO_MATERI_K2B2A } from "./story/k2b2A-video";

/* Sub-Bab A Bab 2 Kelas 2 (Berbagai Cara Melakukan Penjumlahan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B2A, { a: 1, k: 1 })];

export function VideoK2B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}

/** Nama lama yang masih diimpor IgilModulePlayer sampai registri diperbarui. */
export const VideoPenjumlahanK2B2A = VideoK2B2A;
