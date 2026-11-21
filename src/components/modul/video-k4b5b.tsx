"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B5B, VIDEO_MATERI_K4B5B } from "./story/k4b5b-video";

/* Sub-Bab B Bab 5 Kelas 4 "Mosaik Pak Rudi" (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B5B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B5B, { a: 1, k: 2 })];

export function VideoK4B5B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
