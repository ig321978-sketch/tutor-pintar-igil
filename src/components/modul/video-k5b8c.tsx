"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B8C, VIDEO_MATERI_K5B8C } from "./story/k5b8c-video";

/* Sub-Bab C: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B8C, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B8C, { a: 1, k: 3 })];

export function VideoK5B8C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
