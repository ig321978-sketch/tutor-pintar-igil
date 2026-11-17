"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3B, VIDEO_MATERI_K1B3B } from "./story/k1b3b-video";

/* Sub-Bab B Bab 3 "Pindah Kereta di Stasiun Besar" (berbagai cara mengurangi), lanjutan Kereta ke Rumah Nenek: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3B, { a: 1, k: 1 })];

export function VideoK1B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
