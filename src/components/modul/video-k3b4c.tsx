"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B4C, VIDEO_MATERI_K3B4C } from "./story/k3b4C-video";

/* Sub-Bab C Bab 4 Kelas 3 "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar), akhir cerita Festival Layang-layang Kampung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B4C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B4C, { a: 1, k: 1 })];

export function VideoK3B4C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
