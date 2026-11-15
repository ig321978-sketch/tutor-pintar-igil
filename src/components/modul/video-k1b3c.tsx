"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3C, VIDEO_MATERI_K1B3C } from "./story/k1b3c-video";

/* Sub-Bab C (Hubungan Penjumlahan dan Pengurangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3C, { a: 1, k: 1 })];

export function VideoK1B3C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
