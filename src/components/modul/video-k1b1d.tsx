"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B1D, VIDEO_MATERI_K1B1D } from "./story/k1b1d-video";

/* Sub-Bab D "Pesta Rumah Rapi" (pasangan bilangan), akhir cerita Bab 1: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B1D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B1D, { a: 1, k: 1 })];

export function VideoK1B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
