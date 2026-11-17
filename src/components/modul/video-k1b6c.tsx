"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6C, VIDEO_MATERI_K1B6C } from "./story/k1b6C-video";

/* Sub-Bab C Bab 6 "Tutup Pasar Malam" (pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6C, { a: 1, k: 1 })];

export function VideoK1B6C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
