"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B8A, VIDEO_MATERI_K1B8A } from "./story/k1b8A-video";

/* Sub-Bab A Bab 8 (Mengelompokkan Data): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B8A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B8A, { a: 1, k: 1 })];

export function VideoK1B8A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
