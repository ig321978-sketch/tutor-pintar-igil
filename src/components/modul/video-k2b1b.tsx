"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B1B, VIDEO_MATERI_K2B1B } from "./story/k2b1B-video";

/* Sub-Bab B Kelas 2 Bab 1 "Pesanan Kue Hari Olahraga" (puluhan dan satuan), tengah cerita Kue di Kantin Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B1B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B1B, { a: 1, k: 1 })];

export function VideoK2B1B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
