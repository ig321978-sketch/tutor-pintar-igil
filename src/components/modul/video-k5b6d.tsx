"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B6D, VIDEO_MATERI_K5B6D } from "./story/k5b6d-video";

/* Sub-Bab D (melukis sudut): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B6D, { a: 2, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B6D, { a: 1, k: 3 })];

export function VideoK5B6D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
