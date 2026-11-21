"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B4A, VIDEO_MATERI_K4B4A } from "./story/k4b4a-video";

/* Sub-Bab A Bab 4 Kelas 4 "Lantai Ubin Bu Sinta" (pengukuran luas), awal cerita Kolam Renang Tirta Ceria: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B4A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B4A, { a: 1, k: 1 })];

export function VideoK4B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
