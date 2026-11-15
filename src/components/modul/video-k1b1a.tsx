"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B1A, VIDEO_MATERI_K1B1A } from "./story/k1b1a-video";

/* Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B1A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B1A, { a: 1, k: 1 })];

export function VideoK1B1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
