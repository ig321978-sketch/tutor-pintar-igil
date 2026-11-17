"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B5C, VIDEO_MATERI_K1B5C } from "./story/k1b5c-video";

/* Sub-Bab C Bab 5 "Kemas Pakan dan Kantong" (puluhan dan satuan), lanjutan Akuarium Ikan Hias Abang: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B5C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B5C, { a: 1, k: 1 })];

export function VideoK1B5C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
