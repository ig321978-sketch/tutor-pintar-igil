"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2E, VIDEO_MATERI_K4B2E } from "./story/k4b2e-video";

/* Sub-Bab E Bab 2 Kelas 4 "Papan Pameran Bu Tuti" (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2E, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2E, { a: 1, k: 2 })];

export function VideoK4B2E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
