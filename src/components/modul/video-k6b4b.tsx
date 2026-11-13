"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K6B4B, VIDEO_MATERI_K6B4B } from "./story/k6b4b-video";

/* Sub-Bab B: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K6B4B, { a: 6, k: 5 }), keVideoSiap(VIDEO_LUAR_K6B4B, { a: 4, k: 4 })];

export function VideoK6B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
