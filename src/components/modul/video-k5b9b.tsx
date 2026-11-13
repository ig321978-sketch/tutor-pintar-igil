"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B9B, VIDEO_MATERI_K5B9B } from "./story/k5b9b-video";

/* Sub-Bab B: dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B9B, { a: 2, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B9B, { a: 1, k: 2 })];

export function VideoK5B9B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
