"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B3C, VIDEO_MATERI_K2B3C } from "./story/k2b3C-video";

/* Sub-Bab C Bab 3 Kelas 2 "Gudang Mainan Pak Rudi" (bangun ruang), akhir cerita Taman Bermain Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B3C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B3C, { a: 1, k: 1 })];

export function VideoK2B3C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
