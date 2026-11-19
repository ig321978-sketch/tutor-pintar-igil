"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1D, VIDEO_MATERI_K4B1D } from "./story/k4b1d-video";

/* Sub-Bab D Bab 1 Kelas 4 "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1D, { a: 1, k: 1 })];

export function VideoK4B1D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
