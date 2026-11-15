"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B1C, VIDEO_MATERI_K2B1C } from "./story/k2b1C-video";

/* Sub-Bab C Bab 1 Kelas 2 (Membandingkan Dua Bilangan atau Lebih): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B1C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B1C, { a: 1, k: 1 })];

export function VideoK2B1C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
