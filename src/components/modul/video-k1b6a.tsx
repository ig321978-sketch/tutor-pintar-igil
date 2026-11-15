"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6A, VIDEO_MATERI_K1B6A } from "./story/k1b6A-video";

/* Sub-Bab A Bab 6 (Mengenal Konsep Lebih dari, Kurang dari, dan Selisih): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6A, { a: 1, k: 1 })];

export function VideoK1B6A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
