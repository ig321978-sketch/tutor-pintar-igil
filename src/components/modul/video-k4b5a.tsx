"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B5A, VIDEO_MATERI_K4B5A } from "./story/k4b5a-video";

/* Sub-Bab A Bab 5 Kelas 4 "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B5A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B5A, { a: 1, k: 1 })];

export function VideoK4B5A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
