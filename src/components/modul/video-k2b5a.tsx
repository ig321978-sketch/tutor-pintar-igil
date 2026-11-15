"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B5A, VIDEO_MATERI_K2B5A } from "./story/k2b5A-video";

/* Sub-Bab A Bab 5 Kelas 2 (Setengah dari Benda Utuh): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B5A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B5A, { a: 1, k: 1 })];

export function VideoK2B5A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
