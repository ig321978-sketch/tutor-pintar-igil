"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B1D, VIDEO_MATERI_K5B1D } from "./story/k5b1d-video";

/* Sub-Bab D (operasi hitung pada bilangan cacah sampai 100.000, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B1D, { a: 2, k: 4 }), keVideoSiap(VIDEO_LUAR_K5B1D, { a: 2, k: 3 })];

export function VideoK5B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
