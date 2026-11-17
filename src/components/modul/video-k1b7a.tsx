"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B7A, VIDEO_MATERI_K1B7A } from "./story/k1b7A-video";

/* Sub-Bab A Bab 7 "Tiang dan Tangga" (membandingkan dan mengurutkan panjang), awal cerita Rumah Pohon Abang: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B7A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B7A, { a: 1, k: 1 })];

export function VideoK1B7A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
