"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2A, VIDEO_MATERI_K4B2A } from "./story/k4b2a-video";

/* Sub-Bab A Bab 2 Kelas 4 "Kain Lipat Bu Wulan" (pecahan dengan pembilang satu), awal cerita Sanggar Batik Kampung Mekar: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2A, { a: 1, k: 1 })];

export function VideoK4B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
