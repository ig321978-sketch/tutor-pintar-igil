"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1H, VIDEO_MATERI_K4B1H } from "./story/k4b1h-video";

/* Sub-Bab H (Pembagian Bilangan Cacah sampai 100): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1H, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1H, { a: 1, k: 3 })];

export function VideoK4B1H({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
