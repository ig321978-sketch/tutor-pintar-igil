"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1A, VIDEO_MATERI_K4B1A } from "./story/k4b1a-video";

/* Sub-Bab A (Membaca dan Menulis Bilangan Cacah, termasuk pembuka bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1A, { a: 1, k: 3 })];

export function VideoK4B1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
