"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1I, VIDEO_MATERI_K4B1I } from "./story/k4b1i-video";

/* Sub-Bab I (Faktor dan Kelipatan, termasuk penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1I, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1I, { a: 1, k: 3 })];

export function VideoK4B1I({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
