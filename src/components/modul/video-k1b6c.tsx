"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6C, VIDEO_MATERI_K1B6C } from "./story/k1b6C-video";

/* Sub-Bab C Bab 6 (Pengurangan yang Hasilnya Kurang dari 20): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6C, { a: 1, k: 1 })];

export function VideoK1B6C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
