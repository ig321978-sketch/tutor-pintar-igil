"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3D, VIDEO_MATERI_K1B3D } from "./story/k1b3d-video";

/* Sub-Bab D Bab 3 "Tiba di Rumah Nenek" (soal cerita pengurangan), akhir Kereta ke Rumah Nenek: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3D, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3D, { a: 1, k: 1 })];

export function VideoK1B3D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
