"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1G, VIDEO_MATERI_K3B1G } from "./story/k3b1G-video";

/* Sub-Bab G Bab 1 Kelas 3 (Pembagian sampai Seratus): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1G, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1G, { a: 1, k: 1 })];

export function VideoK3B1G({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
