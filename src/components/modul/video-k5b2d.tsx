"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2D, VIDEO_MATERI_K5B2D } from "./story/k5b2d-video";

/* Sub-Bab D (faktor persekutuan dan FPB): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2D, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B2D, { a: 1, k: 3 })];

export function VideoK5B2D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
