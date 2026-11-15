"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1D, VIDEO_MATERI_K3B1D } from "./story/k3b1D-video";

/* Sub-Bab D Bab 1 Kelas 3 (Penjumlahan sampai 100): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1D, { a: 1, k: 1 })];

export function VideoK3B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
