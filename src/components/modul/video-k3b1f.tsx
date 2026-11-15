"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1F, VIDEO_MATERI_K3B1F } from "./story/k3b1F-video";

/* Sub-Bab F Bab 1 Kelas 3 (Perkalian sampai 100): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1F, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1F, { a: 1, k: 1 })];

export function VideoK3B1F({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
