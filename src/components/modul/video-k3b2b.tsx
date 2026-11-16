"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B2B, VIDEO_MATERI_K3B2B } from "./story/k3b2B-video";

/* Sub-Bab B Bab 2 Kelas 3 (Kalimat Matematika Pengurangan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B2B, { a: 8, k: 4 }), keVideoSiap(VIDEO_LUAR_K3B2B, { a: 2, k: 4 })];

export function VideoK3B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
