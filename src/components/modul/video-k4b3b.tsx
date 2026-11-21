"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B3B, VIDEO_MATERI_K4B3B } from "./story/k4b3b-video";

/* Sub-Bab B Bab 3 Kelas 4 "Barisan Kursi Pak Gunawan" (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B3B, { a: 1, k: 2 })];

export function VideoK4B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
