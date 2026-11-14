"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B5D, VIDEO_MATERI_K5B5D } from "./story/k5b5d-video";

/* Sub-Bab D (hubungan keliling dan luas): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B5D, { a: 2, k: 4 }), keVideoSiap(VIDEO_LUAR_K5B5D, { a: 1, k: 3 })];

export function VideoK5B5D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
