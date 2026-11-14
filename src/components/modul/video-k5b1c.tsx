"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B1C, VIDEO_MATERI_K5B1C } from "./story/k5b1c-video";

/* Sub-Bab C (komposisi dan dekomposisi): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B1C, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B1C, { a: 1, k: 3 })];

export function VideoK5B1C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
