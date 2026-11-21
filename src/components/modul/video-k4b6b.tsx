"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B6B, VIDEO_MATERI_K4B6B } from "./story/k4b6b-video";

/* Sub-Bab B Bab 6 Kelas 4 "Diagram Batang Pak Dodi" (diagram batang), akhir cerita Bazar Kuliner Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B6B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B6B, { a: 1, k: 2 })];

export function VideoK4B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
