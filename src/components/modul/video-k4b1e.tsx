"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1E, VIDEO_MATERI_K4B1E } from "./story/k4b1e-video";

/* Sub-Bab E (Penjumlahan Bilangan Cacah sampai 1.000): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1E, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1E, { a: 1, k: 3 })];

export function VideoK4B1E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
