"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B3A, VIDEO_MATERI_K4B3A } from "./story/k4b3a-video";

/* Sub-Bab A (Pola Gambar, termasuk pembuka bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B3A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B3A, { a: 1, k: 3 })];

export function VideoK4B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
