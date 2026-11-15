"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B7B, VIDEO_MATERI_K2B7B } from "./story/k2b7B-video";

/* Sub-Bab B Bab 7 Kelas 2 (Membandingkan Bilangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B7B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B7B, { a: 1, k: 1 })];

export function VideoK2B7B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
