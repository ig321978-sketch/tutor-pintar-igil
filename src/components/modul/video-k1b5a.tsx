"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B5A, VIDEO_MATERI_K1B5A } from "./story/k1b5a-video";

/* Sub-Bab A Bab 5 "Ikan Baru Datang" (bilangan sampai dua puluh), awal Akuarium Ikan Hias Abang: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B5A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B5A, { a: 1, k: 1 })];

export function VideoK1B5A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
