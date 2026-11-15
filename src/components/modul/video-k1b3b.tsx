"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3B, VIDEO_MATERI_K1B3B } from "./story/k1b3b-video";

/* Sub-Bab B (Berbagai Cara Pengurangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3B, { a: 1, k: 1 })];

export function VideoK1B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
