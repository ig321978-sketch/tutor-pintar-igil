"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B6A, VIDEO_MATERI_K5B6A } from "./story/k5b6a-video";

/* Sub-Bab A (termasuk pembuka bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B6A, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B6A, { a: 1, k: 3 })];

export function VideoK5B6A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
