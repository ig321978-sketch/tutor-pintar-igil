"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B4B, VIDEO_MATERI_K2B4B } from "./story/k2b4B-video";

/* Sub-Bab B Bab 4 Kelas 2 "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B4B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B4B, { a: 1, k: 1 })];

export function VideoK2B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
