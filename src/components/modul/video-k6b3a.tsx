"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K6B3A, VIDEO_MATERI_K6B3A } from "./story/k6b3a-video";

/* Sub-Bab A (termasuk pembuka bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K6B3A, { a: 3, k: 4 }), keVideoSiap(VIDEO_LUAR_K6B3A, { a: 1, k: 4 })];

export function VideoK6B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
