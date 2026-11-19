"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1I, VIDEO_MATERI_K4B1I } from "./story/k4b1i-video";

/* Sub-Bab I Bab 1 Kelas 4 "Papan Jadwal Kak Yoga" (faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1I, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1I, { a: 1, k: 2 })];

export function VideoK4B1I({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
