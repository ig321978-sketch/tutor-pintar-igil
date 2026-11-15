"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B2C, VIDEO_MATERI_K1B2C } from "./story/k1b2c-video";

/* Sub-Bab C (Soal Cerita Penjumlahan): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B2C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B2C, { a: 1, k: 1 })];

export function VideoK1B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
