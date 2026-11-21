"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2E, VIDEO_MATERI_K5B2E } from "./story/k5b2e-video";

/* Sub-Bab E Bab 2 Kelas 5 "Papan Bilangan Kak Lintang" (bilangan prima, faktorisasi prima, KPK dan FPB), akhir cerita Pasar Kuliner Malam: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2E, { a: 5, k: 2 }), keVideoSiap(VIDEO_LUAR_K5B2E, { a: 4, k: 3 })];

export function VideoK5B2E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
