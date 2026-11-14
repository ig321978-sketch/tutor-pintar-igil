"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B5B, VIDEO_MATERI_K4B5B } from "./story/k4b5b-video";

/* Sub-Bab B (Komposisi dan Dekomposisi, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B5B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B5B, { a: 1, k: 3 })];

export function VideoK4B5B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
