"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B9C, VIDEO_MATERI_K5B9C } from "./story/k5b9c-video";

/* Sub-Bab C: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B9C, { a: 1, k: 2 }), keVideoSiap(VIDEO_LUAR_K5B9C, { a: 1, k: 3 })];

export function VideoK5B9C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
