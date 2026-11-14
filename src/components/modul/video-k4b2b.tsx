"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2B, VIDEO_MATERI_K4B2B } from "./story/k4b2b-video";

/* Sub-Bab B (Pecahan dengan Penyebut Sama): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2B, { a: 1, k: 3 })];

export function VideoK4B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
