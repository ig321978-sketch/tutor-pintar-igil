"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B2B, VIDEO_MATERI_K1B2B } from "./story/k1b2b-video";

/* Sub-Bab B Bab 2 "Panen Pertama dan Keranjang Sepuluh" (berbagai cara menjumlah): video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B2B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B2B, { a: 1, k: 1 })];

export function VideoK1B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
