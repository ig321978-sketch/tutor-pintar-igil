"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B3B, VIDEO_MATERI_K4B3B } from "./story/k4b3b-video";

/* Sub-Bab B (Pola Bilangan, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B3B, { a: 1, k: 3 })];

export function VideoK4B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
