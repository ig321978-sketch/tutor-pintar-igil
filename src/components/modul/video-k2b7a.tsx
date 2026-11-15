"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B7A, VIDEO_MATERI_K2B7A } from "./story/k2b7A-video";

/* Sub-Bab A Bab 7 Kelas 2 (Menghitung, Membaca, dan Menulis Bilangan sampai 100): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B7A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B7A, { a: 1, k: 1 })];

export function VideoK2B7A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
