"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1G, VIDEO_MATERI_K4B1G } from "./story/k4b1g-video";

/* Sub-Bab G Bab 1 Kelas 4 "Baris Perahu Bu Marni" (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1G, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1G, { a: 1, k: 1 })];

export function VideoK4B1G({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
