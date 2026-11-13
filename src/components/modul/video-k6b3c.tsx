"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K6B3C, VIDEO_MATERI_K6B3C } from "./story/k6b3c-video";

/* Sub-Bab C: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K6B3C, { a: 1, k: 4 }), keVideoSiap(VIDEO_LUAR_K6B3C, { a: 3, k: 2 })];

export function VideoK6B3C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
