"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2E, VIDEO_MATERI_K4B2E } from "./story/k4b2e-video";

/* Sub-Bab E (Desimal Perseratusan dan Persen, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2E, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2E, { a: 1, k: 3 })];

export function VideoK4B2E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
