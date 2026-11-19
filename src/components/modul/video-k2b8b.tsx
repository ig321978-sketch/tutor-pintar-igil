"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B8B, VIDEO_MATERI_K2B8B } from "./story/k2b8B-video";

/* Sub-Bab B Bab 8 Kelas 2 "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B8B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B8B, { a: 1, k: 1 })];

export function VideoK2B8B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
