"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2A, VIDEO_MATERI_K5B2A } from "./story/k5b2a-video";

/* Sub-Bab A Bab 2 Kelas 5 "Lonceng Bu Marni" (kelipatan), awal cerita Pasar Kuliner Malam: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K5B2A, { a: 1, k: 1 })];

export function VideoK5B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
