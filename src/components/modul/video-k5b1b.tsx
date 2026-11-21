"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B1B, VIDEO_MATERI_K5B1B } from "./story/k5b1b-video";

/* Sub-Bab B Bab 1 Kelas 5 "Urutan Tribun Pak Hasto" (membandingkan dan mengurutkan bilangan), cerita Hari Pertandingan di Stadion Kota: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B1B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K5B1B, { a: 1, k: 2 })];

export function VideoK5B1B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
