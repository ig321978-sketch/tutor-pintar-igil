"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B5D, VIDEO_MATERI_K1B5D } from "./story/k1b5d-video";

/* Sub-Bab D (Membandingkan dan Mengurutkan Bilangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B5D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B5D, { a: 1, k: 1 })];

export function VideoK1B5D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
