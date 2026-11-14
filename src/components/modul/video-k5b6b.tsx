"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B6B, VIDEO_MATERI_K5B6B } from "./story/k5b6b-video";

/* Sub-Bab B (pengertian sudut): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B6B, { a: 1, k: 1 }), keVideoSiap(VIDEO_LUAR_K5B6B, { a: 1, k: 1 })];

export function VideoK5B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
