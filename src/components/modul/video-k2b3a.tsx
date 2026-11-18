"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B3A, VIDEO_MATERI_K2B3A } from "./story/k2b3A-video";

/* Sub-Bab A Bab 3 Kelas 2 "Ubin untuk Taman Bermain" (bangun datar), awal cerita Taman Bermain Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B3A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B3A, { a: 1, k: 1 })];

export function VideoK2B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
