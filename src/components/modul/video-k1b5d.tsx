"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B5D, VIDEO_MATERI_K1B5D } from "./story/k1b5d-video";

/* Sub-Bab D Bab 5 "Lapak Ikan Dibuka" (membandingkan dan mengurutkan bilangan), akhir cerita Akuarium Ikan Hias Abang: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B5D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B5D, { a: 1, k: 1 })];

export function VideoK1B5D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
