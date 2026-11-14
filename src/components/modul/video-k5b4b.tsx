"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B4B, VIDEO_MATERI_K5B4B } from "./story/k5b4b-video";

/* Sub-Bab B (keliling segitiga): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B4B, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B4B, { a: 1, k: 3 })];

export function VideoK5B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
