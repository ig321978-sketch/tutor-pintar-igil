"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B2C, VIDEO_MATERI_K1B2C } from "./story/k1b2c-video";

/* Sub-Bab C Bab 2 "Pesanan Tetangga" (soal cerita penjumlahan), akhir cerita Kebun Sayur Mamah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B2C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B2C, { a: 1, k: 1 })];

export function VideoK1B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
