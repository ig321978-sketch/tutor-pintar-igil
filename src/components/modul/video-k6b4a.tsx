"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K6B4A, VIDEO_MATERI_K6B4A } from "./story/k6b4a-video";

/* Sub-Bab A: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K6B4A, { a: 6, k: 4 }), keVideoSiap(VIDEO_LUAR_K6B4A, { a: 4, k: 4 })];

export function VideoK6B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
