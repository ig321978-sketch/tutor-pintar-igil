"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B4B, VIDEO_MATERI_K1B4B } from "./story/k1b4b-video";

/* Sub-Bab B (Mengelompokkan Benda): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B4B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B4B, { a: 1, k: 1 })];

export function VideoK1B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
