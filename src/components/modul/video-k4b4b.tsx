"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B4B, VIDEO_MATERI_K4B4B } from "./story/k4b4b-video";

/* Sub-Bab B Bab 4 Kelas 4 "Ember Pak Anto" (volume), akhir cerita Kolam Renang Tirta Ceria: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B4B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B4B, { a: 1, k: 2 })];

export function VideoK4B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
