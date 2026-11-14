"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1D, VIDEO_MATERI_K4B1D } from "./story/k4b1d-video";

/* Sub-Bab D (Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1D, { a: 1, k: 3 })];

export function VideoK4B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
