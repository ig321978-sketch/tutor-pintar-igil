"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B1B, VIDEO_MATERI_K1B1B } from "./story/k1b1b-video";

/* Sub-Bab B (Membandingkan Banyak Benda): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B1B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B1B, { a: 1, k: 1 })];

export function VideoK1B1B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
