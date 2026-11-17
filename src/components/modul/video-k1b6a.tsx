"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B6A, VIDEO_MATERI_K1B6A } from "./story/k1b6A-video";

/* Sub-Bab A Bab 6 "Dua Nampan Kue" (lebih dari, kurang dari, dan selisih), awal Pasar Malam Kampung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B6A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B6A, { a: 1, k: 1 })];

export function VideoK1B6A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
