"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2C, VIDEO_MATERI_K5B2C } from "./story/k5b2c-video";

/* Sub-Bab C (faktor): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2C, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B2C, { a: 1, k: 3 })];

export function VideoK5B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
