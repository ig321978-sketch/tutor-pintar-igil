"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B6C, VIDEO_MATERI_K5B6C } from "./story/k5b6c-video";

/* Sub-Bab C (mengukur dan membandingkan sudut): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B6C, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B6C, { a: 1, k: 3 })];

export function VideoK5B6C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
