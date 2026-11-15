"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B3B, VIDEO_MATERI_K2B3B } from "./story/k2b3B-video";

/* Sub-Bab B Bab 3 Kelas 2 (Mengurai dan Menyusun Bangun Datar): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B3B, { a: 1, k: 1 })];

export function VideoK2B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
