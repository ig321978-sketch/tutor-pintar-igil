"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B6B, VIDEO_MATERI_K4B6B } from "./story/k4b6b-video";

/* Sub-Bab B (Diagram Batang, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B6B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B6B, { a: 1, k: 3 })];

export function VideoK4B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
