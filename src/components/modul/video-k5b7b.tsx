"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B7B, VIDEO_MATERI_K5B7B } from "./story/k5b7b-video";

/* Sub-Bab B (membandingkan ciri-ciri segi empat): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B7B, { a: 1, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B7B, { a: 1, k: 3 })];

export function VideoK5B7B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
