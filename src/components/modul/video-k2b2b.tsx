"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B2B, VIDEO_MATERI_K2B2B } from "./story/k2b2B-video";

/* Sub-Bab B Kelas 2 Bab 2 "Rak Seragam Diserbu" (pengurangan sampai dua puluh), tengah cerita Toko Seragam dan Alat Tulis Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B2B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B2B, { a: 1, k: 1 })];

export function VideoK2B2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
