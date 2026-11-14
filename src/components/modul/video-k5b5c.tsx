"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B5C, VIDEO_MATERI_K5B5C } from "./story/k5b5c-video";

/* Sub-Bab C: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B5C, { a: 3, k: 4 }), keVideoSiap(VIDEO_LUAR_K5B5C, { a: 0, k: 3 })];

export function VideoK5B5C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
