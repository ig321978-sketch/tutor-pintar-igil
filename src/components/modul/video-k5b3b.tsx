"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B3B, VIDEO_MATERI_K5B3B } from "./story/k5b3b-video";

/* Sub-Bab B (penjumlahan bilangan pecahan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B3B, { a: 0, k: 3 }), keVideoSiap(VIDEO_LUAR_K5B3B, { a: 1, k: 3 })];

export function VideoK5B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
