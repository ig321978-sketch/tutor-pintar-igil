"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6B, VIDEO_MATERI_K1B6B } from "./story/k1b6B-video";

/* Sub-Bab B Bab 6 "Loket Karcis" (penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6B, { a: 1, k: 1 })];

export function VideoK1B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
