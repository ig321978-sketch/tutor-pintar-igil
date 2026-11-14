"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2D, VIDEO_MATERI_K4B2D } from "./story/k4b2d-video";

/* Sub-Bab D (Pecahan Desimal Persepuluhan dan Perseratusan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2D, { a: 1, k: 3 })];

export function VideoK4B2D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
