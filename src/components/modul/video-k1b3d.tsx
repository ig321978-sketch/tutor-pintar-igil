"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3D, VIDEO_MATERI_K1B3D } from "./story/k1b3d-video";

/* Sub-Bab D (Soal Cerita Pengurangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3D, { a: 1, k: 1 })];

export function VideoK1B3D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
