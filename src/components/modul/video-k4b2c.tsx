"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2C, VIDEO_MATERI_K4B2C } from "./story/k4b2c-video";

/* Sub-Bab C (Pecahan Senilai): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2C, { a: 1, k: 3 })];

export function VideoK4B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
