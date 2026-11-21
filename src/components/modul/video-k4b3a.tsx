"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B3A, VIDEO_MATERI_K4B3A } from "./story/k4b3a-video";

/* Sub-Bab A Bab 3 Kelas 4 "Deret Angklung Bu Ratri" (pola gambar), awal cerita Orkestra Angklung Kampung Senandung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B3A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B3A, { a: 1, k: 1 })];

export function VideoK4B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
