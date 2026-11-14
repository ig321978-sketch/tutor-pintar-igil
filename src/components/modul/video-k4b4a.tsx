"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B4A, VIDEO_MATERI_K4B4A } from "./story/k4b4a-video";

/* Sub-Bab A (Pengukuran Luas, termasuk pembuka bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B4A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B4A, { a: 1, k: 3 })];

export function VideoK4B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
