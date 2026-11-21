"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2B, VIDEO_MATERI_K4B2B } from "./story/k4b2b-video";

/* Sub-Bab B Bab 2 Kelas 4 "Bak Warna Pak Joyo" (membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2B, { a: 1, k: 1 })];

export function VideoK4B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
