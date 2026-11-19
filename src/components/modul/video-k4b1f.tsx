"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1F, VIDEO_MATERI_K4B1F } from "./story/k4b1f-video";

/* Sub-Bab F Bab 1 Kelas 4 "Papan Sisa Pak Usman" (pengurangan bersusun sampai seribu), cerita Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1F, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1F, { a: 1, k: 1 })];

export function VideoK4B1F({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
