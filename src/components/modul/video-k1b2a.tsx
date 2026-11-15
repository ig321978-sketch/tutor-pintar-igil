"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B2A, VIDEO_MATERI_K1B2A } from "./story/k1b2a-video";

/* Sub-Bab A Bab 2 (Cerita Penjumlahan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B2A, { a: 1, k: 1 })];

export function VideoK1B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
