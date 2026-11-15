"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1C, VIDEO_MATERI_K3B1C } from "./story/k3b1C-video";

/* Sub-Bab C Bab 1 Kelas 3 (Membandingkan dan Mengurutkan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1C, { a: 1, k: 1 })];

export function VideoK3B1C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
