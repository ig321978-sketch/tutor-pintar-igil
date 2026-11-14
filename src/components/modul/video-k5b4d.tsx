"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B4D, VIDEO_MATERI_K5B4D } from "./story/k5b4d-video";

/* Sub-Bab D (keliling segi banyak): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B4D, { a: 4, k: 4 }), keVideoSiap(VIDEO_LUAR_K5B4D, { a: 1, k: 2 })];

export function VideoK5B4D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
