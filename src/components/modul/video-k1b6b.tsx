"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6B, VIDEO_MATERI_K1B6B } from "./story/k1b6B-video";

/* Sub-Bab B Bab 6 (Penjumlahan yang Hasilnya Kurang dari 20): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6B, { a: 1, k: 1 })];

export function VideoK1B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
