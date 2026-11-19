"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1B, VIDEO_MATERI_K4B1B } from "./story/k4b1b-video";

/* Sub-Bab B Bab 1 Kelas 4 "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka), lanjutan Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1B, { a: 1, k: 1 })];

export function VideoK4B1B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
