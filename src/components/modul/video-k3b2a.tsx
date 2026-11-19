"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B2A, VIDEO_MATERI_K3B2A } from "./story/k3b2A-video";

/* Sub-Bab A Bab 2 Kelas 3 "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B2A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B2A, { a: 1, k: 1 })];

export function VideoK3B2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
