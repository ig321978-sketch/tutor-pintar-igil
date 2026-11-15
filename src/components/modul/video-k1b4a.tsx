"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B4A, VIDEO_MATERI_K1B4A } from "./story/k1b4a-video";

/* Sub-Bab A Bab 4 (Mendeskripsikan Benda Berdasarkan Bentuk): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B4A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B4A, { a: 1, k: 1 })];

export function VideoK1B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
