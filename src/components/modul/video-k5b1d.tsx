"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B1D, VIDEO_MATERI_K5B1D } from "./story/k5b1d-video";

/* Sub-Bab D Bab 1 Kelas 5 "Hitungan Penonton Pak Darmo" (operasi hitung bilangan besar), akhir cerita Hari Pertandingan di Stadion Kota: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B1D, { a: 4, k: 2 }), keVideoSiap(VIDEO_LUAR_K5B1D, { a: 4, k: 1 })];

export function VideoK5B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
