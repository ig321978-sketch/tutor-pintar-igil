"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2B, VIDEO_MATERI_K5B2B } from "./story/k5b2b-video";

/* Sub-Bab B Bab 2 Kelas 5 "Dua Lonceng Pak Tarno" (kelipatan persekutuan dan KPK), cerita Pasar Kuliner Malam: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K5B2B, { a: 1, k: 2 })];

export function VideoK5B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
