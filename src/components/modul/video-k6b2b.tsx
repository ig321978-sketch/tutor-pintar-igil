"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K6B2B, VIDEO_MATERI_K6B2B } from "./story/k6b2b-video";

/* Sub-Bab B: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K6B2B, { a: 3, k: 4 }), keVideoSiap(VIDEO_LUAR_K6B2B, { a: 1, k: 3 })];

export function VideoK6B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
