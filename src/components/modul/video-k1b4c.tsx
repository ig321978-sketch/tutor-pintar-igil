"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B4C, VIDEO_MATERI_K1B4C } from "./story/k1b4c-video";

/* Sub-Bab C (Menyusun dan Mengurai Bentuk Bangun): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B4C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B4C, { a: 1, k: 1 })];

export function VideoK1B4C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
