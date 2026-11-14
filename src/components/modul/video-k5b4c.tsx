"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B4C, VIDEO_MATERI_K5B4C } from "./story/k5b4c-video";

/* Sub-Bab C (keliling segi empat): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B4C, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B4C, { a: 1, k: 3 })];

export function VideoK5B4C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
