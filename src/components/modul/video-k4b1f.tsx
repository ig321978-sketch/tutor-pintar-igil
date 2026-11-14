"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1F, VIDEO_MATERI_K4B1F } from "./story/k4b1f-video";

/* Sub-Bab F (Pengurangan Bilangan Cacah sampai 1.000): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1F, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1F, { a: 1, k: 3 })];

export function VideoK4B1F({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
