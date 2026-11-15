"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B2C, VIDEO_MATERI_K2B2C } from "./story/k2b2C-video";

/* Sub-Bab C Bab 2 Kelas 2 (Soal Cerita Penjumlahan dan Pengurangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B2C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B2C, { a: 1, k: 1 })];

export function VideoK2B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
