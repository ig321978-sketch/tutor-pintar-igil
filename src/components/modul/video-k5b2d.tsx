"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2D, VIDEO_MATERI_K5B2D } from "./story/k5b2d-video";

/* Sub-Bab D Bab 2 Kelas 5 "Kotak Bingkisan Pak Joko" (faktor persekutuan dan FPB), Pasar Kuliner Malam: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2D, { a: 4, k: 2 }), keVideoSiap(VIDEO_LUAR_K5B2D, { a: 4, k: 1 })];

export function VideoK5B2D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
